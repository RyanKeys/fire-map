import React from "react";
import "./App.css";
import Locations from "./components/map/locations";
import Map from "./components/map/map";
import Legend from "./components/map/legend";
function App() {
  return (
    <div className="App">
      {/* Calls to Maps API for free cannot exceed 500. Disabled to prevent refreshes during development */}
      <Legend />
      <Map />
    </div>
  );
}

export default App;
