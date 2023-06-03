from django.shortcuts import render


def esileht(request):
    return render(request, 'esileht.html')


def uldinfo(request):
    return render(request, 'content_files/uldinfo.html')


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
