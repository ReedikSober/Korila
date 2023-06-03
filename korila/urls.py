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


urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', views.esileht, name='esileht'),
    path('uldinfo/', views.uldinfo, name='uldinfo'),
    path('seened/', views.seened, name='seened'),
    path('marjad/', views.marjad, name='marjad'),
    path('meditsiinitaimed/', views.meditsiinitaimed, name='meditsiinitaimed'),
    path('teetaimed/', views.teetaimed, name='teetaimed'),
    path('varvitaimed/', views.varvitaimed, name='varvitaimed'),

    # path('contact/', views.contact, name='contact'),

]
