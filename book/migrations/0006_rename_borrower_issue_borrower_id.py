# Generated by Django 3.2.7 on 2021-12-04 14:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0005_rename_issuebook_issue'),
    ]

    operations = [
        migrations.RenameField(
            model_name='issue',
            old_name='borrower',
            new_name='borrower_id',
        ),
    ]