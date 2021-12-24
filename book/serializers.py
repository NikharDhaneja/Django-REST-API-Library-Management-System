from rest_framework import serializers
from .models import Book, Issue

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = '__all__'


class IssueBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = '__all__'


class ReturnBookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Issue
        fields = ['book', 'copy_no']
