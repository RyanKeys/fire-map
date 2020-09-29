import React from "react";
class Legend extends React.Component {
  render() {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          color: "whitesmoke",
          textShadow: "4px 4px black",
        }}
      >
        <h1>Active Fire Data</h1>
      </div>
    );
  }
}
export default Legend;
