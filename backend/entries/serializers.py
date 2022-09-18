from rest_framework import serializers
from .models import Entries


class EntriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entries
        fields = ['id', 'title', 'description', 'date_created', 'current_mood']
        depth = 1