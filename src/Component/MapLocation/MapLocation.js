import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";
import { Button } from 'react-bootstrap'
import { BsFillGeoAltFill } from "react-icons/bs";
import './MapLocation.css';
export default function MapLocation() {
    const [viewPort, setViewPort] = useState({
        width: "400px",
        height: "400px",
        latitude: 42.430472,
        longitude: -123.334102,
        zoom: 16
    });
    const [userLocation, setUserLocationNew] = useState({});

    useEffect(()=>{
       handleUserLocation();
    },[])

    const handleUserLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {

            let setUserLocation = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            };
            let newViewport = {
                height: "400px",
                width: "400px",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: 10
            };
            setViewPort(newViewport);
            setUserLocationNew(setUserLocation);
        });
    };



    return (
        <div>
            <Button className="my-4" variant="danger" onClick={()=>handleUserLocation}>My location</Button>
            <div className="map">
               <ReactMapGL
                {...viewPort}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={viewport => setViewPort({ viewport })}
                mapboxApiAccessToken="pk.eyJ1IjoibWl0dWJhcnVhIiwiYSI6ImNrd240d29qZjJpZ3EzM25veGplcTE1YjMifQ.-PF9iS83xNRFwd1z2b-EGQ"
            >
                {Object.keys(userLocation).length !== 0 ? (
                    <Marker
                        latitude={userLocation.lat}
                        longitude={userLocation.long}
                    >
                        <BsFillGeoAltFill />
                    </Marker>
                ) : (
                    <div>Choose User Location</div>
                )}
            </ReactMapGL> 
            </div>
            
        </div>
    )
}

