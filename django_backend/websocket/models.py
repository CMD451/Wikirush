from django.db import models

# Create your models here.


class Lobby(models.Model):
    class Meta:
        ordering = ['creationTimestamp']
    uri = models.CharField(max_length=50)
    owner = models.ForeignKey("Member",blank=True,on_delete=models.SET_NULL,null=True,related_name="ownedLobby")
    creationTimestamp = models.DateTimeField(auto_now_add=True)
    #change default
    lobbyOwnerToken = models.TextField(max_length = 50,default="0000000")
    endTimer = models.IntegerField(default=30)
    started = models.BooleanField(default=False)
    startArticle = models.TextField(default="Pet_door")
    endArticle = models.TextField(default="Pet")
    lang = models.TextField(default="en")


    def save(self,*args,**kwargs):
        self.lobbyOwnerToken = "UFO:"+str(self.creationTimestamp)+self.uri
        super(Lobby,self).save(*args,**kwargs)

    #settings

class Member(models.Model):
    username = models.CharField(max_length=10)
    avatarUrl = models.CharField(max_length=50)
    lobby = models.ForeignKey(Lobby,on_delete=models.CASCADE,related_name="members")

class PageVisit(models.Model):
    article = models.TextField(blank=True)
    member = models.ForeignKey("Member",on_delete=models.CASCADE,related_name="visitedPages")
    lobby = models.ForeignKey("lobby",on_delete=models.CASCADE)
    time = models.FloatField()