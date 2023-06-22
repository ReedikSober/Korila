from django import forms
from .models import Flora, UserSelection

class UserSelectionForm(forms.ModelForm):
    selected_plants = forms.ModelMultipleChoiceField(
        queryset=Flora.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    def __init__(self, *args, **kwargs):
        super(UserSelectionForm, self).__init__(*args, **kwargs)
        # Group selected plants by categories
        category_choices = dict(Flora.categories)
        grouped_plants = {}
        for plant in self.fields['selected_plants'].queryset:
            category = plant.get_plant_category_display()
            if category not in grouped_plants:
                grouped_plants[category] = []
            grouped_plants[category].append(plant)

        # Update the widget choices to include category headings
        new_widget_choices = []
        for category, plants in grouped_plants.items():
            new_widget_choices.append((category, [(plant.pk, str(plant)) for plant in plants]))
        self.fields['selected_plants'].widget.choices = new_widget_choices

    class Meta:
        model = UserSelection
        fields = ('selected_plants',)
