from django.urls import path
from .views import current_user, Registration
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('', current_user),
    path('login/', obtain_jwt_token),
    path('register/', Registration.as_view()), 
    path('logout/', obtain_jwt_token)
]