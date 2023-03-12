from django.urls import path
from .views import front, users, create_user, login, writing, is_logged_in, get_chatgpt_response

urlpatterns = [
    path('', front, name='front'),
    path('users/', users, name='users'),
    path('create_user/', create_user, name='create_user'),
    path('login/', login, name='login'),
    path('writing/', writing, name='writing'),
    path('is_logged_in/', is_logged_in, name='is_logged_in'),
    path('get_chatgpt_response/', get_chatgpt_response,
         name='get_chatgpt_response'),
]
