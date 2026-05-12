import { initChat } from "../chat.js";
import { characters } from "../characters.js";

export function renderChat() {
  const selectedCharacterId =
    localStorage.getItem("character") || "astra";

  const selectedCharacter =
    characters[selectedCharacterId] || characters.astra;

  const section = document.createElement("section");

  section.className = "chat-page";

  section.innerHTML = `
    <div class="chat-container">

      <div class="chat-top">
        <div class="chat-avatar">
          ${selectedCharacter.avatar}
        </div>

        <div>
          <h2>${selectedCharacter.name}</h2>

          <p>
            <span></span>
            En línea · ${selectedCharacter.description}
          </p>
        </div>
      </div>

      <div class="chat-box"></div>

      <form class="chat-form">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          autocomplete="off"
        />

        <button type="submit">
          ➤
        </button>
      </form>

      <p class="error-message"></p>

    </div>
  `;

  setTimeout(() => {
    initChat();
  }, 0);

  return section;
}