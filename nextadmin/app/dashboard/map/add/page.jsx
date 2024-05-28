"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./map.module.css";
import localforage from "localforage";
import {
  LoadScript,
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { getLicensePlatesAvailable } from "@/app/lib/trucks";
import { createRoute } from "@/app/lib/route";

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
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState('');
  const [trucks, setTrucks] = useState([]);
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    const loadCache = async () => {
      try {
        const cachedOrigin = await localforage.getItem('origin');
        const cachedDestination = await localforage.getItem('destination');
        const cachedDistance = await localforage.getItem('distance');
        const cachedDuration = await localforage.getItem('duration');
        const cachedTruck = await localforage.getItem('selectedTruck');

        if (cachedOrigin) setOrigin(new google.maps.LatLng(cachedOrigin.lat, cachedOrigin.lng));
        if (cachedDestination) setDestination(new google.maps.LatLng(cachedDestination.lat, cachedDestination.lng));
        if (cachedDistance) setDistance(cachedDistance);
        if (cachedDuration) setDuration(cachedDuration);
        if (cachedTruck) setSelectedTruck(cachedTruck);
      } catch (error) {
        console.error("Error loading cache:", error);
      }
    };

    const fetchTrucks = async () => {
      try {
        const response = await getLicensePlatesAvailable();
        setTrucks(response);
      } catch (error) {
        console.error("Error fetching license plates:", error);
      }
    };

    loadCache();
    fetchTrucks();
  }, []);

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleDirectionsChanged = (response) => {
    if (response !== null && response.status === "OK") {
      setDirections(response);
      const route = response.routes[0].legs[0];
      const calculatedDistance = route.distance.value / 1000; // distancia en kilómetros
      const calculatedDuration = route.duration.value / 60; // tiempo en minutos
      setDistance(calculatedDistance);
      setDuration(calculatedDuration);

      // Save to cache
      localforage.setItem('distance', calculatedDistance).catch(err => console.error("Error saving distance to cache:", err));
      localforage.setItem('duration', calculatedDuration).catch(err => console.error("Error saving duration to cache:", err));
    }
  };

  const handleOriginChanged = () => {
    if (originRef.current !== null) {
      const place = originRef.current.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const originData = { lat: location.lat(), lng: location.lng() };
        setOrigin(location);

        // Save to cache
        localforage.setItem('origin', originData).catch(err => console.error("Error saving origin to cache:", err));
      }
    }
  };

  const handleDestinationChanged = () => {
    if (destinationRef.current !== null) {
      const place = destinationRef.current.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        const destinationData = { lat: location.lat(), lng: location.lng() };
        setDestination(location);

        // Save to cache
        localforage.setItem('destination', destinationData).catch(err => console.error("Error saving destination to cache:", err));
      }
    }
  };

  const handleTruckChange = (event) => {
    const selectedTruckI = event.target.value;
    setSelectedTruck(selectedTruckI);

    // Save to cache
    localforage.setItem('selectedTruck', selectedTruckI).catch(err => console.error("Error saving selected truck to cache:", err));
  };

  const handleSearch = async () => {
    if (origin && destination && distance && duration && selectedTruck) {
      const routeData = {
        origin: {
          lat: origin.lat(),
          lng: origin.lng(),
        },
        destination: {
          lat: destination.lat(),
          lng: destination.lng(),
        },
        distance: distance, // distancia en kilómetros
        duration: duration, // duración en minutos
        truckLicense: selectedTruck, // licencia del camión seleccionado
      };

      try {
        await createRoute(routeData);
      } catch (error) {
        console.error("Error saving route:", error);
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
          <select value={selectedTruck} onChange={handleTruckChange} className={styles.select} required>
            <option value="">Choose a license plate</option>
            {trucks.map((license, index) => (
              <option key={index} value={license}>{license}</option>
            ))}
          </select>
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
        <div>
          <button onClick={handleSearch} className={styles.button}>
            Search
          </button>
        </div>
      </LoadScript>
    </div>
  );
};

export default Mapa;