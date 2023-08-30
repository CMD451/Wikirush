
from channels.db import database_sync_to_async
from websocket.models import Member,Lobby
from websocket.serializers import MemberSerializer,LobbySettingsSerializer

@database_sync_to_async
def is_lobby_none(lobby_name):
    if len(Lobby.objects.filter(uri=lobby_name)) == 0:
        return True
    return False


@database_sync_to_async
def is_lobby_owner_set(lobby):
    return is_lobby_owner_set_sync(lobby)

def is_lobby_owner_set_sync(lobby):
    return bool(lobby.owner)
    
@database_sync_to_async
def get_owner_create_if_none(lobby,member):
    if is_lobby_owner_set_sync(lobby):
        return lobby.owner
    lobby.owner = member
    lobby.save()
    return member

@database_sync_to_async
def get_owner(lobby):
    return lobby.owner

@database_sync_to_async
def set_owner(lobby,member):
    lobby.owner = member

@database_sync_to_async
def get_lobbyOwnerToken(lobby_name):
    lobby = get_lobby_sync(lobby_name)
    return lobby.lobbyOwnerToken

@database_sync_to_async
def create_lobby(lobby_name):
    Lobby.objects.create(
         uri=lobby_name,
         ).save()

@database_sync_to_async
def get_lobby(lobby_name):
    return get_lobby_sync(lobby_name)

def get_lobby_sync(lobby_name):
    return Lobby.objects.get(uri=lobby_name)

@database_sync_to_async
def create_member(member_data,lobby):
    member_data['lobby'] = lobby.pk
    serializer = MemberSerializer(data=member_data)
    if serializer.is_valid():
        return serializer.save()
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

@database_sync_to_async
def serialize_lobby_member(member):
    return MemberSerializer(member).data

@database_sync_to_async
def get_oldest_lobby_member(lobby):
    return lobby.members.all()[0]

@database_sync_to_async
def get_lobby_members_count(lobby):
    return len(lobby.members.all())

@database_sync_to_async
def update_lobby_settings(lobby_name,json_data):
    lobby = get_lobby_sync(lobby_name)
    serializer = LobbySettingsSerializer(data=json_data,instance=lobby)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return serializer.data
