import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";

interface MapProps {
  address: string;
  city: string;
  country: string;
}

export default function Map({ address, city, country }: MapProps) {
  return (
    <MapContainer
      center={[38.91, -77.06]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
        backgroundColor: "red",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  );
}
