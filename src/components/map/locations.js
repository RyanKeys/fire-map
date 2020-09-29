import React, { Component } from "react";

// import "./data.css";

class Locations extends Component {
  // inits the locations state as an array that we append to later.
  constructor() {
    super();
    this.state = {
      locations: [],
    };
  }

  // On successful mount get data from api and send it to react state
  // Go to the Clients package.json file, and modify the "proxy" object to the url of your API.
  componentDidMount() {
    fetch("/api")
      .then((res) => res.json())
      .then((locations) =>
        this.setState({ locations }, () => console.log("Data: ", locations))
      );
  }
  //Tests that API data is being passed to React
  render() {
    return (
      <div className="parent-element">
        <h2>Found Locations</h2>
        {this.state.locations.map((location) => (
          <div>
            <h1>{location.name}</h1>
            <p>
              X coord: {location.xCoord}, Y coord: {location.yCoord}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default Locations;
