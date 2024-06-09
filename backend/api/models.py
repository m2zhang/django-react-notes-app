from django.db import models
from django.contrib.auth.models import User

# For the notes, using ORM (Django automatically converts the Python version of the model's fields and maps it to a corresponding model)
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    # the author is the User. If the user is deleted, CASCADE means we should also delete all the notes
    # "related_name" is the field name to associate all the notes given a specific User

    def __str__(self):
        return self.title