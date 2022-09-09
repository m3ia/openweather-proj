import { useState, useEffect } from 'react';

const Cities = ({setSelectedCity, setWeather, weather, citiesWeather, setCitiesWeather, cities, setCities, getWeather}) => {  
  const clickCity = async (cityName) => {
    const params = new URLSearchParams({ cityName });
    const res = await fetch(`http://localhost:8080/weather?${params}`);
    const resJson = await res.json();
    setWeather(x =>
    ({
      ...x,
      main: resJson.data.weather[0].main,
      temp: resJson.data.main.temp,
      humidity: resJson.data.main.humidity, 
      windSpeed: resJson.data.wind.speed,
      icon: resJson.data.weather[0].icon
    }));
    console.log('resjson', resJson);
    console.log('description', resJson.data.weather[0].description);
    console.log('weather: ', weather)
    setSelectedCity(cityName);
  }

  const loadCities = async () => {
    // Fetch all the items from the backend
    await fetch('http://localhost:8080/api/cities')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setCities(data);
      })
  }

  // const getCitiesWeather = () => {
  //   cities.forEach(async city => {
  //     const res = await fetch(`http://localhost:8080/weather?${city.cityName}`);
  //     const resJson = await res.json();
  //     const weather = {
  //       main: resJson.data.weather[0].main,
  //       temp: resJson.data.main.temp,
  //       humidity: resJson.data.main.humidity, 
  //       windSpeed: resJson.data.wind.speed,
  //       icon: `http://openweathermap.org/img/wn/${resJson.data.weather[0].icon}@2x.png`
  //     }
  //     setCitiesWeather({ ...citiesWeather, [city.cityName]: weather });
  //   }) 
  //   console.log('citiesweather: ', citiesWeather);
  // }

  // Load all cities
  useEffect(() => {
    loadCities();
  }, []);

  useEffect(() => {
    // getCitiesWeather();
    if (cities.length === 0) {
      return;
    }
    console.log('test', cities[0].cityName);

    let weatherByCity = {};
    if (Object.keys(citiesWeather).length > 0) {
      return;
    }
    const loadWeather = async () => {
      for (let city of cities) {
        const res = await fetch(`http://localhost:8080/weather?cityName=${city.cityName}`);
        const resJson = await res.json();
        const weather = {
          main: resJson.data.weather[0].main,
          temp: resJson.data.main.temp,
          humidity: resJson.data.main.humidity, 
          windSpeed: resJson.data.wind.speed,
          icon: `http://openweathermap.org/img/wn/${resJson.data.weather[0].icon}@2x.png`
        }
        weatherByCity[city.cityName] = weather;
      }
      setCitiesWeather({ ...citiesWeather, ...weatherByCity });
    }
    loadWeather();
    console.log('citiesweather: ', citiesWeather);

  }, [cities, citiesWeather]);

    return (
      <>
        {cities.map((city, index) => {
          return (
            <div
              key={index}
              className="weatherMenuItem"
              onClick={()=> getWeather(city.cityName)}
            >
              {city.cityName}
              {citiesWeather.length > 0 ?
                <span className="icon"><img src={citiesWeather[city.cityName].icon} alt="weather icon" height="50" /></span>
                :
                null
              }
            </div>
          )
        })}
      </>
    )
}
  
export default Cities;

