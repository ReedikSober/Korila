from django.db import models


# Create your models here.

class Plant(models.Model):
    name = models.CharField(max_length=100)
    harvest_start = models.CharField(max_length=100)
    harvest_ends = models.CharField(max_length=100)
    picture_url = models.URLField()
