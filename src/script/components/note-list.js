import notesData from "../data/notes-data.js";

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = [];
  // _note = {
  //   id: null,
  //   title: null,
  //   body: null,
  //   createdAt: null,
  // };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
    .notes-list {
        margin-top: 50px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-template-rows: auto;
        display: grid;
        justify-items: center;
        gap: 20px;
        margin: 30px;
      }
      
      .notes-item {
        background-color: #ffcf96;
        box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
        padding: 20px;
        font-size: 15px;
      }
      
      .title-note,
      .body-note,
      .date-note {
        margin-bottom: 10px;
      }

      .button-notes {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        gap: 10px;
      }

      .button-notes button {
        padding: 8px;
      }

      .delete-button, #archive-notes {
        border-radius: 10px;
        cursor: pointer;
        border: none;
        
      }
      `;
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const allNotes = [...notesData, ...this._note];
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="notes-list">
        ${allNotes
          .map(
            (note) => `
            <div class="notes-item">
              <div class="title-note">
                  <h3>${note.title}</h3>
              </div>

              <div class="body-note">
                  <p>${note.body}</p>
              </div>

              <div class="date-note">${new Date(
                note.createdAt
              ).toLocaleDateString()}</div>
              <div class ="button-notes">
                <button type="button" class="delete-button" id="${
                  note.id
                }">Delete</button>
                <button class="archive-button" id="archive-notes">Archive</button>
              </div>
            </div>
         
            `
          )
          .join("")}
        </div>
    `;
  }
}

customElements.define("note-list", NoteList);
