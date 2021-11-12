from django.urls import path
from .views import (
    AdminSignUpApiView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/admin-signup/', AdminSignUpApiView.as_view(), name ='api-admin-signup'),
    path('api/admin-login/', TokenObtainPairView.as_view(), name='admin-login'),
]
