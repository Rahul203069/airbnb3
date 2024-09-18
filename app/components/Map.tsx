//@ts-nocheck
"use client"
import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline,Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import polyline from 'polyline';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
// Custom marker icon with corrected path



const Map = ({ geo, encodedPolyline }) => {
  console.log(geo);
  console.log(encodedPolyline);

  if (encodedPolyline) {
    const decodedPoints = polyline.decode(encodedPolyline).map(coord => [coord[0], coord[1]]);

    return (
      <div className="p-3">
        <MapContainer scrollWheelZoom={false} center={geo || [34.12397, 74.83936]} zoom={13} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={geo || [34.12397, 74.83936]} >

          <Popup>
            <span>
              A pretty CSS3 popup. <br/> Easily customizable.
            </span>
        </Popup>

          </Marker>
          {encodedPolyline && decodedPoints && <Polyline pathOptions={{ color: 'blue' }} positions={decodedPoints} />}
        </MapContainer>
      </div>
    );
  } else {
    return (
      <div className="p-3">
        <MapContainer center={geo} zoom={13} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={geo}  />
        </MapContainer>
      </div>
    );
  }
};

export default Map;