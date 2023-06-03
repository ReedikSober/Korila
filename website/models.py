from django.db import models


# Create your models here.

class Plant(models.Model):
    name = models.CharField(max_length=100)
    months_to_harvest = models.PositiveIntegerField()
    picture_url = models.URLField()
