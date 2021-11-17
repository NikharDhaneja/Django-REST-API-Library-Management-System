from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BookSerializer
from .models import Book
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsAdminUserOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
# Create your views here.

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-created_at')
    serializer_class = BookSerializer
    authentication_classes = [ JWTAuthentication]
    permission_classes = [ IsAdminUserOrReadOnly ]

    """
    Returns Books that are uploaded by the current admin.
    This is Extra method we added in viewset for routing.
    detail = 'False' means router send you list of objects
    detail = 'True' means returns single object
    request url = (host)/api/book/mybooks/
    """
    @action(detail = False, methods = ["get"], authentication_classes=[JWTAuthentication], url_path = "mybooks")
    def my_books(self, request):
        print(request.user.id)
        my_books = self.queryset.filter(admin_id = request.user.id)
        serializer = self.get_serializer(my_books, many=True)
        return Response(serializer.data)

    """
    Here, we are adding extra field value to our serializer to
    automatically assign admin_id value while adding new book.

    We have 'perform_create' method because if we want to add extra
    field value to serializer we do not need to overide 'create' method.
    if we overide create method for just adding extra field value than it
    just defeats the purpose of having mixins doing the heavy and boring work.
    """
    def perform_create(self, serializer):
        serializer.save(admin_id = self.request.user.id)
