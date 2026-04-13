export async function getAIResponse(message) {
  console.log("🤖 Ollama TherapyJoy -", message.slice(0,50) + "...");

  try {
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

Human: ${message}`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: "llama3.2",  // ollama pull llama3.2 first
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.6,
          num_predict: 300
        }
      })
    });

    const data = await response.json();
    return data.response?.trim() || "No response received";

  } catch (error) {
    console.error("🚨 Ollama Error:", error.message);
    return "❌ Ollama not ready? Run:\n1. https://ollama.com/download\n2. ollama serve\n3. ollama pull llama3.2\n4. Retry chat!";
  }
}

