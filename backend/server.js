const express = require('express');
const app = express();
const port = 3001;

require('dotenv').config();

const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
}); 

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.use(express.json());

app.post('/chatgpt', async (req, res) => {
  const prompt = req.body.prompt;
    console.log('/chatgpt');
  try {
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{"role": "user", "content": prompt}],
        max_tokens: 512,
        top_p: 1,
        temperature: 0.5,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    console.log(response.choices[0].message.content);
    res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});