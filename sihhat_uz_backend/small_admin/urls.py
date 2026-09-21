from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SanatoriumBannerViewSet, LoginView, LogoutView

# Router yordamida CRUD URL yo'llarini yaratamiz
router = DefaultRouter()
router.register(r'banners', SanatoriumBannerViewSet, basename='sanatorium-banner')

urlpatterns = [
    # Auth yollari
    path('login/', LoginView.as_view(), name='small-admin-login'),
    path('logout/', LogoutView.as_view(), name='small-admin-logout'),

    # Boshqa yollar
    path('', include(router.urls)),
]
