import React from "react";
import "./App.css";
import Map from "./components/map/map";
function App() {
  return (
    <div className="App">
      {/* Calls to Maps API for free cannot exceed 500. Disabled to prevent refreshes during development */}
      <Map />
    </div>
  );
}

export default App;
