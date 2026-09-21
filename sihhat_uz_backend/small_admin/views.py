from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import SanatoriumBanner
from .serializers import SanatoriumBannerSerializer

class SanatoriumBannerViewSet(viewsets.ModelViewSet):
    """
    Sanatoriya banerlarini boshqarish uchun ViewSet.
    Faqat login qilgan adminlar foydalana oladi.
    """
    queryset = SanatoriumBanner.objects.all().order_by('-created_at')
    serializer_class = SanatoriumBannerSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoginView(APIView):
    """
    Small Admin uchun Login API.
    Faqat username va password yuboriladi.
    Muvaffaqiyatli bo'lsa, 'access' va 'refresh' token qaytaradi.
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'username': user.username
            })

        return Response(
            {'error': 'Username yoki parol noto\'g\'ri'},
            status=status.HTTP_401_UNAUTHORIZED
        )

class LogoutView(APIView):
    """
    Small Admin uchun Logout API.
    Foydalanuvchi Refresh tokenni yuborsa, u blacklistga tushadi.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Muvaffaqiyatli chiqildi"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({"error": "Xatolik yuz berdi"}, status=status.HTTP_400_BAD_REQUEST)
