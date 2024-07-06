const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration
const corsOptions = {
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
};

app.use(cors(corsOptions));

// Serve HTML form for user input
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/get-nba-stats', async (req, res) => {
  const { playerName } = req.body;
  
  try {
    const response = await axios.get(`https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${playerName}`, {
      headers: {
        'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
        'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
        'useQueryString': true
      }
    });

    const playerStats = response.data.api.statistics;
    res.json(playerStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
