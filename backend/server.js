import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ---- ROUTES ----

// 1) Contact form from website
app.post("/api/lead", (req, res) => {
  const lead = req.body;
  console.log("New lead:", lead);
  res.json({ ok: true });
});

// 2) AI Receptionist
app.post("/api/receptionist", async (req, res) => {
  const { chat_history, latest_message, business_profile } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an AI receptionist.  
Business profile:
${business_profile}

Your job:
- Answer common questions  
- Collect name, phone, event details  
- Offer pricing ranges, never exact  
- Always ask follow-up questions  
          `,
        },
        { role: "user", content: latest_message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI error" });
  }
});

// 3) AI Event Assistant
app.post("/api/event-assistant", async (req, res) => {
  const { chat_history, latest_message, vendor_profile } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an event planning assistant.  
Vendor profile:
${vendor_profile}

Collect:
- Date
- Budget
- Guest count
- Theme
- Location

Suggest 2–3 relevant packages.
          `,
        },
        { role: "user", content: latest_message },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "AI error" });
  }
});

// ---- SERVER START ----
const PORT = 4000;
app.listen(PORT, () => console.log("✅ Backend running on port " + PORT));
