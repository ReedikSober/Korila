from django import forms
from .models import Flora, UserSelection
from django.utils.translation import gettext_lazy as _


class UserSelectionForm(forms.ModelForm):
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

        # Sort plants within each category alphabetically
        for plants in grouped_plants.values():
            plants.sort(key=lambda x: str(x))

            # Define the desired order of the groups
            desired_order = ['Plants', 'Berries', 'Mushrooms', 'Other']  # Customize the order as per your requirements

            # Update the choices of the existing selected_plants field
            new_widget_choices = []
            for category in desired_order:
                if category in grouped_plants:
                    plants = grouped_plants[category]
                    plants_choices = [(plant.pk, str(plant)) for plant in plants]
                    new_widget_choices.append((_(category), plants_choices))

            self.fields['selected_plants'].choices = new_widget_choices

    class Meta:
        model = UserSelection
        fields = ('selected_plants',)
