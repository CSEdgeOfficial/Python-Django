from django.shortcuts import render, redirect
from django.contrib import messages
from .models import UserRegistration
from .forms import UserRegistrationForm

# Create your views here.

def hello_world(request):
    """View for Hello World page"""
    return render(request, 'hello.html')

def register(request):
    """View for user registration"""
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Registration successful!')
            return redirect('users_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = UserRegistrationForm()
    
    return render(request, 'register.html', {'form': form})

def users_list(request):
    """View to display list of registered users"""
    users = UserRegistration.objects.all()
    return render(request, 'users_list.html', {'users': users})
