from django.shortcuts import render

# Create your views here.

def homepageView(request):
    return render(request, 'homepage.html')

def admin_signupView(request):
    return render(request, 'admin_signup.html')

def admin_loginView(request):
    return render(request, 'admin_login.html')

def add_bookView(request):
    return render(request, 'add_book.html')

def my_booksView(request):
    return render(request, 'my_books.html')

def update_bookView(request, pk):
    return render(request, 'update_book.html')

def student_viewView(request):
    return render(request, 'student_view.html')

def issue_bookView(request):
    return render(request, 'issue_book.html')

def return_bookView(request):
    return render(request, 'return_book.html')
