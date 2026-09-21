from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UnifiedLoginView(APIView):
    """
    Barcha turdagi adminlar uchun yagona Login API.
    Foydalanuvchi roli va tokenlarni qaytaradi.
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
                'role': user.role,  # 'staff', 'director', 'small_admin'
                'username': user.username,
                'full_name': f"{user.first_name} {user.last_name}"
            })

        return Response(
            {'error': 'Username yoki parol noto\'g\'ri'},
            status=status.HTTP_401_UNAUTHORIZED
        )
