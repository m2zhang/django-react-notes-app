from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
# inhereting from django's generic views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User # tells this view what kind of data we need to accept to make a new user 
    permission_classes = [AllowAny] # anyone can make an acct
