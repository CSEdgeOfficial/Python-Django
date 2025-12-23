from django.contrib import admin
from .models import UserRegistration

# Register your models here.

@admin.register(UserRegistration)
class UserRegistrationAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name', 'phone', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('username', 'email', 'full_name')
    readonly_fields = ('created_at',)
