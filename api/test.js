export default function handler(request, response) {
  response.status(200).json({
    hasKey: Boolean(process.env.GEMINI_API_KEY)
  });
}