from rest_framework import serializers
from .models import SanatoriumBanner

class SanatoriumBannerSerializer(serializers.ModelSerializer):
    """
    SanatoriumBanner modelini JSON formatiga o'tkazish uchun serializer.
    Frontend (Flutter) dasturchisi ushbu maydonlardan foydalanadi.
    """
    class Meta:
        model = SanatoriumBanner
        fields = [
            'id',
            'name',
            'description',
            'phone_number',
            'telegram_link',
            'instagram_link',
            'price_per_day',
            'image1',
            'image2',
            'image3',
            'image4',
            'image5',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
