import {
  useEffect,
  useState
} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';

const WMap = () => {
  const [position, setPosition] = useState({
    lat: 51.958,
    lng: 9.141,
    zoom: 9
  });

  return (
    <>
    <div>
      < MapContainer className= "map" center={[40.505, -100.09]} zoom={13}
      >

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
      </ MapContainer >
    </div>
    </>
  );
}
export default WMap;
