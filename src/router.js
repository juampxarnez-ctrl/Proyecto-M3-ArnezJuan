import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";

const routes = {
  "/": renderHome,
  "/home": renderHome,
  "/chat": renderChat,
  "/about": renderAbout
};

export function renderRoute() {
  const app = document.querySelector("#app");

  const path = window.location.pathname;

  const view = routes[path] || renderHome;

  app.innerHTML = "";
  app.appendChild(view());
}

export function navigate(path) {
  history.pushState({}, "", path);
  renderRoute();
}

export function initRouter() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");

    if (!link) return;

    event.preventDefault();

    navigate(link.getAttribute("href"));
  });

  window.addEventListener("popstate", renderRoute);

  renderRoute();
}