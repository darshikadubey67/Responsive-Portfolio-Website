const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your real OpenAI API key

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log("Received from frontend:", userMessage); // For debugging
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ reply: "Sorry, I'm having trouble connecting to AI." });
  }
});

app.listen(3001, () => console.log('AI backend running on http://localhost:3001'));