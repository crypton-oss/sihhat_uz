from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminManagementViewSet

router = DefaultRouter()
router.register(r'admins', AdminManagementViewSet, basename='admin-management')

urlpatterns = [
    path('', include(router.urls)),
]
