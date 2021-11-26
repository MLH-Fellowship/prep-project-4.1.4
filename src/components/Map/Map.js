import {useEffect, useState} from 'react';
import L from 'leaflet';
import {MapContainer, TileLayer, Marker, Popup, useMapEvent} from 'react-leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25,41],
  iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const PlaceMarker = ({
  city,
  setCity,
  cityCoordinates,
  setCityCoordinates,
  map,
  setMap
}) => {

  const [position, setPosition] = useState([cityCoordinates.lat,cityCoordinates.lon]);

  useEffect(() => {
    if (cityCoordinates) {
      setPosition([cityCoordinates.lat,cityCoordinates.lon]);
    }
  }, [cityCoordinates]);

  useMapEvent("click", (e) => {
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
  const [map, setMap] = useState();
  const [position, setPosition] = useState({Lat: "", Long: "", City: ""});

  useEffect(() => {
    setPosition({Lat: cityCoordinates.lat, Long: cityCoordinates.lon, City: city})
  }, [cityCoordinates, city]);

  useEffect(() => {
    setMap(map)
  }, [map])

  useEffect(() => {
    const mapCenter = [position.Lat, position.Long];
    if (map) {
      if (map.getZoom() < 4) {
        map.setView(mapCenter, 7);
      }
      else {map.setView(mapCenter, map.getZoom());}
    };
  }, [map, position]);

  return (
    <>
      <div>
        <MapContainer className="map" whenCreated={setMap} center={[position.Lat, position.Long]} doubleClickZoom={true}
      scrollWheelZoom={true} zoom={7}>
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          <PlaceMarker city={city} setCity={setCity} cityCoordinates={cityCoordinates} setCityCoordinates={setCityCoordinates} map={map} setMap={setMap}/>
        </ MapContainer >
      </div>
    </>);
}
export default WMap;
