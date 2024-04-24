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
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import re
import jwt
from sklearn.svm import LinearSVC
import joblib
from django.core.serializers.json import DjangoJSONEncoder


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

            # Extracting answers from request data
            answers_part1 = data.get('answerpart1', [])
            answers_part2 = data.get('answerpart2', [])

            # Combining answers from both parts
            received_data = answers_part1 + answers_part2
            print(received_data)

            try:
                # Loading the trained model
                with open(r'backend/model/svm2.pkl', 'rb') as f: 
                    model_data = pickle.load(f)
                    # print(f"saved instance: {saved_data}")
                    print(model_data)
             
                   
                    # vectorizer_vocab =  model_data.vectorizer_vocab
                    # print(vectorizer_vocab)

            except FileNotFoundError:
                return JsonResponse({'success': False, 'message': 'Could not find the pickle file.'})
            except KeyError:
                return JsonResponse({'success': False, 'message': 'Missing "model" or "vectorizer_vocab" key in the pickle file.'})
            except Exception as e:
                print(f"Error: {e}")
                return JsonResponse({'success': False, 'message': 'An error occurred while loading the model.'})
            
            
            # Initialize TF-IDF Vectorizer with vocabulary from trained model
            # vectorizer = TfidfVectorizer(vocabulary=vectorizer_vocab)
            vectorizer = TfidfVectorizer()
            print(vectorizer)
    
            # Transforming the received data into TF-IDF matrix
            tfidf_matrix = vectorizer.fit_transform(["have you experienced changes in your appetite such as eating much more or much less than usual"])
            print(tfidf_matrix)
                
            reshaped_gay = tfidf_matrix.reshape(1, -1)
            # Making predictions using the loaded model
            predictions = model_data.predict(reshaped_gay)
            print(predictions)
            

            # Converting predictions into human-readable format
            prediction_text = ["The model predicts that the user has mental issues." if pred == 1 
                               else  "The model predicts that the user does not have mental issues." 
                               for pred in predictions]

            return JsonResponse({'success': True, 'predictions': prediction_text})

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
        except Exception as e:
            print(f"Error: {e}")
          
            return JsonResponse({'success': False, 'message': 'An unexpected error occurred.'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})



# def sentiment(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             print(data)

#             # Extracting answers from request data
#             answers_part1 = data.get('answerpart1', [])
#             answers_part2 = data.get('answerpart2', [])

#             # Combining answers from both parts
#             received_data = answers_part1 + answers_part2
#             print(received_data)

#             try:
#                 # Loading the trained model
#                 with open(r'backend/model/datas.pkl', 'rb') as f:
#                     saved_data = pickle.load(f)
#                     model = saved_data['model']
#                     print(model)
#                     vectorizer_vocab = saved_data['vectorizer_vocab']
#             except FileNotFoundError:
#                 return JsonResponse({'success': False, 'message': 'Could not find the pickle file.'})
#             except KeyError:
#                 return JsonResponse({'success': False, 'message': 'Missing "model" or "vectorizer_vocab" key in the pickle file.'})
#             except Exception as e:
#                 print(f"Error: {e}")
#                 return JsonResponse({'success': False, 'message': 'An error occurred while loading the model.'})

#             # Initialize TF-IDF Vectorizer with vocabulary from trained model
#             vectorizer = TfidfVectorizer(vocabulary=vectorizer_vocab)

#             # Transforming the received data into TF-IDF matrix
#             tfidf_matrix = vectorizer.transform(received_data)

#             # Making predictions using the loaded model
#             predictions = model.predict(tfidf_matrix)

#             # Converting predictions into human-readable format
#             prediction_text = ["The model predicts that the user has mental issues." if pred == 1 
#             else  "The model predicts that the user does not have mental issues." for pred in predictions]

#             return JsonResponse({'success': True, 'predictions': prediction_text})

#         except json.JSONDecodeError:
#             return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
#         except Exception as e:
#             print(f"Error: {e}")
#             print(traceback.format_exc())
#             return JsonResponse({'success': False, 'message': 'An unexpected error occurred.'})
#     else:
#         return JsonResponse({'success': False, 'message': 'Invalid request method'})


    # if request.method == 'POST':
    #     try:
    #         data = json.loads(request.body)
    #         print(data)
    #         print(data.get('answerpart1',[]))
    #         print(data.get('answerpart2',[]))
           
    #         answers_part1 = data.get('answerpart1', [])
    #         answers_part2 = data.get('answerpart2', [])
           
    #         print(answers_part1)
    #         print(answers_part2)   
    #         received_data = answers_part1+answers_part2
    #         print("Receive data",received_data)
           
    #         # recieved_array = np.array(received_data)
    #         # print(recieved_array,"recieved array")

    #         # reshaped_data = recieved_array.reshape(-1,1)
    #         # print(reshaped_data,"reshaped data")

    #         # Initialize TF-IDF Vectorizer
    #         tfidf_vectorizer = TfidfVectorizer()

    #         # Fit and transform the data
    #         tfidf_matrix = tfidf_vectorizer.fit_transform(received_data)

                        
    #         # # Initialize LabelEncoder
    #         # label_encoder = LabelEncoder()
    #         # print(label_encoder,"label encoder")

    #         # # Fit and transform the data
    #         # encoded_data = label_encoder.fit_transform(received_data)
    #         # print(encoded_data,"encoded data")

    #         # # Reshape the encoded data to make it 2D
    #         # reshaped_encoded_data = encoded_data.reshape(4, 5)
    #         # print(reshaped_encoded_data,"reshaped encoded data")

            
    #         with open(r'backend/model/data.pkl', 'rb') as f:
    #             model = pickle.load(f)
    #             print(model)
            
            
    #         predictions = model.predict(tfidf_matrix)
    #         print('Predictions:', predictions)

    #         if prediction[0] == 1:
    #             return jsonify({"prediction": "The model predicts that the user has mental issues."})
    #         else:
    #             return jsonify({"prediction": "The model predicts that the user does not have mental issues."})
    #         return JsonResponse({'success': True, 'message': 'Data received and processed successfully'})
    #     except json.JSONDecodeError:
    #         return JsonResponse({'success': False, 'message': 'Invalid JSON data'})
    # else:
    #     return JsonResponse({'success': False, 'message': 'Invalid request method'})


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
    
