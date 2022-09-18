import { useState, useEffect } from 'react';

const Cities = ({ citiesWeather, setCitiesWeather, cities, setCities, getWeather }) => {  
  const [isLoading, setIsLoading] = useState(true);

  // Load all cities
  useEffect(() => {
    const loadCities = async () => {
      // Fetch all the items from the backend
      await fetch('http://localhost:8080/api/cities')
        .then(res => res.json())
        .then(data => {
          console.log('data', data);
          setCities(data);
        })
    }
    loadCities();
  }, [setCities]);

  useEffect(() => {
    const loadWeather = async () => {
      const res = await fetch(`http://localhost:8080/api/allWeather`);
      const resJson = await res.json();
      setCitiesWeather({...resJson.weatherByCity});
      setIsLoading(false);
    }
    loadWeather();
  }, [setCitiesWeather]);

    return (
      <>
        {
          isLoading ? 
            (<div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>)
            : (
              cities.map((city, index) => {
          return (
            <div
              key={index}
              className="weatherMenuItem"
              onClick={()=> getWeather(city.cityName)}
            >
              <h2>{city.cityName}</h2>
              
              <span className="icon"><img src={citiesWeather?.[city.cityName]?.icon} alt="weather icon" width="50" height="50" /></span>
              <div className="solid-border"></div>
            </div>
          )
        })
            )

        }
      </>
    )
}
  
export default Cities;

