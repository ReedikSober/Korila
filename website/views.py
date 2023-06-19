from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from website.forms import UserSelectionForm
from website.models import SignUpForm, Flora, UserSelection
from django.http import JsonResponse


def esileht(request):
    return render(request, 'esileht.html')


def uldinfo(request):
    return render(request, 'uldinfo.html')


def seened(request):
    return render(request, 'content_files/seened.html')


def marjad(request):
    return render(request, 'content_files/marjad.html')


def taimed(request):
    return render(request, 'content_files/taimed.html')


def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=user.username, password=raw_password)
            login(request, user)
            return redirect('/')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})


@login_required
def plant_list(request):
    plants = Flora.objects.all()
    user = request.user

    if request.method == 'POST':
        form = UserSelectionForm(request.POST)
        if form.is_valid():
            user_selection, created = UserSelection.objects.get_or_create(user=user)
            user_selection.selected_plants.set(form.cleaned_data['selected_plants'])
            messages.success(request, 'Selection saved successfully.')

    else:
        user_selection, created = UserSelection.objects.get_or_create(user=user)
        initial_data = {'selected_plants': user_selection.selected_plants.all()}
        form = UserSelectionForm(initial=initial_data)

    return render(request, 'kataloog.html', {'plants': plants, 'form': form})


def search_flora(request):
    search_input = request.GET.get('searchInput')

    # Perform the search query
    flora_objects = Flora.objects.filter(name__icontains=search_input)

    # Create a list of dictionaries containing the data for each flora object
    flora_data = []
    for flora in flora_objects:
        flora_data.append({
            'name': flora.name,
            'harvest_start_month': flora.harvest_start_month,
            'harvest_start_week': flora.harvest_start_week,
            'harvest_end_month': flora.harvest_end_month,
            'harvest_end_week': flora.harvest_end_week,
            'plant_category': flora.plant_category,
            'description': flora.description,
            'picture_url': flora.picture_url,
        })

    # Return the flora data as a JSON response
    return JsonResponse(flora_data, safe=False)


#
