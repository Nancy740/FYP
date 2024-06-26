from rest_framework import serializers
from .models import *

# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Login
#         fields = '_all_'

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Register
#         fields = '_all_'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAuth
        fields = '__all__'
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Remove the 'password' field from the serialized data
        data.pop('password', None)
        return data