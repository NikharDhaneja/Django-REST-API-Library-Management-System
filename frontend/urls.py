from django.urls import path
from .views import (
    homepageView,
    admin_signupView,
    admin_loginView,
    add_bookView,
    my_booksView,
    update_bookView,
    student_viewView,
)

urlpatterns = [
    path('', student_viewView),
    path('admin-signup/', admin_signupView),
    path('admin-login/', admin_loginView),
    path('add-book/', add_bookView),
    path('my-books/', my_booksView),
    path('update-book/<int:pk>', update_bookView),
    # path('student-view/', student_viewView),
]
