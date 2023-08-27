# Generated by Django 4.2.4 on 2023-08-25 11:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('websocket', '0002_rename_avatarpath_member_avatarurl_remove_member_uri'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='ownedLobby', to='websocket.member'),
        ),
    ]