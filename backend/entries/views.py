from math import perm
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Entries
from .serializers import EntriesSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def journal_page(request):
    entry = Entries.objects.all()
    serializer = EntriesSerializer(entry, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_entry(request):
    serializer = EntriesSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
