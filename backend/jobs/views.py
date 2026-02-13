from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Job
from .serializers import JobSerializer


# =========================
# CREATE JOB
# =========================
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]
    # later → IsAdminUser


# =========================
# LIST JOBS
# =========================
class JobListView(generics.ListAPIView):
    queryset = Job.objects.all().order_by("-created_at")
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# DELETE JOB
# =========================
class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.AllowAny]


# =========================
# CLOSE JOB
# =========================
class JobCloseView(APIView):
    permission_classes = [permissions.AllowAny]

    def patch(self, request, pk):
        job = Job.objects.get(pk=pk)
        job.type = "Closed"
        job.save()
        return Response({"message": "Job closed successfully"})
