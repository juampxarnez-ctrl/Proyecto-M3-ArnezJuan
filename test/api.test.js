import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMessage } from "../src/api.js";


global.localStorage = {
  getItem: vi.fn(() => "astra"),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

describe("sendMessage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem("character", "astra");
  });

  it("devuelve la respuesta de la API correctamente", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        reply: "Saludos, viajero del presente."
      })
    });

    const messages = [
      {
        role: "user",
        text: "Hola"
      }
    ];

    const result = await sendMessage(messages);

    expect(fetch).toHaveBeenCalledWith("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    messages,
    character: "astra"
  })
});
  });

  it("lanza un error si la API falla", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Error con Gemini"
      })
    });

    await expect(sendMessage([])).rejects.toThrow("Error con Gemini");
  });
});
it("envía el personaje seleccionado desde localStorage", async () => {
  localStorage.getItem = vi.fn(() => "gojo");

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      reply: "Yo, soy Gojo Satoru."
    })
  });

  const messages = [
    {
      role: "user",
      text: "Hola Gojo"
    }
  ];

  await sendMessage(messages);

  expect(fetch).toHaveBeenCalledWith("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages,
      character: "gojo"
    })
  });
});

it("usa astra como personaje por defecto si no hay personaje guardado", async () => {
  localStorage.getItem = vi.fn(() => null);

  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      reply: "Saludos, viajero."
    })
  });

  const messages = [
    {
      role: "user",
      text: "Hola"
    }
  ];

  await sendMessage(messages);

  expect(fetch).toHaveBeenCalledWith("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages,
      character: "astra"
    })
  });
});
