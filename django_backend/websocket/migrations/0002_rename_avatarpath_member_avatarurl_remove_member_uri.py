# Generated by Django 4.2.4 on 2023-08-23 11:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('websocket', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='member',
            old_name='avatarPath',
            new_name='avatarUrl',
        ),
        migrations.RemoveField(
            model_name='member',
            name='uri',
        ),
    ]
