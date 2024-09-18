//@ts-nocheck

"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline,Popup,Tooltip } from 'react-leaflet';
import L from 'leaflet';
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import polyline from 'polyline';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

// Custom marker icon with corrected path


const Maps = ({listings}) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const router=useRouter();
    return (
      <div className="p-3">
        <MapContainer style={{height:'70vh'}} center={[34.1245952,74.8388352]} zoom={5} className="rounded-lg">
          <TileLayer
            attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {listings.map((item)=>{


return(

          <Marker   key={item.id} eventHandlers={{ click:()=>{router.push(`/listings/${item.id}`)}    }} position={[parseFloat(item.location.coordinates[1]),parseFloat(item.location.coordinates[0])]}>

{true && (
            
                
                <Tooltip permanent={true}>

                <div className='text-lg font-semibold'>

                ${item.price}

              </div>

                </Tooltip>
           
            )}

          </Marker>


);
          })}
        </MapContainer>
      </div>
    );
  
};

export default Maps;