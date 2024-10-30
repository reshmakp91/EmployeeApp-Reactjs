from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Create your views here.

class EmployeeCreate(generics.ListCreateAPIView):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]

class EmployeeDetail(generics.RetrieveAPIView):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeUpdate(generics.UpdateAPIView):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDelete(generics.DestroyAPIView):

    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class UsersCreate(generics.ListCreateAPIView):

    queryset = Users.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        return Response({
            'id': user.id,
            'admin_name': user.admin_name,
            'email': user.email,
            'username': user.username,
        })

