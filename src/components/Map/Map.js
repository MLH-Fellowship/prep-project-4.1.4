import {
  useEffect,
  useState
} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const WMap = (props) => {
  const [position, setPosition] = useState({
    lat: 51.958,
    lng: 9.141,
    zoom: 9
  });

  return (
    <>
    <div>
      < MapContainer className= "map" center={[props.Lat, props.Long]} zoom={2}>

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />

       <Marker position={[props.Lat, props.Long]}>
      <Popup>
        {props.City}
      </Popup>
    </Marker>
      </ MapContainer >
    </div>
    </>
  );
}
export default WMap;
