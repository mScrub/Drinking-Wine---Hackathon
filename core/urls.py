from django.urls import path
from .views import front, users, create_user

urlpatterns = [
    path('', front, name='front'),
    path('users/', users, name='users'),
    path('create_user/', create_user, name='create_user')

]