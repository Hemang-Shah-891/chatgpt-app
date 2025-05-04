const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Fetch 10 public Meta profiles
app.get("/api/meta-profiles", async (req, res) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v15.0/search`,
      {
        params: {
          q: "public",
          type: "user",
          fields: "id,name,picture",
          access_token: process.env.META_ACCESS_TOKEN,
        },
      }
    );
    const profiles = response.data.data.slice(0, 10);
    res.json(profiles);
  } catch (err) {
    console.error("Error fetching Meta profiles:", err);
    res.status(500).json({ error: "Failed to fetch Meta profiles" });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error("Error with OpenAI API:", err);
    res.status(500).json({ error: "OpenAI API failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
