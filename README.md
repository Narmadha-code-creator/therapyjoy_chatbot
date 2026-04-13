# TherapyJoy Backend - AI-Powered Healthcare Chat System

## Overview
TherapyJoy is a Node.js/Express backend for an AI-driven healthcare therapy platform. It integrates OpenAI for conversational AI therapy sessions, MongoDB for data persistence, and supports features like emergency checks and chat history.

## Key Features
- **AI Chat Therapy**: Google Gemini-powered conversations for mental health support
- **Emergency Detection**: Monitors chats for crisis keywords and triggers alerts
- **User Session Management**: Stores chat history with MongoDB
- **RESTful APIs**: `/api/chat` for messaging, authentication ready

## Tech Stack
```
Node.js + Express (ES Modules)
MongoDB + Mongoose
Google Gemini AI (gemini-1.5-flash)
CORS enabled
dotenv for env vars
```

## Quick Setup
1. **Clone & Install**:
   ```
   git clone <repo> therapyjoy-backend
   cd therapyjoy-backend
   npm install
   ```

2. **Environment Variables** (`.env`):
   ```
   GEMINI_API_KEY=AIza... (get free from https://aistudio.google.com/app/apikey)
   MONGO_URI=mongodb://localhost:27017/therapyjoy
   PORT=5000
   ```

3. **Run Server**:
   ```
   npm start
   ```
   Server runs on `http://localhost:5000`

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Send message to AI therapist |
| `GET`  | `/api/chat/history/:userId` | Get chat history |

**Example Chat Request**:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H \"Content-Type: application/json\" \
  -d '{\"message\": \"I feel anxious today\", \"userId\": \"user123\"}'
```

## Project Structure
```
therapyjoy-backend/
├── server.js          # Entry point
├── aiServices.js      # Google Gemini AI integration
├── chatcontrollers.js # Chat logic
├── chatRoutes.js      # API routes
├── db.js             # MongoDB connection
├── emergencyCheck.js # Crisis detection
├── .env.example      # Env template
├── package.json
└── TODO.md           # Next steps
```

## Testing
- Frontend test: Open `test-chat.html`
- Postman: Import from `postman_collection.json` (if available)

## Deployment
- **Vercel/Render**: Git push + env vars
- **Heroku**: `heroku create` + `Procfile`

## Security Notes
- API keys in `.env` (gitignored)
- Rate limiting recommended for production
- Add JWT auth for user sessions

## Contributing
1. Fork & PR
2. Follow ES modules syntax
3. Add tests in `/tests/`

**Live Demo**: Visit root URL after Vercel deploy (e.g., https://therapyjoy-chatbot.vercel.app/) for API status. POST to /api/chat.

---

⭐ **Star on GitHub** | 🐛 **Issues** | 📖 **Wiki**
