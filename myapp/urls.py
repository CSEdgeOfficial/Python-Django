from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello_world, name='hello'),
    path('register/', views.register, name='register'),
    path('users/', views.users_list, name='users_list'),
]
