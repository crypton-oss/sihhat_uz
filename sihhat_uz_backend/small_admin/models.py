from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class SanatoriumBanner(models.Model):
    """
    Sanatoriya adminlari uchun reklama baneri modeli.
    Ushbu model orqali adminlar o'z sanatoriyalarini ilovaga qo'shadilar.
    """
    name = models.CharField(max_length=255, verbose_name="Sanatoriya nomi")
    description = models.TextField(verbose_name="Sanatoriya haqida tavsif")

    # Aloqa ma'lumotlari
    phone_number = models.CharField(max_length=20, verbose_name="Admin telefon raqami")
    telegram_link = models.URLField(max_length=255, blank=True, null=True, verbose_name="Telegram lichkasi")
    instagram_link = models.URLField(max_length=255, blank=True, null=True, verbose_name="Instagram profili")

    # Moliyaviy ma'lumotlar
    price_per_day = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name="Odam boshiga 1 kunlik to'lov (so'mda)"
    )

    # Rasmlar (5 tagacha rasm uchun alohida maydonlar)
    # Eslatma: Real loyihada buni alohida model qilish yaxshiroq, lekin hozircha soddalik uchun bitta modelda.
    image1 = models.ImageField(upload_to='sanatoriums/%Y/%m/', verbose_name="Asosiy rasm")
    image2 = models.ImageField(upload_to='sanatoriums/%Y/%m/', blank=True, null=True, verbose_name="2-rasm")
    image3 = models.ImageField(upload_to='sanatoriums/%Y/%m/', blank=True, null=True, verbose_name="3-rasm")
    image4 = models.ImageField(upload_to='sanatoriums/%Y/%m/', blank=True, null=True, verbose_name="4-rasm")
    image5 = models.ImageField(upload_to='sanatoriums/%Y/%m/', blank=True, null=True, verbose_name="5-rasm")

    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Yaratilgan vaqti")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Tahrirlangan vaqti")

    class Meta:
        verbose_name = "Sanatoriya baneri"
        verbose_name_plural = "Sanatoriya banerlari"

    def __str__(self):
        return self.name
