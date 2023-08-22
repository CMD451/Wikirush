from django.db import models

# Create your models here.



class Lobby(models.Model):
    class Meta:
        ordering = ['creationTimestamp']

    uri = models.CharField(max_length=50)
    creationTimestamp = models.DateTimeField(auto_now_add=True)

    #settings

class Member(models.Model):
    username = models.CharField(max_length=10)
    uri = models.CharField(max_length=20)
    avatarPath = models.CharField(max_length=50)
    lobby = models.ForeignKey(Lobby,on_delete=models.CASCADE,related_name="members")

