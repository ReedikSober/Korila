from django.db import models
from django.contrib.auth.models import User


class Flora(models.Model):  # database of plants
    name = models.CharField(max_length=100)
    harvest_start = models.DateTimeField()
    harvest_end = models.DateTimeField()
    picture_url = models.URLField()


class UserSelection(models.Model):  # many-to-many table to represent user choice from fauna list
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    selected_plants = models.ManyToManyField(Flora)

    def __str__(self):
        return self.user.username
