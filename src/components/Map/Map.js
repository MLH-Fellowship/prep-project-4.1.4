import {useEffect, useState, useRef} from 'react';
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({iconUrl: icon, shadowUrl: iconShadow});

L.Marker.prototype.options.icon = DefaultIcon;

const PlaceMarker = ({
  city,
  setCity,
  cityCoordinates,
  setCityCoordinates,
  map,
  setMap
}) => {

  useMapEvent("click", (e) => {
    console.log(e.latlng);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`).then((res) => res.json()).then((result) => {
      setCityCoordinates({lat: e.latlng.lat, lon: e.latlng.lng});
      setCity(result.name);
    }, (error) => {
      window.alert("Location not found")
    });
  });

  return (<Marker position={[cityCoordinates.lat, cityCoordinates.lon]}>
    <Popup>
      {city}
    </Popup>
  </Marker>);
}

const WMap = ({city, setCity, cityCoordinates, setCityCoordinates}) => {
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState({Lat: "", Long: "", zoom: 9, City: ""});

  useEffect(() => {
    setPosition({Lat: cityCoordinates.lat, Long: cityCoordinates.lon, zoom: 9, City: city})
  }, [cityCoordinates, city]);

  useEffect(() => {
    setMap(map)
  }, [map])

  useEffect(() => {
    const mapCenter = [position.Lat, position.Long];
    if (map) {
      map.setView(mapCenter, position.zoom);
    }
  }, [map, position]);

  return (
    <>
      <div>
        <MapContainer className="map" whenCreated={setMap} center={[position.Lat, position.Long]} zoom={2}>
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <PlaceMarker city={city} setCity={setCity} cityCoordinates={cityCoordinates} setCityCoordinates={setCityCoordinates} map={map} setMap={setMap}/>
        </ MapContainer >
      </div>
    </>); 
}
export default WMap;
