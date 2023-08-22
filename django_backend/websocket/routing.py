from django.urls import re_path
from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path("ws/<slug:lobby_name>", consumers.GameConsumer.as_asgi())
]