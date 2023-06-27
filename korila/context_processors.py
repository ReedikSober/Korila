def language_code(request):
    return {
        'language_code': request.LANGUAGE_CODE,
    }