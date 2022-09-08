import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
const PORT = 8080;

dotenv.config();

// Cors middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`Hola this server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.json('Hello from Techtonica');
})

// Hard code the student response
app.get('/api/cities', (req, res) => {
  const CITIES = [
    { city: 'Oakland, CA', lat: '37.80', lon: '122.27' },
    { city: 'Vancouver, BC', lat: '49.24', lon: '-123.11' },
    { city: 'Juneau, AK', lat: '58.30', lon: '-134.43' },
    { city: 'Quezon City, PI', lat: '14.67', lon: '121.04' },
    { city: 'Paris, FR', lat: '48.86', lon: '2.34' },
    { city: 'Brooklyn, CA', lat: '40.67', lon: '73.94' },
    { city: 'Dubai, UAE', lat: '25.20', lon: '55.27' },
    { city: 'Damascus, SY', lat: '33.51', lon: '36.27' },

  ]
  res.json(CITIES);
})

const API_KEY = process.env.OPENWEATHER_API_KEY;
// First fetch request
app.get('/weather', (req, res) => {
  const city = req.query.cityName;
  const apiKey = API_KEY;
  const params = new URLSearchParams({
    q: req.query.cityName,
    appid: apiKey,
    units: 'imperial',
  });
  const url = `https://api.openweathermap.org/data/2.5/weather?${params
    }`;
  
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      console.log(err);
    });
});

