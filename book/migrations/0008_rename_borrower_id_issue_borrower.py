# Generated by Django 3.2.7 on 2021-12-06 13:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0007_issue_copy_no'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='borrower_id',
            new_name='borrower',
        ),
    ]