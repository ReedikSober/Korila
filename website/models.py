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
    MONTH_CHOICES = [
        (1, 'January'),
        (2, 'February'),
        (3, 'March'),
        (4, 'April'),
        (5, 'May'),
        (6, 'June'),
        (7, 'July'),
        (8, 'August'),
        (9, 'September'),
        (10, 'October'),
        (11, 'November'),
        (12, 'December'),
    ]

    WEEK_CHOICES = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
    ]
    name = models.CharField(max_length=100)
    harvest_start_month = models.IntegerField(choices=MONTH_CHOICES)
    harvest_start_week = models.IntegerField(choices=WEEK_CHOICES)
    harvest_end_month = models.IntegerField(choices=MONTH_CHOICES)
    harvest_end_week = models.IntegerField(choices=WEEK_CHOICES)
    plant_category = models.CharField(max_length=50, choices=categories)
    description = models.CharField(max_length=500, null=True)
    picture_url = models.URLField(null=True)

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
