from django.db.models import F
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from website.models import UserSelection


@login_required
def calendar(request):
    user = request.user
    user_selection = UserSelection.objects.get(user=user)
    sort_option = request.session.get('selectedOption')  # Retrieve the selected sort option from session
    selected_flora = get_selected_flora(user_selection, sort_option)

    if request.path == '/calendar/':
        template_name = 'calendar.html'
    elif request.path == '/refresh-table/':
        template_name = 'refresh_table.html'

    return render(request, template_name, {'selected_flora': selected_flora})


@csrf_exempt
@login_required
def store_selected_option(request):
    selected_option = request.POST.get('selectedOption')
    request.session['selectedOption'] = selected_option  # Store the selected option in the session
    return JsonResponse({'message': 'Selected option received successfully'})


def get_selected_flora(user_selection, sort_option):
    selected_flora = user_selection.selected_plants.all()

    if sort_option == 'date':
        selected_flora = selected_flora.annotate(
            date=(F('harvest_start_month') * 4) + F('harvest_start_week')
        ).order_by('date')  # Sort by Date
    elif sort_option == 'name':
        selected_flora = selected_flora.order_by('name')  # Sort by Name

    return selected_flora
