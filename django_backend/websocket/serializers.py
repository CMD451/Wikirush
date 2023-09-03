
from rest_framework import serializers
from django.contrib.auth.models import User
from websocket.models import Member,Lobby,PageVisit




class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['username','avatarUrl','lobby','pk']

class LobbySerializer(serializers.ModelSerializer):
    members = MemberSerializer(many=True,read_only = True)
    class Meta:
        model = Lobby
        fields = ['uri']

class LobbySettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lobby
        fields = [
            'startArticle',
            'endArticle',
            'lang'
                  ]
        
class PageVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageVisit
        fields = ['lobby','member','article','time']




