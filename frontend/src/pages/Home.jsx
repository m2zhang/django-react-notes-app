import { useState, useEffect } from "react";
import api from "../api";

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
      .delete(`/api/notes/delete/${id}`)
      .then((res) => {
        if (res.status == 204) alert("Note deleted!");
        else alert("Failed to delete note.");
      })
      .catch((error) => alert(error));
    getNotes(); // to update the notes now. Technically you could/should use JS on the frontend, but too much hassle
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status == 201) alert("Note created!");
        else alert("Failed to make note.");
      })
      .catch((err) => alert(err));
    getNotes();
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
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
