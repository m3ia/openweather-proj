import './App.css';
import Students from './components/students'

function App() {
  return (
    <div className="App">
      <h1>Hiii</h1>
      <div>
        <Students school={"Hackbright"} />
        <Students school={"Techtonica"} />

      </div>
    </div>
  );
}

export default App;
