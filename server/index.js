import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 8080;

// Cors middleware
app.use(cors());

app.listen(PORT, () => {
  console.log(`Hola this server is running on port ${PORT}`);
});

// Tells server what directory we're working on
const __dirname = path.resolve();

// Render static files from client folder
app.use(express.static('../client'));

// First fetch request
app.get('/weather', (req, res) => {
  const city = req.query.cityName;
  const apiKey = process.env.API_KEY;
  const params = new URLSearchParams({
    q: req.query.cityName,
    appid: process.env.API_KEY,
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