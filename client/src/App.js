import './App.css';
import { useState } from 'react';
import Cities from './components/cities'

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [result, setResult] = useState(null);

  return (
    <div className="App">
      <h1>Cities</h1>
      <h2>{selectedCity ?
        (`Currently selected city: ${selectedCity}`)
        : (`Click on a city`)}
      </h2>
      <p>{result ?
        (`${result}`)
        : ('')
      }</p>
      <div className="MenuContainer">
        <Cities setSelectedCity={setSelectedCity} setResult={setResult} />
      </div>
    </div>
  );
}

export default App;
