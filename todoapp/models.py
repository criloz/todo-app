from django.db import models

# Create your models here.


class Task(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    description = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)