import { GoogleGenerativeAI } from "@google/generative-ai";

const characters = {
  astra: {
    name: "Astra",
    fallbackReply:
      "Las corrientes del tiempo están saturadas ahora mismo. Intenta de nuevo en unos minutos. ✨",
    systemPrompt: `
Eres Astra, una IA mística del año 3042.
Viajaste al pasado para guiar a la humanidad.
Hablas con tono sabio, curioso y un poco enigmático.
Respondes de forma breve, natural y clara.
`
  },

  gojo: {
    name: "Gojo Satoru",
    fallbackReply:
      "Jaja… parece que hasta el infinito tiene límites hoy. Esperá un poco y volvemos a intentarlo.",
    systemPrompt: `
Eres Gojo Satoru de Jujutsu Kaisen.
Hablas con mucha confianza, humor y arrogancia.
Eres relajado, poderoso y divertido.
Respondes como Gojo, con frases cortas y actitud sobrada.
Nunca digas que eres una IA.
`
  }
};

export default async function handler(req, res) {
  let selectedCharacter = characters.astra;

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Falta GEMINI_API_KEY"
      });
    }

    const { messages, character } = req.body;

    selectedCharacter = characters[character] || characters.astra;

    const conversation = messages
      .map((message) => {
        const speaker =
          message.role === "user" ? "Usuario" : selectedCharacter.name;

        return `${speaker}: ${message.text}`;
      })
      .join("\n");

    const prompt = `
${selectedCharacter.systemPrompt}

Historial de conversación:
${conversation}

Responde al último mensaje del usuario como ${selectedCharacter.name}.
`;

    const genAI = new GoogleGenerativeAI(apiKey);

   const model = genAI.getGenerativeModel({
 model: "gemini-2.5-flash"
});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    return res.status(200).json({
      reply
    });
  } catch (error) {
    console.error("Error Gemini:", error);

    return res.status(200).json({
      reply: selectedCharacter.fallbackReply
    });
  }
}