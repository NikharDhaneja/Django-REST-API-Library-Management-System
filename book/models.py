from django.db import models
from account.models import User

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length = 50)
    author = models.CharField(max_length = 20)
    category = models.CharField(max_length = 20)
    floor = models.CharField(max_length = 2)
    shelf = models.CharField(max_length = 4)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    admin = models.ForeignKey(User, on_delete = models.SET_NULL, null= True)


class Issue(models.Model):
    """
    on_delete = models.PROTECT: Forbid the deletion of the referenced object.
    To delete it you will have to delete all objects that reference it manually.
    """
    book = models.ForeignKey(Book, on_delete = models.PROTECT)
    copy_no = models.IntegerField()
    issuer = models.ForeignKey(User, on_delete = models.PROTECT)
    borrower = models.IntegerField()
    due_date = models.DateField()
    is_returned = models.BooleanField(default=False)
