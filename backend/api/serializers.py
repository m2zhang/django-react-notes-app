from django.contrib.auth.models import User
from rest_framework import serializers
# This module is from Django REST framework (DRF) and provides tools for
# converting complex data types, such as querysets and model instances, into native Python data types
# that can then be easily rendered into JSON
from .models import Note

# Creating a serializer using ORM (Object Relational Mapping)

# Converts JSON to Python objects and vice versa
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        # No one can read what the password is when a user creates an acct

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user # implementing a method to create new version of a user
        
        # **: This syntax is used to unpack a dictionary into keyword arguments.
        
        # For ex, if validated_data is {'username': 'bob', 'password': 'securepassword'},
        # the **validated_data syntax unpacks this dictionary so it effectively calls the
        # create_user method like this: create_user(username='bob', password='securepassword').

class NoteSerializer(serializers.ModelSerializer):
            class Meta:
                model = Note
                fields = ["id", "title", "content", "created_at", "author"]
                extra_kwargs = {"author": {"read_only": True}} # Specifying we can't write//change who the author is of a notes
                # Aka: We can see it but can't set it