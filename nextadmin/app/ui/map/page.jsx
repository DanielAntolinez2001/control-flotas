"use client";
import React, { useState, useRef } from "react";
import { LoadScript, GoogleMap, DirectionsService, DirectionsRenderer, Marker, Autocomplete } from "@react-google-maps/api";

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
    <div>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <div style={{ marginBottom: '10px' }}>
          <Autocomplete
            onLoad={(autocomplete) => {
              originRef.current = autocomplete;
            }}
            onPlaceChanged={handleOriginChanged}
          >
            <input
              type="text"
              placeholder="Enter origin address"
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}
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
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}
            />
          </Autocomplete>
          <button onClick={() => {}}>
            Search
          </button>
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={manizalesCoordinates} // Centro en Manizales
          onLoad={handleMapLoad}
        >
          {origin && destination && (
            <DirectionsService
              options={{
                destination: destination,
                origin: origin,
                travelMode: 'DRIVING'
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
