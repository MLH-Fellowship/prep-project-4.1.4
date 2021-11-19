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
    Lat: "",
    Long: "",
    zoom: 9,
    City: ""
  });

  useEffect(()=>{
    setPosition({
      Lat: props.Lat,
      Long: props.Long,
      zoom: 9,
      City: props.City
    })
  },[props.Lat,props.Long]);

  const changePosition = (e) =>{
    console.log( "Check ", e.latlng);
  }

  return (
    <>
    <div>
      < MapContainer className= "map"
      onclick = {changePosition}
      center={[position.Lat, position.Long]}
      zoom={2}
      >

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />

     <Marker position={[position.Lat, position.Long]}>
      <Popup>
        {position.City}
      </Popup>
    </Marker>
      </ MapContainer >
    </div>
    </>
  );
}
export default WMap;
