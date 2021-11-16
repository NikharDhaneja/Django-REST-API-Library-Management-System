from django.urls import path
from .views import (
    AdminSignUpApiView,
    MyTokenObtainPairView,
)

urlpatterns = [
    path('api/admin-signup/', AdminSignUpApiView.as_view(), name ='api-admin-signup'),
    path('api/admin-login/', MyTokenObtainPairView.as_view(), name='admin-login'),
]
