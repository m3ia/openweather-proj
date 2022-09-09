import "./App.css";
import {useState} from "react";
import Cities from "./components/cities";

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [citySelected, setCitySelected] = useState(false);
  const [citiesWeather, setCitiesWeather] = useState({});
  const [cities, setCities] = useState([]);
  const [weather, setWeather] = useState({});
  const [selectedWeather, setSelectedWeather] = useState({
    main: "",
    temp: "",
    humidity: "",
    windSpeed: "",
    icon: "",
  });

  const getWeather = (cityName) => {
    setSelectedCity(cityName);
    setCitySelected(true);
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
          ? `Currently selected city: ${selectedCity}`
          : `Click on a city`}
      </h2>
      {selectedCity && (
        <div>
          <p>Current weather: {selectedWeather.main}</p>
          <p>Current temp: {selectedWeather.temp}F</p>
          <p>Current humidity: {selectedWeather.humidity}</p>
          <p>Current wind speed: {selectedWeather.windSpeed}</p>
        </div>
      )}
      <div className="MenuContainer">
        <Cities
          setSelectedCity={setSelectedCity}
          weather={weather}
          citiesWeather={citiesWeather}
          setCitiesWeather={setCitiesWeather}
          cities={cities}
          setCities={setCities}
          setWeather={setWeather}
          getWeather={getWeather}
        />
      </div>
    </div>
  );
}

export default App;
