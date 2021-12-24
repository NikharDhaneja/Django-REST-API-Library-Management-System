from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, IssueBook, retun_book

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register('api/book', BookViewSet, basename = 'book')

# The API URLs are determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns = urlpatterns + [
    path('api/issue-book/', IssueBook.as_view()),
    path('api/return-book/', retun_book)
    # path('api/issue-book/<int:pk>/', IssueBook.as_view()),
]
