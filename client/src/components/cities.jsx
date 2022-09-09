import { useState, useEffect } from 'react';

const Cities = ({setSelectedCity, setWeather, weather}) => {
  const [cities, setCities] = useState([]);
  
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

  const loadData = () => {
    // Fetch all the items from the backend
    fetch('http://localhost:8080/api/cities')
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setCities(data);
      })
  }

  // Load all cities
  useEffect(() => {
    loadData();
  }, []);

    return (
      <>
        {cities.map((city, index) => {
          return (
            <div
              key={index}
              className="weatherMenuItem"
              onClick={()=> clickCity(city.cityName)}
            >
              {city.cityName} <i className="fas">&#xf0c2;</i>
            </div>
          )
        })}
      </>
    )
}
  
export default Cities;

