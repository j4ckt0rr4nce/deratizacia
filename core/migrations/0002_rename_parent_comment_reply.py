# Generated by Django 3.2.9 on 2021-11-10 09:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='parent',
            new_name='reply',
        ),
    ]
