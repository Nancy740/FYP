from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializer import *
from .models import  *
from django.views.decorators.csrf import csrf_exempt
import json
import os
import random
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
import pickle
from . import models
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import re
import jwt
from sklearn.svm import LinearSVC
import joblib
from django.core.serializers.json import DjangoJSONEncoder
from pickle import load
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from json import loads, dumps
from tensorflow import keras
# from tensorflow.python.keras.saving import pickle_utils

# from .utils.tokenizer import tokenizer
from .utils.sentiment_analysis import tokenizer

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data_json = json.loads(request.body)
        email= data_json.get("email")
        password = data_json.get("password")
        print(email,password)
        try:
            user=UserAuth.objects.get(email=email)
            responsedata=UserSerializer(user)
            token = jwt.encode(responsedata.data, "secret", algorithm="HS256")
            request.session['token'] = token
            request.session.save()
            print(request.session.get('token'))
            print(token)
            if (password==user.password):
                return JsonResponse({"success":True,"message":token})
            else:  
                return JsonResponse({"success":False,"message":"password doesn't match"})
        except Exception as e:
            return JsonResponse({"success":False,"message":str(e)})
    return JsonResponse({"success":False,"message": "The request should be POST"})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data_json = json.loads(request.body)
        serializer = UserSerializer(data=data_json)
        
        if serializer.is_valid():
            user = serializer.save()
            user.save()
            return JsonResponse({"success":True,"message": "Signup successful"})

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


def predict(text, model_1, include_neutral=True):
    max_length = 50
    x_test = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=max_length)
    # Predict
    label = None
    score = model_1.predict([x_test])[0]
    if(score >=0.4 and score<=0.6):
        label = "Neutral"
    elif(score >=0.4):
        label = "Negative"
    elif(score <=0.6):
        label = "Positive"

    return {"label" : label,
        "score": float(score)}
           
@csrf_exempt
def sentiment(request):
    if request.method == 'POST':
        try:
            # load model
            loaded_model = keras.models.load_model('backend/model/Sentiment_LSTM_model.h5')                                                   
            print("predict", predict("I hate women", loaded_model))
            # print("predict", predict("Yes I have experienced apeptite changes", loaded_model))
            data = json.loads(request.body)

            # Extracting answers from request data
            answers_part1 = data.get('answerpart1', [])
            answers_part2 = data.get('answerpart2', [])

            # Combining answers from both parts
            received_data = answers_part1 + answers_part2
            print("received_data", received_data)

            # predict answers and store in array
            answer_part1_result=[]
            answer_part2_result=[]
            with open('myapp/utils/payload1_transform.json','r') as part1_file:
                json_dict1=json.load(part1_file)
                for count,answerpart in enumerate(answers_part1):
                    print(json_dict1[str(count+1)][answerpart])
                    predicted_score = predict(str(json_dict1[str(count+1)][answerpart]), loaded_model)
                    print("predicted_score", predicted_score)
                    # answer_part1_result.append(predict(json_dict1[str(count+1)][answerpart], loaded_model))
            with open('myapp/utils/payload2_transform.json','r') as part2_file:
                json_dict2=json.load(part2_file)
                for count,answerpart in enumerate(answers_part2):
                    print(json_dict2[str(count+1)][answerpart])
                    answer_part2_result.append(predict(json_dict2[str(count+1)][answerpart], loaded_model))

            print("answers \n", answer_part1_result, "\n", answer_part2_result)


        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'success': False, 'message': str(e)})

 

    return JsonResponse({'success': False, 'message': 'Invalid request method. Use POST.'})

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



@csrf_exempt
def medical(request):   
    if request.method == 'POST':
        data = json.loads(request.body)
       
        full_name = data.get('fullName')
        age = data.get('age')
        diagnosis = data.get('diagnosis')
        medications = data.get('medications')
        
        medical_record = MedicalRecord.objects.create(
            full_name=full_name,
            age=age,
            diagnosis=diagnosis,
            medications=medications
        )
        medical_record.save()

        return JsonResponse({'message': 'Form submitted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def checkuser(request):
    if request.method=="POST":
        usertoken=request.headers.get('Authorization')
        token=request.session.get('token')
        print(usertoken)
        print("token:",token)
        if usertoken == token:
            print("success")
            return JsonResponse({"success":True})
        else:
            print("not")
            return JsonResponse({"success":False})

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400 )
    
