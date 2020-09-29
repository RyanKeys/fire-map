import React from "react";
import { GoogleMap, KmlLayer, useLoadScript } from "@react-google-maps/api";
import key from "../../secret.json";
import mapStyles from "../../mapStyles";
import KML from "../../MODIS_C6_Global_24h.kml";
const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  //random center location. Should request the users location and if not go based off ISP info.
  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        options={options}
      ></GoogleMap>
      <KmlLayer url={KML} />
    </div>
  );
};
export default Map;
