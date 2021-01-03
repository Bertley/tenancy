from customers.views import TenantView, ManagerAppView
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin

urlpatterns = [
    path("", TenantView.as_view()),
    path("manager/", ManagerAppView.as_view()),
    path("auth/", include('users.urls')), 
    path("api/", include('core.urls')), 
    path('admin/', admin.site.urls),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)