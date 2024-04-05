import "../../style/style.css";
import "../components/app-bar.js";
import "../components/form-input.js";
import "../components/note-list.js";
import notesData from "../data/notes-data.js";

// const noteList = document.querySelector("note-list");

document.addEventListener("DOMContentLoaded", () => {
  const newNote = document.querySelector("form-input");
  if (newNote) {
    newNote.addEventListener("addNewNote", (event) => {
      const newNote = event.detail;
      insertNote(newNote);
      event.preventDefault();
    });
  }

  getAllNotes();
});

const BASE_URL = "https://notes-api.dicoding.dev/v2";

const getAllNotes = () => {
  fetch(`${BASE_URL}/notes`)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.error) {
        showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.data);
        renderAllNotes(responseJson.data);
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const insertNote = (note) => {
  fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: note.title,
      body: note.body,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      if (!responseJson.error) {
        getAllNotes();
      }
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const removeNotes = (notesId) => {
  fetch(`${BASE_URL}/notes/${notesId}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      showResponseMessage(responseJson.message);
      getAllNotes();
    })
    .catch((error) => {
      showResponseMessage(error);
    });
};

const renderAllNotes = (notes) => {
  const noteListElement = document.querySelectorAll("note-list");

  noteListElement.forEach((noteListElement) => {
    noteListElement.note = notes;

    const deleteButtons = noteListElement.querySelectorAll(".delete-button");
    console.log(deleteButtons);
    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const notesId = event.target.id;
        removeNotes(notesId);
      });
    });
  });
};

const showResponseMessage = (message = "Check your internet connection") => {
  alert(message);
};
