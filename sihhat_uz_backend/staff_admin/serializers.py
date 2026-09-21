from rest_framework import serializers
from api.models import User

class AdminCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name', 'role', 'sanatorium_id']

    def validate_username(self, value):
        """
        Email (username) takrorlanmasligini tekshirish.
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Ushbu email manzili allaqachon ro'yxatdan o'tgan!")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=validated_data.get('role', 'small_admin'),
            sanatorium_id=validated_data.get('sanatorium_id')
        )
        user.plain_password = validated_data['password']
        return user
