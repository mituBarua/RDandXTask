import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapLocation from './Component/MapLocation/MapLocation';
import Weather from './Component/Weather/Weather';
import ExchangeRate from './Component/ExchangeRate/ExchangeRate';

function App() {
  return (
    <div className="App">
      
   
     <MapLocation/>
     <Weather/>
     <ExchangeRate/>
    </div>
  );
}

export default App;
