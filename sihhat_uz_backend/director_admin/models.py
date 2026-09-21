from django.db import models

class SanatoriumProfile(models.Model):
    """
    Sanatoriya direktorlari uchun to'liq profil modeli.
    Ushbu ma'lumotlar mobil ilovada ko'rinadi.
    """
    # Asosiy ma'lumotlar
    name = models.CharField(max_length=255, verbose_name="Sanatoriya nomi")
    region = models.CharField(max_length=255, verbose_name="Hudud / Viloyat")
    location_url = models.URLField(max_length=500, blank=True, null=True, verbose_name="Xaritadagi joylashuv (URL)")
    description = models.TextField(verbose_name="Sanatoriya haqida tavsif")

    # Rasmlar (5 tagacha)
    image1 = models.ImageField(upload_to='sanatoriums/', verbose_name="Rasm 1")
    image2 = models.ImageField(upload_to='sanatoriums/', blank=True, null=True, verbose_name="Rasm 2")
    image3 = models.ImageField(upload_to='sanatoriums/', blank=True, null=True, verbose_name="Rasm 3")
    image4 = models.ImageField(upload_to='sanatoriums/', blank=True, null=True, verbose_name="Rasm 4")
    image5 = models.ImageField(upload_to='sanatoriums/', blank=True, null=True, verbose_name="Rasm 5")

    # Telefonlar (5 tagacha)
    phone1 = models.CharField(max_length=20, verbose_name="Telefon 1")
    phone2 = models.CharField(max_length=20, blank=True, null=True, verbose_name="Telefon 2")
    phone3 = models.CharField(max_length=20, blank=True, null=True, verbose_name="Telefon 3")
    phone4 = models.CharField(max_length=20, blank=True, null=True, verbose_name="Telefon 4")
    phone5 = models.CharField(max_length=20, blank=True, null=True, verbose_name="Telefon 5")

    # Moliyaviy ma'lumotlar
    daily_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="1 kunlik to'lov")
    advance_price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Oldindan to'lov")

    # Ijtimoiy tarmoqlar
    telegram = models.URLField(max_length=255, blank=True, null=True, verbose_name="Telegram")
    instagram = models.URLField(max_length=255, blank=True, null=True, verbose_name="Instagram")
    facebook = models.URLField(max_length=255, blank=True, null=True, verbose_name="Facebook")
    email = models.EmailField(blank=True, null=True, verbose_name="Email")
    website = models.URLField(max_length=255, blank=True, null=True, verbose_name="Veb-sayt")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sanatoriya Profili"
        verbose_name_plural = "Sanatoriya Profillari"

    def __str__(self):
        return self.name
