from django.contrib import admin
from django.db import models
from django import forms
from .models import Flora, UserSelection

# Register your models here.


admin.site.register(Flora)
admin.site.register(UserSelection)


class YourModelAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': forms.SelectMultiple},
    }

    list_display = ['id', 'plant_category']
    list_filter = ['plant_category']
