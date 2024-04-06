from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import *
from .models import  *
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
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
        confirmpassword = data.get('confirmpassword')

        if password != confirmpassword:
            return JsonResponse({'success': False, 'message': 'Passwords do not match'})

        try:
            user = UserAuth.objects.get(email=email)
        except UserAuth.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User does not exist'})

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
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        try:
            user = UserAuth.objects.get(email=email)
        except UserAuth.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User does not exist'})

        # Generate a random token for password reset
        token = secrets.token_hex(20)
        user.reset_password_token = token
        user.save()

        # Compose the reset password link
        reset_password_link = f"http://localhost:3000/reset/{token}"  

        # Send the reset password email
        send_mail(
            'Reset Your Password',
            f'Click the following link to reset your password: {reset_password_link}',
            'from@example.com',
            [email],
            fail_silently=False,
        )

        return JsonResponse({'success': True, 'message': 'Password reset link sent to your email'})
    else:
        return JsonResponse({'message': 'Invalid request method'})
    
@csrf_exempt
def sentiment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            print(data.get('answerpart1',[]))
            answers_part1 = data.get('answerspart1', [])
            answers_part2 = data.get('answerspart2', [])
            
            return JsonResponse({'success': True, 'message': 'Data received and processed successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})


@csrf_exempt
def receive_data(request):
    if request.method == 'POST':
        try:
            # Parse JSON data from request body
            received_data = json.loads(request.body)
            print('Received data:', received_data)
            return JsonResponse({'message': 'Data received successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)