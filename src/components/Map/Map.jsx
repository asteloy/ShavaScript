import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker , useJsApiLoader, InfoWindow } from '@react-google-maps/api'
import styles from './Map.module.css';
import axios from "axios";

const API_KEY = 'AIzaSyAFPweeF39eZjt77G9sLII6n4vlF5cck_g';

async function getData() {
  const data = await axios.get('http://localhost:5000/contact/all').then(res => res.data);
  return data;
}

const containerStyle = {
  width: '50vw',
  height: '50vh',
  display: 'inline-block',
  border: '1px solid #5460A8',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
}

const Map = () => {

  useEffect(() => {
    getData().then(res => {
      setCenter({lat: Number(res[0].lat), lng: Number(res[0].lng)})
      const placesShop = res.map(item => {
        return {...item, lat: Number(item.lat), lng: Number(item.lng)}
      })
      setPlaces(placesShop);
    });
  }, [])
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  const mapRef = React.useRef(undefined)

  const onLoad = React.useCallback(map => {
    mapRef.current = map;
  }, [])

  const onUnmount = React.useCallback(() => {
    mapRef.current = undefined;
  }, [])

  const [center, setCenter] = useState();
  const [places, setPlaces] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (index) => {
    if (index === activeMarker) {
      return;
    }
    setActiveMarker(index);
  };

  const contacts = places.map(({ name, address, phone, workinghours, lat, lng }, index) => {
    return <div key={index} className={styles.one_contact} onClick={() => {
      setCenter({lat, lng})
    }}>
      <div>{name}</div>
      <div>{address}</div>
      <div>{phone}</div>
      <div>{workinghours}</div>
    </div>
  })

  const markers = places.map(({ name, address, phone, workinghours, lat, lng }, index) => {
    
    return <Marker key={index} position={{lat, lng}} label={{ text: name }} onClick={() => handleActiveMarker(index)}>

          {activeMarker === index ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <p>{name}</p>
                <p>{address}</p>
                <p>{phone}</p>
                <p>{workinghours}</p>
              </div>
            </InfoWindow>
          ) : null}  
    </Marker>
  })

  return isLoaded ? <table style={{margin: '10px auto'}}>
    <tbody>
      <tr>
        <td>
          <div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={defaultOptions}
            >
              {markers}
            </GoogleMap>
          </div>
        </td>
        <td className={styles.contacts_td}>
          <div className={styles.contacts}>
            {contacts}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  : <h2>Loading..</h2>
}

export { Map };