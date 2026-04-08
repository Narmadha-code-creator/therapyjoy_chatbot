import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db.js";
import chatRoutes from "./chatRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: '*', // Demo - restrict in prod
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('.')); // Serve test-chat.html, README etc.

// Health check root - Vercel essential
app.get("/", (req, res) => {
  res.json({ 
    message: "TherapyJoy AI Chatbot API Live! 🚀", 
    version: "1.0.0",
    testPage: "/test-chat.html",
    endpoints: ["/api/chat POST {\"message\":\"hi\", \"userId\":\"test\"}"],
    status: "healthy"
  });
});

// Explicit test page
app.get('/test-chat.html', (req, res) => {
  res.sendFile('test-chat.html', { root: './' });
});

// API routes
app.use("/api", chatRoutes);

// Catch-all for Vercel (404 fallback)
app.get('*', (req, res) => {
  res.redirect('/test-chat.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 TherapyJoy Server on port ${PORT}`);
  console.log(`📱 Local test: http://localhost:${PORT}/`);
  console.log(`🧪 Chat test: http://localhost:${PORT}/test-chat.html`);
  console.log(`🔗 Vercel: /test-chat.html`);
});
