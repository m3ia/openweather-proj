import './App.css';
import Cities from './components/cities'

function App() {
  return (
    <div className="App">
      <h1>Hiii</h1>
      <div>
        <Cities school={"Hackbright"} />
        <Cities school={"Techtonica"} />

      </div>
    </div>
  );
}

export default App;
