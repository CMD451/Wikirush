
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

class SimplifiedPageVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageVisit
        fields = ['article','time']

class MemberWithPageVisitsSerializer(serializers.ModelSerializer):
    visitedPages = SimplifiedPageVisitSerializer(many=True)
    class Meta:
        model = Member
        fields = ['username','avatarUrl','pk','visitedPages']
        
class LobbyMembersWithPagesSerializer(serializers.ModelSerializer):
    members = MemberWithPageVisitsSerializer(many=True)
    class Meta:
        model = Lobby
        fields = ['members']


