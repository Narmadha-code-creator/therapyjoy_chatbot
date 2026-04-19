import { getAIResponse } from "./aiServices.js";
import { checkEmergency } from "./emergencyCheck.js";
import Chat from "./chat.js";

export const chatHandler = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.body.userId || 'anonymous'; // Client can send userId

    if (!message || message.trim() === "") {
      return res.status(400).json({ reply: "Message is required." });
    }

    // Emergency Check first
    const emergencyReply = checkEmergency(message);
    if (emergencyReply) {
      try {
        await Chat.create({
          userId,
          userMessage: message,
          botReply: emergencyReply
        });
      } catch (e) {
        console.log("DB save skipped");
      }
      return res.json({ reply: emergencyReply });
    }

    // Fetch recent history for context (last 10 for this user/global)
    let history = [];
    try {
      history = await Chat.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
    } catch (e) {
      console.log("History fetch skipped");
    }

    // AI Response with history
    const aiReply = await getAIResponse(message, history);

    // Save to DB
    try {
      await Chat.create({
        userId,
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
      reply: "Internal server error. Please try again."
    });
  }
};

