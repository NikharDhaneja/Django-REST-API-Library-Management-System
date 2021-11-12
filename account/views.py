from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from .serializers import AdminSignUpSerializer
from .models import User
# Create your views here.

# library admin account
class AdminSignUpApiView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminSignUpSerializer
