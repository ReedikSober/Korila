from datetime import datetime

from django import template

register = template.Library()


@register.filter(name='get_range')
def get_range(value, arg):
    return range(value, arg)


@register.filter(name='multiply')
def multiply(value, arg):
    return value * arg


@register.filter
def month_name(month_number):
    return datetime.strptime(str(month_number), "%m").strftime("%B")
