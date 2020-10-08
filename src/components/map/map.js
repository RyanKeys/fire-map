import React from "react";
import "../../App.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import key from "../../secret.json";
import mapStyles from "../../mapStyles";
import fireData from "../../app.json";
//desired API libraries and options
const libraries = ["places"];
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

//Map Component
export default function Map() {
  //Loads Map w/API key and desired libraries
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  //const to store Map coorinates in React.useRef()
  const mapRef = React.useRef();
  //fn applies any user input data into mapRef
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //fn Moves Map to user input location
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const openLegend = (fire) => {
    const legend = document.getElementById("search");
    legend.style.height = "100vh";

    populateSearch(fire);
  };

  const populateSearch = (fire) => {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML += fireResultsHtml(fire);
    searchResults.style.display = "block";
    searchResults.style.visibility = "visible";
    return {
      searchResults,
    };
  };
  const fireResultsHtml = (fire) => {
    return `<div id=fireResults><h1 id=fireTitle>${fire.id}</h1>
    <p>${fire.latitude}</p><p>${fire.longitude}</p></div>`;
  };
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Fire Data.";

  //Makes map fullscreen
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };
  //random center location. TODO: Should request Google Geocode API
  const defaultCenter = {
    lat: 37.468319,
    lng: -122.143936,
  };

  //Creates Map HTML
  return (
    <div>
      {/* Inits the search Component and passes it the panTo fn */}
      <Search panTo={panTo} />
      {/* Google Map Component */}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Takes every JSON object in fireData and maps them to a Marker on the map */}
        {fireData.map((fire) => (
          <Marker
            // TODO change key to lat lng and date.
            key={fire.id}
            position={{
              lat: parseFloat(fire.latitude),
              lng: parseFloat(fire.longitude),
            }}
            onClick={async () => {
              console.log(fire.id);
              const lat = parseFloat(fire.latitude);
              const lng = parseFloat(fire.longitude);
              panTo({ lat, lng });
              openLegend(fire);
            }}
            icon={{
              url: "/fire.png",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

//Search Component
function Search({ panTo }) {
  const searchInactive = {
    position: "absolute",
    zIndex: 4,
    padding: "5em",
    paddingTop: 0,
    paddingBottom: 0,
    // Add onClick event to Show/Hide background Color / height
    background:
      "linear-gradient(to bottom right,RGBA(25,25,25,.9),RGBA(2, 16, 25,.9)",
    height: "15vh",
    transition: "height 1s",
  };

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: { lat: () => 37.468319, lng: () => -122.143936 },
      radius: 200 * 1000,
    },
  });
  return (
    <div id="search" style={searchInactive}>
      <h1 style={{ textShadow: "4px 4px #111", color: "whitesmoke" }}>
        Active Fires
      </h1>
      <Combobox
        onSelect={async (address) => {
          setValue(address, true);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {}
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an Address:"
        />
        <ComboboxPopover style={{ zIndex: 12 }}>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <div>
                <ComboboxOption
                  key={id}
                  style={{ zIndex: 12 }}
                  value={description}
                />
              </div>
            ))}
        </ComboboxPopover>
      </Combobox>
      <div
        id="searchResults"
        style={{ display: "none", visibility: "hidden" }}
      ></div>
    </div>
  );
}
