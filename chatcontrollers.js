import { getAIResponse } from "./aiServices.js";
import { checkEmergency } from "./emergencyCheck.js";
import Chat from "./chat.js";

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ reply: "Message is required." });
    }

    // Emergency Check
    const emergencyReply = checkEmergency(message);
    if (emergencyReply) {
      try {
        await Chat.create({
          userMessage: message,
          botReply: emergencyReply
        });
      } catch (e) {
        console.log("DB save skipped");
      }

      return res.json({ reply: emergencyReply });
    }

    // AI Response
    const aiReply = await getAIResponse(message);

    // Save to database
    try {
      await Chat.create({
        userMessage: message,
        botReply: aiReply
      });
    } catch (e) {
      console.log("DB save skipped");
    }

    return res.json({ reply: aiReply });

  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({
      reply: "Internal server error."
    });
  }
};
