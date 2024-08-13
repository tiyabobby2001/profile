# resumes/models.py
from django.db import models

class Address(models.Model):
    houseNo = models.CharField(max_length=10)
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6)

class Experience(models.Model):
    companyName = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    dateOfJoining = models.DateField()
    dateOfResign = models.DateField()

class Register(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    dateOfBirth = models.DateField()
    email = models.EmailField()
    gender = models.CharField(max_length=10)
    languages = models.JSONField()
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    experiences = models.ManyToManyField(Experience)
   
