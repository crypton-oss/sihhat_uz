from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .serializers import AdminCreateSerializer
from api.supabase_utils import sync_admin_to_supabase, delete_admin_from_supabase
from api.models import User

class AdminManagementViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(role__in=['director', 'small_admin']).order_by('-date_joined')
    serializer_class = AdminCreateSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Supabase sinxronizatsiyasi
            supabase_res = sync_admin_to_supabase(user, user.plain_password)

            if not supabase_res["success"]:
                # Agar Supabase'ga yozishda xato bo'lsa, xabarni qaytaramiz
                return Response({
                    "message": "Admin Djangoda yaratildi, lekin Supabase'ga yuborishda xatolik yuz berdi.",
                    "error": supabase_res["error"]
                }, status=status.HTTP_201_CREATED) # Baribir yaratilgani uchun 201

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_destroy(self, instance):
        delete_admin_from_supabase(instance.username)
        instance.delete()
