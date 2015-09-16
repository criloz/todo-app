# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, primary_key=True, auto_created=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('due_date', models.DateField(null=True, blank=True)),
                ('description', models.CharField(max_length=100)),
                ('completed', models.BooleanField(default=False)),
                ('archived', models.BooleanField(default=False)),
            ],
        ),
    ]
