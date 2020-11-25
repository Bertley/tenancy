from customers.views import TenantView
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^$', TenantView.as_view()),
    url(r'^login/$', TenantView.as_view()),
    url(r'^manager/$', TenantView.as_view()),
    url(r'^products/$', TenantView.as_view()),
    url(r'^signup/$', TenantView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)