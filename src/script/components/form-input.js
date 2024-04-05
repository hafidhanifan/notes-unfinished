class FormInput extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }
  _updateStyle() {
    this._style.textContent = `
                .form-container {
                    margin-top: 70px;
                }
                
                .form-container h2 {
                    text-align: center;
                    font-size: 2em;
                }
                
                form {
                    margin-top: 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                  
                }

                #warning {
                  display: none;
                  color: red;
                }
                
                input[type="text"],
                form textarea {
                    padding: 10px;
                    font-size: 15px;
                    margin-top: 20px;
                    font-size: 16px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }
                
                form button {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #ffcf96;
                    border: none;
                    border-radius: 20px;
                    width: 300px;
                    cursor: pointer;
                    font-size: 15px;
                    align-self: center;
                  
                }

                @media screen and (max-width: 500px) {
                    input, textarea {
                        width: 60%;
                    }
                }
     `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  connectedCallback() {
    this.render();
    this.warningMessage();
  }

  warningMessage() {
    const inputTitle = this._shadowRoot.getElementById("input-title");

    inputTitle.addEventListener("input", () => {
      const input = inputTitle.value;
      const warning = this._shadowRoot.getElementById("warning");

      if (input.length > 50) {
        warning.style.display = "block";
        inputTitle.value = input.substring(0, 50);
      } else {
        warning.style.display = "none";
      }
    });
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
        <div class="form-container">
            <h2>Add Your Notes</h2>
            <form id="form">
            <div class="form-group">
                <input
                type="text"
                name="input-title"
                id="input-title"
                placeholder="Masukkan judul..."
                size="63"
                required
                />
            </div>

            <div id="warning">Maximum 50 characters</div>
            
            <div class="form-group">
                <textarea
                name="input-notes"
                id="input-notes"
                cols="59"
                rows="10"
                required
                placeholder="Masukkan notes..."
                ></textarea>
            </div>
            <button id="submit-button">Submit</button>
            </form>
        </div>
    `;

    const submitButton = this._shadowRoot.getElementById("form");
    submitButton.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputTitle = this._shadowRoot.getElementById("input-title").value;
      const inputNote = this._shadowRoot.getElementById("input-notes").value;

      // console.log(inputTitle);
      // console.log(inputNote);
      const addNote = {
        id: `notes-${Math.random().toString(36).substring(2, 9)}`,
        title: inputTitle,
        body: inputNote,
        createdAt: new Date().toISOString(),
        archived: false,
      };

      this.dispatchEvent(new CustomEvent("addNewNote", { detail: addNote }));
      this._shadowRoot.querySelector("#input-title").value = "";
      this._shadowRoot.querySelector("#input-notes").value = "";
    });
  }
}

customElements.define("form-input", FormInput);
