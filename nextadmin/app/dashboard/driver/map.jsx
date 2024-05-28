"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./map.module.css";
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker
} from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "50vw",
  height: "30vw",
};

const manizalesCoordinates = { lat: 5.0689, lng: -75.5174 }; // Coordenadas de Manizales

const Mapa = ({ routes }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState([]);
  
  useEffect(() => {
    const fetchDirections = async () => {
      const directionsPromises = routes.map(route => 
        new Promise((resolve, reject) => {
          const service = new google.maps.DirectionsService();
          service.route(
            {
              origin: { lat: parseFloat(route.from.lat), lng: parseFloat(route.from.lng) },
              destination: { lat: parseFloat(route.to.lat), lng: parseFloat(route.to.lng) },
              travelMode: "DRIVING"
            },
            (result, status) => {
              if (status === "OK") {
                resolve(result);
              } else {
                reject(`Error fetching directions: ${status}`);
              }
            }
          );
        })
      );

      try {
        const results = await Promise.all(directionsPromises);
        setDirections(results);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    if (routes.length > 0) {
      fetchDirections();
    }
  }, [routes]);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  return (
    <div className={styles.container}>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={manizalesCoordinates}
          onLoad={handleMapLoad}
          className={styles.map}
        >
          {directions.map((direction, index) => (
            <DirectionsRenderer key={index} directions={direction} />
          ))}
          {routes.map((route, index) => (
            <Marker 
              key={index}
              position={{ lat: parseFloat(route.from.lat), lng: parseFloat(route.from.lng) }}
              label={`From: ${route.from}`}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Mapa;
