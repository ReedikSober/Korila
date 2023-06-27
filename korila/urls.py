from django.contrib import admin
from django.urls import include, path
from website import views
from calendarapp import views as cviews

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', views.home, name='home'),
    path('general/', views.general, name='general'),
    path('signup/', views.signup, name='signup'),
    path('catalogue/', views.plant_list, name='plant_list'),
    path('search/', views.search_flora, name='search_flora'),
    path('add-to-calendar/', views.add_to_calendar, name='add-to-calendar'),
    path('remove-from-calendar/', views.remove_from_calendar, name='remove-from-calendar'),
    path('calendar/', cviews.calendar, name='user_flora'),
    path('refresh-table/', cviews.calendar, name='refresh-table'),
    path('sort-by-selection/', cviews.store_selected_option, name='store-selected-option'),
    path('toggle-language/<str:language_code>/', views.toggle_language, name='toggle_language'),

]
