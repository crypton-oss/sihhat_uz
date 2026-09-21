from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SanatoriumProfileViewSet

router = DefaultRouter()
router.register(r'profile', SanatoriumProfileViewSet, basename='sanatorium-profile')

urlpatterns = [
    path('', include(router.urls)),
]
