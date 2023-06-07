from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from website.models import SignUpForm, Flora


def esileht(request):
    return render(request, 'esileht.html')


def uldinfo(request):
    return render(request, 'uldinfo.html')


def seened(request):
    return render(request, 'content_files/seened.html')


def marjad(request):
    return render(request, 'content_files/marjad.html')


def meditsiinitaimed(request):
    return render(request, 'content_files/meditsiinitaimed.html')


def teetaimed(request):
    return render(request, 'content_files/teetaimed.html')


def varvitaimed(request):
    return render(request, 'content_files/varvitaimed.html')


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


def plant_list(request):
    plants = Flora.objects.all()
    return render(request, 'kataloog.html', {'plants': plants})
