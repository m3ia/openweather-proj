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

  useEffect(() => {
    loadData();
  }, []);

    return (
      <div>
        <h1>{props.school}</h1>
        {cities.map((city, index) => {
          return (
            <p key={index}>
              {city.city} {city.city}
            </p>
          )
        })}
      </div>
    )
}
  
export default Cities;

