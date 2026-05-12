export function renderAbout() {
  const section = document.createElement("section");

  section.className = "page about-page";

  section.innerHTML = `
    <div class="hero">
      <div class="avatar">🔮</div>

      <h1>Sobre NovaChat</h1>

      <p>
        NovaChat es una Single Page Application creada para ComicSansCon.
        Permite conversar con Astra, una IA mística del año 3042, usando
        Gemini AI de forma segura mediante Vercel Functions.
      </p>

      <div class="feature-grid">
        <article class="feature-card">
          <span>🧭</span>
          <h3>SPA</h3>
          <p>Navegación con History API sin recargar la página.</p>
        </article>

        <article class="feature-card">
          <span>📱</span>
          <h3>Mobile-first</h3>
          <p>Diseño responsive adaptable a celular, tablet y desktop.</p>
        </article>

        <article class="feature-card">
          <span>🔐</span>
          <h3>API segura</h3>
          <p>La API key no se expone en el frontend.</p>
        </article>

        <article class="feature-card">
          <span>🧪</span>
          <h3>Testing</h3>
          <p>Tests unitarios con Vitest y fetch mockeado.</p>
        </article>
      </div>
    </div>
  `;

  return section;
}