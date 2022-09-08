import './App.css';
import { useState } from 'react';
import Cities from './components/cities'

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);

  return (
    <div className="App">
      <h1>Cities</h1>
      <h2>{selectedCity ?
        (`Currently selected city: ${selectedCity}`)
        : (`Click on a city`)}
      </h2>
      <p>{weather ?
        (`${weather}`)
        : ('')
      }</p>
      <div className="MenuContainer">
        <Cities setSelectedCity={setSelectedCity} setWeather={setWeather} />
      </div>
    </div>
  );
}

export default App;
