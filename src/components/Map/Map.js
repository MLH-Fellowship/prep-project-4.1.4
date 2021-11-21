import {
  useEffect,
  useState,
  useRef
} from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup ,useMapEvent} from 'react-leaflet';
import "./Map.css";
import 'leaflet/dist/leaflet.css';
import LCG from 'leaflet-control-geocoder';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;


const PlaceMarker = ({lat,long,city,setCity,map,setMap}) =>{
 const [center,setCenter] = useState([lat,long]);
 // const geocoder = L.Control.Geocoder.nominatim();

  useEffect(()=>{
    setCenter([lat,long])
  },[lat,long]);

  useMapEvent("click", (e) => {
    console.log(e.latlng);
    fetch(
     `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=${process.env.REACT_APP_APIKEY}`
   )
     .then((res) => res.json())
     .then(
       (result) => {
         console.log("pppp");
         console.log("this" ,result);
         setCenter([e.latlng.lat,e.latlng.lng]);
         setCity(result.name);
       },
       (error) => {
         // setIsLoaded(true);
         window.alert(error);
       }
     );
  });

  return(
  <Marker position={center}>
   <Popup>
     {city}
   </Popup>
 </Marker>
);
}

const WMap = (props) => {
  const [map, setMap] = useState(null);
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

  useEffect(()=>{
    setMap(map)
  },[map])
  return (
    <>
    <div>

      < MapContainer className= "map"
      whenCreated={setMap}
      center={[position.Lat, position.Long]}
      zoom={2}
      >

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />


     <PlaceMarker
       lat={position.Lat}
       long = {position.Long}
       city = {position.City}
       setCity = {props.setCity}
       map = {map}
       setMap = {setMap}
       />

      </ MapContainer  >
    </div>
    </>
  );
}
export default WMap;

    // geocoder.reverse(
    //   e.latlng,
    //   map.options.crs.scale(map.getZoom()),
    //   (results) => {
    //     if(results.length>0){
    //       console.log("Hello ", results[0].name);
    //       setCity(results[0].name);
    //       setCenter([e.latlng.lat,e.latlng.lng]);
    //     }
    //     else{
    //       window.alert("Location not found");
    //     }
    //   }
    // );
