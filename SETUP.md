# RelayDesk AI - Setup Guide

## ✅ Frontend-Backend Connection Fix

### CRITICAL: Update Required in Your Frontend HTML

Your frontend code currently has:
```javascript
// Line ~329 in your HTML
const res = await fetch('https://your-backend.com/api/lead', {
```

**Change it to:**
```javascript
const res = await fetch('http://localhost:4000/api/lead', {
```

## 📁 Project Structure

```
relaydesk/
├── backend/
│   ├── server.js         ✅ Created
│   ├── package.json      ✅ Created  
│   └── .env             ❌ Need to add
└── frontend/
    └── index.html        ❌ Need to add (with URL fix)
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/kumarnukala05-eng/relaydesk.git
cd relaydesk
```

### 2. Setup Backend
```bash
cd backend
npm install

# Create .env file
echo "OPENAI_API_KEY=your_openai_key_here" > .env

# Start server
node server.js
```

You should see: `✅ Backend running on port 4000`

### 3. Add Frontend
```bash
cd ../
mkdir frontend
cd frontend

# Create index.html with your provided HTML code
# REMEMBER: Change the fetch URL from https://your-backend.com/api/lead
#           to http://localhost:4000/api/lead
```

### 4. Test Connection
1. Open `frontend/index.html` in your browser
2. Scroll to the contact form at bottom
3. Fill in the form and click "Send details"
4. Check your backend terminal - you should see: `New lead: { ... }`

## 🔗 Backend API Endpoints

Your backend is ready with 3 endpoints:

### 1. Lead Submission
```javascript
POST http://localhost:4000/api/lead
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "business": "Wedding Hall",
  "message": "Need AI receptionist",
  "timestamp": "2025-11-16T12:00:00.000Z"
}
```

### 2. AI Receptionist (for future use)
```javascript
POST http://localhost:4000/api/receptionist
Content-Type: application/json

Body:
{
  "latest_message": "What are your wedding packages?",
  "business_profile": "Wedding hall in Bangalore"
}
```

### 3. AI Event Assistant (for future use)
```javascript
POST http://localhost:4000/api/event-assistant
Content-Type: application/json

Body:
{
  "latest_message": "I need a birthday party setup",
  "vendor_profile": "Event planning company"
}
```

## ✅ Verification Checklist

- [ ] Backend server running on port 4000
- [ ] OpenAI API key added to `.env`
- [ ] Frontend HTML file created with corrected URL
- [ ] Contact form submits successfully
- [ ] Backend console shows "New lead:" message

## 🔧 Troubleshooting

### CORS Error
If you see CORS errors, the backend already has `cors` enabled. Make sure backend is running.

### Connection Refused
Make sure:
1. Backend is running: `node server.js`  
2. URL is `http://localhost:4000/api/lead` (not https)
3. Port 4000 is not blocked

### AI Endpoints Not Working
1. Check `.env` has valid OpenAI API key
2. Ensure you have API credits
3. Check console for error messages

## 📦 Repository
https://github.com/kumarnukala05-eng/relaydesk

---

**Next Step:** Create `frontend/index.html` with your HTML code and the backend URL fix!
