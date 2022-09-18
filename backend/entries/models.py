from django.db import models
from django.contrib.auth.models import AbstractUser
from authentication.models import User

# Create your models here.

class Entries(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    current_mood = models.CharField(max_length=30)
