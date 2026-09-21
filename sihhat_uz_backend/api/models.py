from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Maxsus foydalanuvchi modeli.
    Bu yerda foydalanuvchi rollari aniqlanadi.
    """
    ROLE_CHOICES = (
        ('staff', 'Staff Admin'),
        ('director', 'Sanatoriya Direktori'),
        ('small_admin', 'Sanatoriya Admini'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='small_admin')

    # Qaysi sanatoriyaga tegishli ekanligini bog'lash mumkin (ixtiyoriy)
    sanatorium_id = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = "Foydalanuvchi"
        verbose_name_plural = "Foydalanuvchilar"
