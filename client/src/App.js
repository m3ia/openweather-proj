import "./App.css";
import {useState} from "react";
import Cities from "./components/cities";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState({
    main: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    icon: "",
  });
  const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="App">
      <h1>Cities</h1>
      <h2>
        {selectedCity
          ? `Currently selected city: ${selectedCity}`
          : `Click on a city`}
      </h2>
      {weather.main && (
        <div>
          <p>Current weather: {weather.main}</p>
          <p>Current temp: {weather.temp}F</p>
          <p>Current humidity: {weather.humidity}</p>
          <p>Current wind speed: {weather.windSpeed}</p>
          <p>Current icon: <img src={iconUrl} alt="weather icon" /> </p>
        </div>
      )}
      <div className="MenuContainer">
        <Cities
          setSelectedCity={setSelectedCity}
          setWeather={setWeather}
          weather={weather}
        />
      </div>
    </div>
  );
}

export default App;
