import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAIResponse(message) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("🚨 MISSING GEMINI_API_KEY in .env");
    throw new Error("Missing GEMINI_API_KEY - add to .env from aistudio.google.com");
  }
  console.log("✅ Gemini key loaded:", apiKey ? apiKey.slice(0,10) + "..." : "NONE");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are TherapyJoy, a professional healthcare support assistant.

You provide:
- Emotional support
- General medicine information
- Symptom awareness guidance

STRICT RULES:
- Do NOT diagnose diseases.
- Do NOT prescribe medication dosages.
- Encourage consulting licensed doctors.
- Advise emergency help if severe symptoms appear.
- Be calm and empathetic.

User message: ${message}`;

    const result = await model.generateContent(prompt, {
      temperature: 0.6,
      maxOutputTokens: 300
    });

    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("AI Error:", error);
    return "I’m unable to respond right now. Please try again later.";
  }
}
