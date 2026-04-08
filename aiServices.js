import OpenAI from "openai";

export async function getAIResponse(message) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are TherapyJoy, a professional healthcare support assistant.

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
`
        },
        { role: "user", content: message }
      ],
      temperature: 0.6,
      max_tokens: 300
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("AI Error:", error);
    return "I’m unable to respond right now. Please try again later.";
  }
}