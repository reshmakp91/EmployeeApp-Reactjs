from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    image = models.ImageField(upload_to='media/',null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

class Users(models.Model):
    admin_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


    def __str__(self):
        return f"{self.admin_name}"