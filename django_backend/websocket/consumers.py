
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import constantly
import json
from websocket.models import Member,Lobby
from websocket.serializers import MemberSerializer



@database_sync_to_async
def is_lobby_none(lobby_name):
    if len(Lobby.objects.filter(uri=lobby_name)) == 0:
        return True
    return False

@database_sync_to_async
def create_lobby(lobby_name):
    Lobby.objects.create(
         uri=lobby_name,
         ).save()

@database_sync_to_async
def get_lobby(lobby_name):
    return Lobby.objects.get(uri=lobby_name)


@database_sync_to_async
def create_member(member_data,lobby):
    member_data['lobby'] = lobby.pk
    serializer = MemberSerializer(data=member_data)
    if serializer.is_valid():
        serializer.save()
        return serializer.data
    raise Exception

@database_sync_to_async
def remove_member(member_pk,lobby_name):
    Member.objects.get(lobby__uri=lobby_name,pk=member_pk).delete()

def fetch_lobby_members(lobby_name):
    return Member.objects.filter(lobby__uri=lobby_name)

@database_sync_to_async
def serialize_lobby_members(lobby_name):
    members = fetch_lobby_members(lobby_name)
    return MemberSerializer(members,many=True).data

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
        await self.accept()

    
   
    async def user_joined_action(self,json_data):
        member = None
        try:
            member = await create_member(json_data['member'],await get_lobby(self.room_name))
        except:
            return
        self.member_pk = member['pk']
        print("PK:"+str(self.member_pk))
        #send created user object to user that connects 
        await self.send(text_data=json.dumps({
            'action':"user_first_connection",
            'content':member
        }))
        #send new user object to every group member
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type":"user_join",
            "member":member}
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
        await remove_member(self.member_pk,self.room_name)
    actions = {
          'user_join':user_joined_action,
          'user_left':user_left_action,
          'fetch_members':fetch_members
    }
    async def disconnect(self, close_code):
        await self.actions['user_left'](self)
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
            print("Recive PK: " + str(self.member_pk))
            json_data = json.loads(text_data)
            print("message_recived:"+json_data['action'])
            await self.actions[json_data['action']](self,json_data)
           

    async def user_join(self, event):
            await self.send(text_data=json.dumps({
                 'action' : event['type'],
                 'member' : event['member']
            }))

    async def user_left(self,event):
        await self.send(text_data = json.dumps({
            'action':event['type'],
            'content':event['content']
        }))