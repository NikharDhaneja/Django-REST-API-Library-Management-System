from rest_framework import serializers
from .models import User

class AdminSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate(self, data):
        email = User.objects.filter(email = data['email'])
        if(email.count() > 0):
            raise serializers.ValidationError({"error": "Email already exists"}) # raises if email already exist

        return data

    def create(self, validated_data):
          user = User.objects.create( # this line  will solve your problem
              email=validated_data['email'],
              username = validated_data['username'],
            )
          user.set_password(validated_data['password'])
          user.save()

          return user
