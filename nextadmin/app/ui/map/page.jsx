"use client"
import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Mapa = () => {
    const [mapa, setMapa] = useState(null);
  
    useEffect(() => {
      // Inicializa el mapa cuando se monte el componente
      if (!mapa) {
        setMapa(new google.maps.Map(document.getElementById('mapa'), {
          zoom: 15,
          center: { lat: 40.7128, lng: -74.0060 }, // Coordenadas de ejemplo
        }));
      }
    }, [mapa]);
  
    return (
      <LoadScript
        googleMapsApiKey="{AIzaSyAmEylscEWoNMXNKyK3q5s3zTw341YbNWM}"
        libraries={['places']}
      >
        <div id="mapa" style={{ width: '600px', height: '400px' }} />
      </LoadScript>
    );
};
  
export default Mapa;
