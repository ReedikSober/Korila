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


@register.simple_tag
def evaluate_condition(index, start_month, start_week, end_month, end_week):
    if (start_month - 1) * 4 + start_week <= index <= (end_month - 1) * 4 + end_week:
        return 'true'
    else:
        return 'false'


@register.simple_tag
def before_range(start_month, start_week):
    before_span = (start_month - 1) * 4 + start_week
    return range(1, before_span)


@register.simple_tag
def flora_object_namespan(start_month, start_week, end_month, end_week):
    before_span = (start_month - 1) * 4 + start_week
    after_span = (end_month - 1) * 4 + end_week
    result = int(before_span + (after_span - before_span) / 2)
    return result


@register.simple_tag
def flora_object_range(start_month, start_week, end_month, end_week):
    before_span = (start_month - 1) * 4 + start_week
    after_span = (end_month - 1) * 4 + end_week + 1
    return range(before_span, after_span)


@register.simple_tag
def after_range(end_month, end_week):
    after_span = (end_month - 1) * 4 + end_week
    return range(after_span, 48)
