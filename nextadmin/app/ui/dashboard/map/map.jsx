"use client";
import React, { useState, useRef } from "react";
import styles from "./map.module.css";

import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "30vw",
};

const manizalesCoordinates = { lat: 5.0689, lng: -75.5174 }; // Coordenadas de Manizales

const Mapa = () => {
  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleDirectionsChanged = (response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
    }
  };

  const handleOriginChanged = () => {
    if (originRef.current !== null) {
      const place = originRef.current.getPlace();
      if (place.geometry) {
        setOrigin(place.geometry.location);
      }
    }
  };

  const handleDestinationChanged = () => {
    if (destinationRef.current !== null) {
      const place = destinationRef.current.getPlace();
      if (place.geometry) {
        setDestination(place.geometry.location);
      }
    }
  };

  return (
    <div className={styles.container}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <div style={{ marginBottom: "10px" }}>
          <Autocomplete
            onLoad={(autocomplete) => {
              originRef.current = autocomplete;
            }}
            onPlaceChanged={handleOriginChanged}
          >
            <input
              type="text"
              placeholder="Enter origin address"
              className={styles.input}
            />
          </Autocomplete>
          <Autocomplete
            onLoad={(autocomplete) => {
              destinationRef.current = autocomplete;
            }}
            onPlaceChanged={handleDestinationChanged}
          >
            <input
              type="text"
              placeholder="Enter destination address"
              className={styles.input}
            />
          </Autocomplete>
          <button onClick={() => {}} className={styles.button}>
            Search
          </button>
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={manizalesCoordinates} // Centro en Manizales
          onLoad={handleMapLoad}
          className={styles.map}
        >
          {origin && destination && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: "DRIVING",
              }}
              callback={handleDirectionsChanged}
            />
          )}
          {directions && <DirectionsRenderer directions={directions} />}
          {origin && <Marker position={origin} />}
          {destination && <Marker position={destination} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;