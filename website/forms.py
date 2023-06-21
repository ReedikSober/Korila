from django import forms
from .models import Flora, UserSelection


class UserSelectionForm(forms.ModelForm):
    selected_plants = forms.ModelMultipleChoiceField(
        queryset=Flora.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    class Meta:
        model = UserSelection
        fields = ('selected_plants',)