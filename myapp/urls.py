from django.urls import path
from .views import login,register,forgot,sentiment,contact,forgot,reset



urlpatterns = [

    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('forgot/', forgot, name='forgot'),
    path('sentiment/', sentiment, name='sentiment'),
    path('contact/', contact, name='contact'),
    path('forgot/', forgot, name='forgot'),
    path('reset/', reset, name='reset'),
    # path('receive_data/', receive_data, name='receive_data'),
    # path('predictions/', predictions, name='predictions'),


   
]