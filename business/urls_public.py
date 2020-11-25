from django.urls import path, include
from business.views import HomeView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('',  HomeView.as_view()),
    path('login/', HomeView.as_view()),
    path('signup/', HomeView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)