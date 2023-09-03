# Generated by Django 4.2.4 on 2023-09-01 18:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('websocket', '0007_lobby_started'),
    ]

    operations = [
        migrations.CreateModel(
            name='PageVisit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('article', models.TextField(blank=True)),
                ('lobby', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='websocket.lobby')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visitedPages', to='websocket.member')),
            ],
        ),
    ]
