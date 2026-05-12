import { sendMessage } from "./api.js";
import { characters } from "./characters.js";

export function initChat() {
  const selectedCharacterId = localStorage.getItem("character") || "astra";
  const selectedCharacter =
    characters[selectedCharacterId] || characters.astra;

  const messages = [
    {
      role: "assistant",
      text: selectedCharacter.initialMessage
    }
  ];

  const form = document.querySelector(".chat-form");
  const input = document.querySelector(".chat-form input");
  const chatBox = document.querySelector(".chat-box");
  const errorMessage = document.querySelector(".error-message");

  if (!form) return;

  function renderMessages() {
    chatBox.innerHTML = "";

    messages.forEach((message) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("message-row");

      const avatar = document.createElement("div");
      avatar.classList.add("mini-avatar");
      avatar.textContent =
        message.role === "user" ? "🧑" : selectedCharacter.avatar;

      const bubble = document.createElement("div");
      bubble.classList.add("message");

      if (message.role === "user") {
        wrapper.classList.add("user-row");
        bubble.classList.add("user-message");
      } else {
        bubble.classList.add("character-message");
      }

      bubble.textContent = message.text;

      wrapper.appendChild(avatar);
      wrapper.appendChild(bubble);
      chatBox.appendChild(wrapper);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("message-row");
    typing.id = "typing";

    typing.innerHTML = `
      <div class="mini-avatar">${selectedCharacter.avatar}</div>
      <div class="message character-message typing">
        ${selectedCharacter.name} está escribiendo...
      </div>
    `;

    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function removeTyping() {
    const typing = document.querySelector("#typing");
    if (typing) typing.remove();
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userText = input.value.trim();
    if (!userText) return;

    errorMessage.textContent = "";

    messages.push({
      role: "user",
      text: userText
    });

    input.value = "";
    renderMessages();

    try {
      showTyping();

      const data = await sendMessage(messages);

      removeTyping();

      messages.push({
        role: "assistant",
        text: data.reply
      });

      renderMessages();
    } catch (error) {
      removeTyping();
      errorMessage.textContent = "Ocurrió un error al generar la respuesta.";
      console.error("Error del chat:", error);
    }
  });

  renderMessages();
}