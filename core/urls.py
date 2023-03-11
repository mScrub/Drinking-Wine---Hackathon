from django.urls import path
from .views import front, users

urlpatterns = [
    path('', front, name='front'),
    path('users/', users, name='users'),
]