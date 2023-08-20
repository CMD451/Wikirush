
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from chat.serializers import MessageSerializer,NewMessageSerializer
from user_profile.serializers import UserWithProfileSerialzier

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_uri = self.scope['url_route']['kwargs']['slug']
        self.room_group_name =  'game_room_%s' % self.room_uri


        print(self.room_group_name)

        
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


