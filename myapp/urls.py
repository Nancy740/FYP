from django.urls import path
from .views import login,register,forgot,sentiment,contact



urlpatterns = [

    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('forgot/', forgot, name='forgot'),
    path('sentiment/', sentiment, name='sentiment'),
     path('contact/', contact, name='contact'),

   
]