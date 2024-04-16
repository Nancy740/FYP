from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import *
from .models import  *
from django.views.decorators.csrf import csrf_exempt
import json
import random
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
import pickle
from . import models



@csrf_exempt
def login(request):
    if request.method=='POST':
        data=json.loads(request.body)
        password=data.get('password')
        email=data.get('email')
        print(f'Email: {email}, Password: {password}')

    # Authenticate user
        try:
            user = UserAuth.objects.get(email=email, password=password)
        except UserAuth.DoesNotExist:
            user = None

        if user:
            # Authentication successful
            return JsonResponse({"success": True, "message": "Login successful"})
        else:
            # Authentication failed
            return JsonResponse({"success": False, "message": "Invalid credentials"})

    # Incorrect HTTP method or other cases
    return JsonResponse({"success": False, "message": "incorrect method"})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)
        email = data.get('email')
        password = data.get('password')
        confirmPassword = data.get('confirmpassword')

        if password != confirmPassword:
            return JsonResponse({'success': False, 'message': 'Passwords do not match'})

        try:
            user = UserAuth.objects.get(email=email)
            return JsonResponse({'success': False, 'message': 'User already exists'})
        except UserAuth.DoesNotExist:
            user = UserAuth.objects.create(
                email=email,
                password=password
            )
            user.save()
            return JsonResponse({'success': True, 'message': 'User created successfully'})
    else:
        return JsonResponse({'message': 'Invalid request method'})

@csrf_exempt
def forgot(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email=data.get('email')
        print(email)    
        try:
            user = UserAuth.objects.get(email=email)
        except UserAuth.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User does not exist'})

        # Generate OTP for password reset
        otp = random.randint(111111, 999999)
        user.otp_token = otp
        user.save()

        # Compose email message
        subject = "Password Reset OTP"
        message = f"Your OTP for password reset is: {otp}. Please do not share it with anyone."
        from_email = settings.EMAIL_HOST_USER  
        recipient = [email]
        print(message)
        try:
            send_mail(subject, message, from_email, recipient)
            print(otp)
            JsonResponse({'success': True, 'message': 'Otp sent'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': 'Failed to send OTP. Please try again later.'})

        return JsonResponse({'success': True, 'message': 'OTP sent to your email'})
    else:
        return JsonResponse({'message': 'Invalid request method'})

@csrf_exempt
def reset(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print(data)
        new_password = data.get('newPassword')
        email=data.get('email')
        print(new_password)
        print(email)
        if(UserAuth.objects.filter(email=email).exists):
            data = UserAuth.objects.get(email=email)
            data.password = new_password
           

            data.save()
            print(data)
            return JsonResponse({'success': True, 'message': 'Password changed successfully'})
        return JsonResponse("User doesnot exist")
    return JsonResponse("It should be post")

    
@csrf_exempt
def sentiment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            print(data.get('answerpart1',[]))
            answers_part1 = data.get('answerspart1', [])
            answers_part2 = data.get('answerspart2', [])
            received_data = [answers_part1,answers_part2] 
            # print(os.getcwd())
            # model_path = os.path.join(os.getcwd(), "model\\svc.pkl")

            with open(r'backend/model/svc.pkl', 'rb') as f:
                model = pickle.load(f)
                print(model)
            
            # # predictions = model.predict(received_data)
            # predictions = model.predict([[1]])
            # print('Predictions:', predictions)

        
            return JsonResponse({'success': True, 'message': 'Data received and processed successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})


# @csrf_exempt
# def receive_data(request):
#     if request.method == 'POST':
#         try:
#             # Parse JSON data from request body
#             received_data = json.loads(request.body)
#             print('Received data:', received_data)
#             return JsonResponse({'message': 'Data received successfully'})
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON data'}, status=400)
#     else:
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

# @csrf_exempt
# def predictions(request):
#     # if request.method == 'POST':
#     if True:
#         try:
#             # Load the model from the pickle file
#             with open('model/svc.pkl', 'rb') as f:
#                 model = pickle.load(f)

#             # Parse JSON data from request body
#             received_data = json.loads(request.body)
#             print('Received data:', received_data)

#             # Assuming your model.predict() function expects some data
#             predictions = model.predict(received_data)
#             print('Predictions:', predictions)
#             # Return the prediction or render a template with the result
#             return JsonResponse({'predictions': predictions.tolist()})  # Convert predictions to list if necessary
#         except FileNotFoundError:
#             return JsonResponse({'error': 'Model file not found'}, status=500)
#         except Exception as e:
#             return JsonResponse({'error': str(e)}, status=500)
#     else:
#         return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def contact(request):   
    if request.method == 'POST':
        data=json.loads(request.body)
        # Process the form data
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        message = data.get('message')
        print(first_name)
        print(last_name)
        
        contact = Contact.objects.create(
            first_name = first_name,
            last_name = last_name, 
            email = email,
            message = message
        )
        contact.save()


        return JsonResponse({'message': 'Form submitted successfully'})
    else:
        # Return an error response if the request method is not POST
        return JsonResponse({'error': 'Invalid request method'}, status=400)     