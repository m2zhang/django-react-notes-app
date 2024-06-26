import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // we getNotes fcn as soon as the page is loaded
  useEffect(() => {
    getNotes();
  }, []);
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
    // based on urls.py in api (in backend)
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`) //omg the slash at the end is necessary
      .then((res) => {
        if (res.status == 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes(); // to update the notes now. Technically you could/should use JS on the frontend, but too much hassle
      })
      .catch((error) => alert(error));
    // to update the notes now. Technically you could/should use JS on the frontend, but too much hassle
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status == 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div>
      <div>
        <div className="home-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
