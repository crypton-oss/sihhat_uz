from rest_framework import serializers
from .models import SanatoriumProfile

class SanatoriumProfileSerializer(serializers.ModelSerializer):
    """
    SanatoriumProfile modelini JSON formatiga o'tkazish.
    Frontend (Next.js) va Mobil ilova (Flutter) uchun.
    """
    class Meta:
        model = SanatoriumProfile
        fields = '__all__'
