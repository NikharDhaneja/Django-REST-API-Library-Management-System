from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login
from rest_framework_simplejwt.settings import api_settings

class AdminSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate(self, data):
        email = User.objects.filter(email = data['email'])
        if(email.count() > 0):
            raise serializers.ValidationError({"error": "Email already exists"}) # raises if email already exist

        return data

    """
    Need to override this method to add encryption to password
    """
    def create(self, validated_data):
          user = User.objects.create(
              email=validated_data['email'],
              username = validated_data['username'],
            )
          user.set_password(validated_data['password'])
          user.save()

          return user


"""
Customizing TokenObtainPairSerializer to get is_superuser value
from User table with access and refresh token after login
"""
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['is_superuser'] = str(self.user.is_superuser)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data
