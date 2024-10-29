from django.contrib import admin

# Register your models here.
from .models import Tool, Rental, Supplier, Customer


admin.site.register(Tool)
admin.site.register(Rental)
admin.site.register(Supplier)
admin.site.register(Customer)