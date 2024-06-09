from django.urls import path
from . import views 

# (ii/ii)
# we parse the rest and see if it matches anyhere. If it does, then we'll handle it. 
# just for organization sake
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]  