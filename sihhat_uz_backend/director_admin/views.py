from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import SanatoriumProfile
from .serializers import SanatoriumProfileSerializer
from .supabase_sync import sync_to_supabase

class SanatoriumProfileViewSet(viewsets.ModelViewSet):
    """
    Sanatoriya profillarini boshqarish uchun API.
    Ma'lumot saqlanganda avtomatik Supabase bilan sinxronizatsiya qilinadi.
    """
    queryset = SanatoriumProfile.objects.all().order_by('-created_at')
    serializer_class = SanatoriumProfileSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # 1. Ma'lumotni Django bazasiga saqlash
        instance = serializer.save()

        # 2. Supabase uchun ma'lumotlarni tayyorlash
        # Rasmlar uchun to'liq URL manzilini yasash kerak
        request = self.request
        base_url = f"{request.scheme}://{request.get_host()}"

        data = {
            "id": instance.id,
            "name": instance.name,
            "region": instance.region,
            "location_url": instance.location_url,
            "description": instance.description,
            "daily_price": float(instance.daily_price),
            "advance_price": float(instance.advance_price),
            "image1": f"{base_url}{instance.image1.url}" if instance.image1 else None,
            "telegram": instance.telegram,
            "instagram": instance.instagram,
            "phone1": instance.phone1,
            # Qolgan maydonlarni ham shunday qo'shish mumkin
        }

        # 3. Supabase'ga yuborish
        sync_to_supabase(data)

    def perform_update(self, serializer):
        instance = serializer.save()

        request = self.request
        base_url = f"{request.scheme}://{request.get_host()}"

        data = {
            "id": instance.id,
            "name": instance.name,
            "region": instance.region,
            "location_url": instance.location_url,
            "description": instance.description,
            "daily_price": float(instance.daily_price),
            "advance_price": float(instance.advance_price),
            "image1": f"{base_url}{instance.image1.url}" if instance.image1 else None,
            "telegram": instance.telegram,
            "instagram": instance.instagram,
            "phone1": instance.phone1,
        }
        sync_to_supabase(data)
