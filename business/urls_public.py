from django.conf.urls import url
from business.views import HomeView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^$', HomeView.as_view()),
    url(r'^login/$', HomeView.as_view()),
    url(r'^signup/$', HomeView.as_view()),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)