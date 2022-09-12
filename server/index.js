import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

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


const CITIES = [
  { cityName: 'Oakland, CA', lat: '37.80', lon: '-122.2712' },
  { cityName: 'Vancouver, BC', lat: '49.24', lon: '-123.11' },
  { cityName: 'Juneau, AK', lat: '58.30', lon: '-134.43' },
  { cityName: 'Quezon City, PI', lat: '14.676208', lon: '121.043861' },
  { cityName: 'Paris, FR', lat: '48.86', lon: '2.34' },
  { cityName: 'Brooklyn, NY', lat: '40.67', lon: '-73.94' },
  { cityName: 'Dubai, UAE', lat: '25.20', lon: '55.27' },
  { cityName: 'Damascus, SY', lat: '33.51', lon: '36.27' },

]
// Hard code the cities response
app.get('/api/cities', (req, res) => {
  res.json(CITIES);
})

// API key
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Fetch weather for 1 selected city
app.get(`/api/selectedWeather`, (req, res) => {
  const city = req.query.cityName;
  console.log('city', city);
  const selectedCity = CITIES.filter(c => c.cityName === city)[0];
  const lat = selectedCity.lat;
  const lon = selectedCity.lon;

  console.log('lat', lat);
  // const city = CITIES[0].city;
  const apiKey = API_KEY;
  const params = new URLSearchParams({
    lat: lat,
    lon: lon,
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

// Fetch weather for searched city
app.get(`/api/searchedWeather`, (req, res) => {
  console.log('lat', lat);
  const params = new URLSearchParams({
    lat: req.query.lat,
    lon: req.query.lon,
    appid: API_KEY,
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

// Fetch weather for all cities
app.get(`/api/allWeather`, async (req, res) => {
  let weatherByCity = {};
  
  let weatherResponses = await Promise.all(CITIES.map(city => {
    const params = new URLSearchParams({
      lat: city.lat,
      lon: city.lon,
      appid: API_KEY,
      units: 'imperial',
    });
    const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;
    return fetch(url);
  }))
    .catch((err) => {
      console.log(err);
    });


  for (let i = 0; i < CITIES.length; i++) {
    const res = weatherResponses[i];
    const cityName = CITIES[i].cityName;

    const resJson = await res.json();
    const weatherData = {
      main: resJson.weather[0].main,
      temp: resJson.main.temp,
      humidity: resJson.main.humidity,
      windSpeed: resJson.wind.speed,
      icon: `http://openweathermap.org/img/wn/${resJson.weather[0].icon}@2x.png`
    }
    weatherByCity = { ...weatherByCity, [cityName]: weatherData };
  }

  console.log('weatherByCity', weatherByCity);
  res.send({ weatherByCity });
});