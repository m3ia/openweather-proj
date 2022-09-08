import { useState, useEffect } from 'react';

const Cities = ({setSelectedCity, setWeather}) => {
  const [cities, setCities] = useState([]);
  
  const clickCity = async (cityName) => {
    const params = new URLSearchParams({ cityName });
    const res = await fetch(`http://localhost:8080/weather?${params}`);
    const resJson = await res.json();
    setWeather(resJson.data.weather[0].description);
    console.log('resjson', resJson);
    console.log('description', resJson.data.weather[0].description);
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
              {city.cityName}
            </div>
          )
        })}
      </>
    )
}
  
export default Cities;

