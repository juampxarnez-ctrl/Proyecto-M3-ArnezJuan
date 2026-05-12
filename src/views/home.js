export function renderHome() {
  const section = document.createElement("section");

  section.className = "home-page";

  section.innerHTML = `
    <div class="hero">
      <div class="avatar">✨</div>

      <h1>Bienvenido a NovaChat</h1>

      <p>
        Selecciona con quién quieres conversar y comienza una experiencia
        interactiva con inteligencia artificial.
      </p>

      <div class="character-selector">
        <button class="character-card" data-character="astra">
          <span class="character-avatar">🔮</span>
          <strong>Astra</strong>
          <small>IA mística del año 3042</small>
        </button>

        <button class="character-card" data-character="gojo">
          <span class="character-avatar">🕶️</span>
          <strong>Gojo Satoru</strong>
          <small>El hechicero más fuerte</small>
        </button>
      </div>

      <a href="/chat" class="start-button" data-link>
        Comenzar conversación →
      </a>
    </div>
  `;

  const buttons = section.querySelectorAll(".character-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      localStorage.setItem("character", button.dataset.character);

      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  const currentCharacter = localStorage.getItem("character") || "astra";
  const activeButton = section.querySelector(
    `[data-character="${currentCharacter}"]`
  );

  if (activeButton) {
    activeButton.classList.add("active");
  }

  return section;
}