# Generated by Django 3.2.7 on 2021-12-15 09:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0009_alter_issue_due_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='book',
            new_name='book_id',
        ),
        migrations.RenameField(
            model_name='issue',
            old_name='issuer',
            new_name='issuer_id',
        ),
    ]
