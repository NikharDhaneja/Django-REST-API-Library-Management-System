from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import AdminSignUpSerializer
from .models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import IsSuperUser
from rest_framework.permissions import IsAuthenticated
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.

"""
Customizing TokenObtainPairView to new customize serializer_class.
It is use for login and generate token.
"""
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# Creates library admin account
class AdminSignUpApiView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSignUpSerializer
    authentication_classes = [ JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]
