from django.urls import path
from .views import (
    homepageView,
    admin_signupView,
    admin_loginView,
    add_bookView,
    retrieve_booksView,
    update_bookView,
    student_viewView,
)

urlpatterns = [
    path('', homepageView),
    path('admin-signup/', admin_signupView),
    path('admin-login/', admin_loginView),
    path('add-book/', add_bookView),
    path('retrieve-books/', retrieve_booksView),
    path('update-book/<int:pk>', update_bookView),
    path('student-view/', student_viewView),
]
