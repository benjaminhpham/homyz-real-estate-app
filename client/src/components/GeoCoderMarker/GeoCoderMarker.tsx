import { useEffect, useState } from "react";
import "./GeoCoderMarker.css";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";

interface GeoCoderMarkerProps {
  address: string;
}

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function GeoCoderMarker({ address }: GeoCoderMarkerProps) {
  const map = useMap();
  const [position, setPosition] = useState([38.91, -77.06]);

  useEffect(() => {
    ELG.geocode()
      .text(address)
      .run((err, results, response) => {
        if (results?.results?.length > 0) {
          const [lat, long] = results?.results[0].latlng;
          setPosition([lat, long]);
          map.flyTo([lat, long], 6);
        }
      });
  }, [address]);

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
}
