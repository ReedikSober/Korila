from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import UserCreationForm


class Flora(models.Model):  # database of plants
    categories = [
        ('taim', 'taim'),
        ('seen', 'seen'),
        ('mari', 'mari'),
    ]
    name = models.CharField(max_length=100)
    harvest_start = models.DateField()
    harvest_end = models.DateField()
    plant_category = models.CharField(max_length=50, choices=categories)
    picture_url = models.URLField()

    def __str__(self):
        return self.name


class UserSelection(models.Model):  # many-to-many table to represent user choice from fauna list
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    selected_plants = models.ManyToManyField(Flora)

    def __str__(self):
        return self.user.username


class SignUpForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')
