from django.db import models

# class Login(models.Model):
#    email = models.CharField(max_length=50)
#    password = models.CharField(max_length=50)


#    def __str__(self):
#       return self.email

# class Register(models.Model):
#    email = models.CharField(max_length=50)
#    password = models.CharField(max_length=50)
#    # confirmpassword = models.CharField(max_length=50)


#    def __str__(self):
#       return self.email


class UserAuth(models.Model):
   email = models.CharField(max_length=50)
   password = models.CharField(max_length=50)


def __str__(self):
   return self.email

class Contact(models.Model):
   first_name = models.CharField(max_length=50)
   last_name = models.CharField(max_length=50)
   email = models.CharField(max_length=50)
   message = models.CharField(max_length=100)

   def __str__(self):
      return self.email