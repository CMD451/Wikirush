
from rest_framework import serializers
from django.contrib.auth.models import User
from websocket.models import Member,Lobby




class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['username','avatarUrl','lobby','pk']

class Lobby(serializers.ModelSerializer):
    members = MemberSerializer(many=True,read_only = True)
    class Meta:
        model = Lobby
        fields = ['uri']




