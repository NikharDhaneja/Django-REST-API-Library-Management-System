from rest_framework import viewsets, status
from .serializers import BookSerializer, IssueBookSerializer, ReturnBookSerializer
from .models import Book, Issue
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from .permissions import IsAdminUserOrReadOnly
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.views import APIView
from datetime import timedelta, date


"""
CRUD - Book
"""
class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    authentication_classes = [ JWTAuthentication]
    permission_classes = [ IsAdminUserOrReadOnly ]

    """
    Gives all Books if no query parameter passed and gives filtered
    Books by category,author and title if query parameter passed by user.
    """
    def get_queryset(self):
        search_input = self.request.GET.get('search_input')

        if( search_input == None):
            books = Book.objects.all().order_by('-created_at')
        else:
            books = Book.objects.filter(
                Q(category__icontains = search_input)
                | Q(title__icontains = search_input)
                | Q(author__icontains = search_input)
            ).order_by('-created_at')
        return books

    """
    Returns Books that are uploaded by the current admin.
    This is Extra method we added in viewset for routing.
    detail = 'False' means router send you list of objects
    detail = 'True' means returns single object
    request url = (host)/api/book/mybooks/
    """
    @action(detail = False, methods = ["get"], authentication_classes=[JWTAuthentication], url_path = "mybooks")
    def my_books(self, request):
        my_books = self.get_queryset().filter(admin_id = request.user.id)
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


"""
Issue Book
"""
class IssueBook(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]

    """
    This method creates entry when book is being issued
    """
    def post(self, request):
        due_date = date.today() + timedelta(days = 15)
        request.data['issuer'] = request.user.id
        request.data['due_date'] = due_date
        serializer = IssueBookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""
Return Book
"""
@api_view(['POST'])
def retun_book(request):
    serializer = ReturnBookSerializer(data = request.data)
    if serializer.is_valid():
        obj = Issue.objects.get(book = serializer.data["book"], copy_no = serializer.data["copy_no"])
        if obj:
            if not (obj.is_returned):
                obj.is_returned = True
                obj.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"Already Returned"})
        else:
            return Response({"No record found"})
    return Response(serializer.errors)
