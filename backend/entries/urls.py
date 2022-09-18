from sys import api_version
from rest_framework import status
from django.urls import path, include
from entries import views


urlpatterns = [
    path('', views.journal_page),
    path('add/', views.add_entry),
]