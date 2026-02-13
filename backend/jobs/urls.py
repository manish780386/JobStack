from django.urls import path
from .views import (
    JobListView,
    JobCreateView,
    JobDeleteView,
    JobCloseView
)

urlpatterns = [
    path("", JobListView.as_view(), name="jobs-list"),            # GET
    path("create/", JobCreateView.as_view(), name="jobs-create"), # POST
    path("<int:pk>/delete/", JobDeleteView.as_view(), name="jobs-delete"),  # DELETE
    path("<int:pk>/close/", JobCloseView.as_view(), name="jobs-close"),     # PATCH
]
