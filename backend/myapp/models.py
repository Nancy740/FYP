from datetime import datetime
from django.db import models

class UserAuth(models.Model):
   name = models.CharField(max_length=50)
   address = models.CharField(max_length=50)
   phone = models.CharField(max_length=50)
   email = models.CharField(max_length=50)
   password = models.CharField(max_length=50)
   gender=models.CharField(max_length=50)


def __str__(self):
   return self.email

# class UserAuth(models.Model):
#    email = models.CharField(max_length=50)
#    password = models.CharField(max_length=50) 

class Contact(models.Model):
   first_name = models.CharField(max_length=50)
   last_name = models.CharField(max_length=50)
   email = models.CharField(max_length=50)
   message = models.CharField(max_length=100)

   def __str__(self):
      return self.email


class MedicalRecord(models.Model):
    full_name = models.CharField(max_length=100)
    age = models.IntegerField()
    diagnosis = models.TextField()
    medications = models.TextField()

    def __str__(self):
        return self.full_name

class SentimentPredictionRecord(models.Model):
    # user = models.ForeignKey('UserAuth', on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50)
    sentiment_score = models.FloatField()
    sentiment_status = models.CharField(max_length=10)
    created_at = models.DateTimeField(default=datetime.now)

    @classmethod
    def create(cls, name, sentiment_score, sentiment_status):
        return cls.objects.create(
                name=name,
                sentiment_score=sentiment_score,
                sentiment_status=sentiment_status,
                )

