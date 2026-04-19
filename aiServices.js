import OpenAI from 'openai';
import 'dotenv/config'; // Loads .env
import Chat from './chat.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAIResponse(message, history = []) {
  console.log("🤖 OpenAI TherapyJoy -", message.slice(0, 50) + "...");

  try {
    // Build context from history (last 5 exchanges)
    let context = '';
    if (history.length > 0) {
      context = '\\nPrevious conversation:\\n';
      const recent = history.slice(0, 5).reverse(); // Recent first
      recent.forEach((chat) => {
        context += `User: ${chat.userMessage}\\nBot: ${chat.botReply}\\n`;
      });
    }

    const prompt = `You are TherapyJoy, a professional healthcare support assistant.

You provide:
- Emotional support  
- General medicine information
- Symptom awareness guidance

STRICT RULES:
- Do NOT diagnose diseases.
- Do NOT prescribe medication dosages.
- Encourage consulting licensed doctors.
- Advise emergency help if severe symptoms.
- Be calm and empathetic.
- Keep responses concise (under 200 words), helpful, and supportive.
- Clean, positive language.

${context}

Current Human: ${message}

Bot:`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast, cheap/free tier eligible
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.6,
    });

    let reply = completion.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';

    // Clean response: Ensure no code blocks, trim
    reply = reply.replace(/```[\s\S]*?```/g, '').trim();

    return reply;

  } catch (error) {
    console.error("🚨 OpenAI Error:", error.message);
    return "I'm having trouble connecting right now. Please try again or consult a healthcare professional.";
  }
}

