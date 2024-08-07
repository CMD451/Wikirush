
from channels.generic.websocket import AsyncWebsocketConsumer
import constantly
import json
from websocket.util import *
from websocket.models import Member,Lobby
from websocket.serializers import MemberSerializer
import time
import threading
import asyncio
import logging
logger = logging.getLogger(__name__)



class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['lobby_name']
        self.room_group_name =  'game_room_%s' % self.room_name
        self.member_pk = 1
        if await is_lobby_none(self.room_name):
            await create_lobby(self.room_name)
       
        await self.channel_layer.group_add(
        self.room_group_name,
        self.channel_name
    )
        lobby = await get_lobby(self.room_name)
        await set_lobby_activity(lobby,True)
        await self.accept()

    async def designate_as_owner(self):
            await self.send(text_data=json.dumps({
                'action':"designate_as_owner",
                'content':await get_lobbyOwnerToken(self.room_name)
            }))

    async def send_lobby_unavailable_message(self):
        await self.send(text_data=json.dumps({
            'action':'lobby_unavailable'
        }))

    async def user_joined_action(self,json_data):
        lobby = await get_lobby(self.room_name)
        if await did_lobby_start(lobby):
            await self.send_lobby_unavailable_message()
            return

        member = None
        try:
            member = await create_member(json_data['member'],await get_lobby(self.room_name))
        except:
            return
        self.member_pk = member.pk
        owner = await get_owner_create_if_none(lobby,member)
        if owner.pk == member.pk:
            await self.designate_as_owner()

        #send created user object to user that connects 
        serialized_member = await serialize_lobby_member(member)
        await self.send(text_data=json.dumps({
            'action':"user_first_connection",
            'content':{
                 'member':serialized_member,
                 'owner_pk':owner.pk
            }
        }))
        
        #send new user object to every group member
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type":"user_join",
            "content":serialized_member}
        )
      
    async def is_owner(self,json_data):
        return json_data['owner_token'] == await get_lobbyOwnerToken(self.room_name) 
    async def designate_new_owner(self,new_owner):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"owner_update",
                "content":new_owner.pk
            }
        )
   
    async def fetch_members(self,json_data):
        data = await serialize_lobby_members(self.room_name)
        await self.send(text_data= json.dumps({
            'action':'fetch_members',
            'content':data
        }))

    async def user_left_action(self):
        await self.channel_layer.group_send(
             self.room_group_name,
             {
                "type":"user_left",
                "content":{"pk":self.member_pk}
             }
        )
        print("Removing user:" + str(self.member_pk))
        await remove_member(self.member_pk,self.room_name)
        

    async def start_game_action(self,json_data):
        if not await self.is_owner(json_data):
            return
        
        #check if lobby already started
        lobby = await get_lobby(self.room_name)  
        await db_lobby_start(lobby)
        await self.channel_layer.group_send(
             self.room_group_name,
             {
                  "type":"start_game",
                  "content":""
             }
        )
         

    async def settings_change_action(self,json_data):
        if not await self.is_owner(json_data):
            return
        settings = None
        try:
            settings = await update_lobby_settings(self.room_name,json_data['content'])
        except:
            return
        await self.channel_layer.group_send(
             self.room_group_name,
             {
                  "type":"settings_change",
                  "content":settings
             }
        )

    async def page_visit_action(self,json_data):
        lobby = await get_lobby(self.room_name)
        json_data['content']['lobby'] = lobby.pk
        json_data['content']['member'] = self.member_pk
        await add_wiki_visit(json_data['content'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"player_page_visit",
                "content":json_data['content']
            }
        )

        
    async def end_game_action(self,time):
        await asyncio.sleep(time)

        lobby = await get_lobby(self.room_name)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type":"end_game",
                "content":await get_end_game_results(lobby)
            }
    )
        
    def delete_inactive_lobby(self,sleep_time):
        time.sleep(sleep_time)
        lobby = get_lobby_sync(self.room_name)
        if(not lobby.active):
            logger.info("Deleting lobby:",self.room_group_name)
            lobby.delete()    


    
    async def end_article_reached_action(self,json_data):
        await self.actions['page_visit'](self,json_data)
        await self.channel_layer.group_send(
             self.room_group_name,
             {
                  "type":"end_article_reached",
                  "content":self.member_pk
             }
        )
        await self.end_game_action(await get_lobby_end_timer(self.room_name))


    actions = {
          'user_join':user_joined_action,
          'user_left':user_left_action,
          'fetch_members':fetch_members,
          'start_game':start_game_action,
          'settings_change':settings_change_action,
          'page_visit':page_visit_action,
          'end_article_reached':end_article_reached_action
    }
    async def disconnect(self, close_code):
        await self.actions['user_left'](self)
        lobby = await get_lobby(self.room_name)

        #if deletion of member caused the lobby to be ownerless desigante new owner
        if not await is_lobby_owner_set(lobby) and await get_lobby_members_count(lobby) > 0:
            await self.designate_new_owner(await get_oldest_lobby_member(lobby))
        #if the are not any members left
        if(await get_lobby_members_count(lobby) < 1):
            await set_lobby_activity(lobby,False)
            job_thread = threading.Thread(target=lambda:self.delete_inactive_lobby(10))
            job_thread.start()

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
            print("Recive PK: " + str(self.member_pk))
            json_data = json.loads(text_data)
            print("message_recived:"+json_data['action'])
            await self.actions[json_data['action']](self,json_data)
           
    async def standard_message_send(self,event):
         await self.send(text_data=json.dumps({
               'action' : event['type'],
               'content' : event['content']
         }))

    async def user_join(self, event):
        await self.standard_message_send(event)

    async def user_left(self,event):
       await self.standard_message_send(event)
     
    async def owner_update(self,event):
            if self.member_pk == event['content']:
                 #sends token to user associated with this consumer
                await self.designate_as_owner()
            await self.standard_message_send(event)
            
    async def start_game(self,event):

        await self.standard_message_send(event)

    async def settings_change(self,event):
        await self.standard_message_send(event)

    async def end_article_reached(self,event):
        await self.standard_message_send(event)

    async def end_game(self,event):
        await self.standard_message_send(event)
        
    async def player_page_visit(self,event):
        await self.standard_message_send(event)
