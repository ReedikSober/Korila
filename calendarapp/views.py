from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from website.models import UserSelection

@login_required
def user_flora(request):
    user = request.user
    user_selection = UserSelection.objects.get(user=user)
    selected_flora = user_selection.selected_plants.all()

    return render(request, 'kalender.html', {'selected_flora': selected_flora})
