from django.urls import path
from .views import login,register,forgot,sentiment,contact,reset,medical,checkuser



urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('forgot/', forgot, name='forgot'),
    path('sentiment/', sentiment, name='sentiment'),
    path('contact/', contact, name='contact'),
    path('forgot/', forgot, name='forgot'),
    path('reset/', reset, name='reset'),
    path('medical/', medical, name='medical'),
    path('checkuser/',checkuser,name="checkuser"),
    # path('predictions/', predictions, name='predictions'),
   ]