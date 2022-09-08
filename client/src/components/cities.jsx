import { useState, useEffect } from 'react';

const Cities = (props) => {
  const [cities, setCities] = useState([]);

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
        <h1>{props.school}</h1>
        {cities.map((city, index) => {
          return (
            <div
              key={index}
              className="weatherMenuItem"
              onClick={()=> console.log('hi', city.lat)}
            >
              {city.city}
            </div>
          )
        })}
      </>
    )
}
  
export default Cities;

