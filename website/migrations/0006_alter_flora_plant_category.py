# Generated by Django 4.2.2 on 2023-06-08 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_alter_flora_plant_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flora',
            name='plant_category',
            field=models.CharField(choices=[('taim', 'taim'), ('seen', 'seen'), ('mari', 'mari')], max_length=50),
        ),
    ]
