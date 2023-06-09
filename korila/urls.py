"""
URL configuration for korila project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from website import views
from calendarapp import views as cviews
urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', views.esileht, name='esileht'),
    path('uldinfo/', views.uldinfo, name='uldinfo'),
    path('seened/', views.seened, name='seened'),
    path('marjad/', views.marjad, name='marjad'),
    path('taimed/', views.taimed, name='taimed'),
    path('signup/', views.signup, name='signup'),
    path('kataloog/', views.plant_list, name='plant_list'),
    path('kalender/', cviews.user_flora, name='user_flora'),
    # path('contact/', views.contact, name='contact'),

]
