from django.db import models
from account.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length = 20)
    author = models.CharField(max_length = 20)
    category = models.CharField(max_length = 20)
    admin = models.ForeignKey(User, on_delete = models.SET_NULL, null= True)
