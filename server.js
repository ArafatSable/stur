// backend/server.js
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
const port = 5000;

// origin: 'https://boisterous-pasca-6d8906.netlify.app', old
// origin: 'https://dashing-quokka-3b6587.netlify.app/',new
// Configure CORS to allow requests from your Netlify domain
const corsOptions = {
  origin: 'https://boisterous-pasca-6d8906.netlify.app', // Replace with your Netlify domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable sending cookies with requests
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize Groq SDK
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Endpoint to handle AI requests
// Endpoint to handle AI requests
app.post('/homes', async (req, res) => { 
    console.log("Home page");
    res.json("This is home page"); });


app.post('/api/generate', async (req, res) => {
  const { messageContent } = req.body;

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content:`Check Grammer of this Sentence only give the sentence: ${messageContent}`}],
      model: 'gemma-7b-it',
    });

    res.json({ aiResponse: response.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ error: 'Failed to generate AI response' });
  }
});
// backend/server.js

// Endpoint to handle glossary highlighting
app.post('/api/glossary', async (req, res) => {
    const { noteContent } = req.body;
  
    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: `Give the Glossary Terms maximum 20 words: ${noteContent}` }],
        model: 'gemma-7b-it',
      });
  
      res.json({ glossary: response.choices[0]?.message?.content || '' });
    } catch (error) {
      console.error('Error fetching glossary terms:', error);
      res.status(500).json({ error: 'Failed to fetch glossary terms' });
    }
  });

  // backend/server.js

// Endpoint to handle AI insights
app.post('/api/insights', async (req, res) => {
    const { noteContent } = req.body;
  
    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: `Provide insights for the following content only 20 words: ${noteContent}` }],
        model: 'gemma-7b-it',
      });
  
      res.json({ insights: response.choices[0]?.message?.content || '' });
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      res.status(500).json({ error: 'Failed to fetch AI insights' });
    }
  });
  
// Endpoint to handle grammar checking
app.post('/api/grammar', async (req, res) => {
    const { noteContent } = req.body;
  
    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: 'user', content: `Check the grammar of the following text give only sentence no extra words: ${noteContent}` }],
        model: 'gemma-7b-it',
      });
  
      res.json({ corrections: response.choices[0]?.message?.content || '' });
    } catch (error) {
      console.error('Error checking grammar:', error);
      res.status(500).json({ error: 'Failed to check grammar' });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});