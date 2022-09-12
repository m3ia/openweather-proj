import "./App.css";
import { useCallback, useState} from "react";
import Cities from "./components/cities";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [citiesWeather, _setCitiesWeather] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState({
    main: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    icon: "",
  });
  const setCitiesWeather = useCallback(_setCitiesWeather, [_setCitiesWeather]);

  const getWeather = (cityName) => {
    setSelectedCity(cityName);
    setSelectedWeather({
      main: citiesWeather[cityName].main,
      temp: citiesWeather[cityName].temp,
      humidity: citiesWeather[cityName].humidity,
      windSpeed: citiesWeather[cityName].windSpeed,
      icon: citiesWeather[cityName].icon
    })
  }
  return (
    <div className="App">
      <h1>Cities</h1>
      <h2>
        {selectedCity
          ? `Weather for city: ${selectedCity}`
          : `Click on a city`}
      </h2>
      {selectedCity ? (
        <div>
          <p>Current weather: {selectedWeather.main}<span className="icon"><img src={selectedWeather.icon} alt="weather icon" width="50" height="50" />
          </span></p>
          <p>Current temp: {selectedWeather.temp}F</p>
          <p>Current humidity: {selectedWeather.humidity}</p>
          <p>Current wind speed: {selectedWeather.windSpeed}</p>
          <button onClick={() => setSelectedCity('')}>Back</button>
        </div>
      ) : 
        <div className="MenuContainer">
        <Cities
          citiesWeather={citiesWeather}
          setCitiesWeather={setCitiesWeather}
          cities={cities}
          setCities={setCities}
          getWeather={getWeather}
        />
      </div>
      }
    </div>
  );
}

export default App;
