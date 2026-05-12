export async function sendMessage(messages) {
  const character =
    localStorage.getItem("character") || "astra";

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      messages,
      character
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error backend:", data);

    throw new Error(
      data.detail ||
      data.error ||
      "Error al conectar con la API"
    );
  }

  return data;
}