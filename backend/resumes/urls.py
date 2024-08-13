# resumes/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from . import views

router = DefaultRouter()
router.register(r'resumes', views.ResumeViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 
