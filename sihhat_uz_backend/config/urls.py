from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # API yo'llari
    path('api/', include('api.urls')),
    path('api/small-admin/', include('small_admin.urls')),
    path('api/director-admin/', include('director_admin.urls')),
    path('api/staff-admin/', include('staff_admin.urls')),
]

# Media fayllar (rasmlar) uchun sozlama
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
