
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
    path('search/', views.search_flora, name='search_flora'),
    # path('contact/', views.contact, name='contact'),

]
