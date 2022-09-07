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
app.get('/api/students', (req, res) => {
  const STUDENTS = [
    { firstname: 'Lisa', lastname: 'Lee' },
    { firstname: 'Christina', lastname: 'Rodriguez' },
    { firstname: 'Diana', lastname: 'Olivas' },
    { firstname: 'Andrea', lastname: 'Sanchez' },
    { firstname: 'Paola', lastname: 'Trejo' },
  ]
  res.json(STUDENTS);
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
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
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

