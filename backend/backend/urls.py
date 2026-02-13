from django.contrib import admin
from django.urls import path, include
from accounts.views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('admin/', admin.site.urls),

    # ===== AUTH =====
    path('api/register/', RegisterView.as_view()),
    path('api/login/', TokenObtainPairView.as_view()),

    # ===== JOBS =====
    path('api/jobs/', include('jobs.urls')),   # 🔥 add this line
]
