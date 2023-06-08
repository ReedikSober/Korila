from django import forms
from .models import Flora, UserSelection


class UserSelectionForm(forms.ModelForm):
    selected_plants = forms.ModelMultipleChoiceField(
        queryset=Flora.objects.all(),
        widget=forms.CheckboxSelectMultiple
    )

    class Meta:
        model = UserSelection
        fields = ('selected_plants',)


class MultipleSelectionForm(forms.ModelForm):
    your_field = forms.MultipleChoiceField(choices=Flora.categories, widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Flora
        fields = ['plant_category']
