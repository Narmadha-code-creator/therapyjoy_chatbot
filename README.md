# TherapyJoy - OpenAI Healthcare AI Chatbot (Immediate Cloud Responses!)

## 🚀 QUICK START (2 mins)

1. **API Key** (Free tier GPT-4o-mini):
```
.env → OPENAI_API_KEY=your_key_here
```
Get key: https://platform.openai.com/api-keys

2. **DB** (Optional MongoDB):
```
.env → MONGODB_URI=mongodb://localhost:27017/therapyjoy
```

3. **Run**:
```
npm start
```

4. **Test**:
```
http://localhost:5000/test-chat.html
```

## ✨ Features
- ⚡ **Immediate OpenAI GPT-4o-mini** responses
- 🧠 **DB Chat History Context** (last 10 msgs/userId)
- 🚨 **Emergency Detection** first
- 💾 **MongoDB Logging**
- ✅ **Safe, Empathetic** (no diagnosis)
- 📱 **Modern UI** (index.html)

## API Usage
```
POST /api/chat
{
  "message": "I feel anxious",
  "userId": "user123" // Optional for context
}
```

## Troubleshooting
- API key invalid? Regenerate.
- No DB? Works without.
- Slow? Free tier limits.

**Live Demo:** http://localhost:5000/

## Ollama Fallback (Old)
See README-OLLAMA.md

