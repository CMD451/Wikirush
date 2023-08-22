
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import constantly
import json


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['lobby_name']
        self.room_group_name =  'game_room_%s' % self.room_name


        await self.channel_layer.group_add(
        self.room_group_name,
        self.channel_name
    )
        await self.accept()

    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def user_joined_action(self,json_data):
        print("user_join_ACTION!")
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type":"user_join",
            "member":json_data['member']}
        )

    async def fetch_members(self,json_data){
         
    }

    actions = {
          'user_join':user_joined_action,
          'fetch_members':fetch_members
    }

    async def receive(self, text_data):
            print("message_recived")
            json_data = json.loads(text_data)
            await self.actions[json_data['action']](self,json_data)
           

    async def user_join(self, event):
            print("user_join!")
            print(event)
            #json_data = json.loads(event['message'])
            await self.send(text_data=json.dumps({
                 'action' : event['type'],
                 'member' : event['member']
            }))
