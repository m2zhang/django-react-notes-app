from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
# inhereting from django's generic views
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer # tells this view what kind of data we need to accept to make a new user 
    permission_classes = [AllowAny] # anyone can make an acct

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_class = [IsAuthenticated] # Cannot call this route unless you're authnticated (and have a valid JWT Token)
    
    # 2 functions associated with this dataset: you can load notes, or create notes, 
    def get_queryset(self):
        user = self.request.user # need the request.user to specify/get the (correct) user
        return Note.objects.filter(author=user) # So we only load the notes for the specific user authenticated
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    # Lists all the notes you could delete
    def get_queryset(self):
        user = self.request.user # need the request.user to specify/get the (correct) user
        return Note.objects.filter(author=user) # So we only load the notes for the specific user authenticated
    