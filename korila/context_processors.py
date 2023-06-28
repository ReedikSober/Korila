from django.contrib.auth.models import User

def language_code(request):
    return {
        'language_code': request.LANGUAGE_CODE,
    }


def user_name(request):
    if request.user.is_authenticated:
        user = request.user
        user_name = user.username
    else:
        user_name = "Guest"

    return {'user_name': user_name}