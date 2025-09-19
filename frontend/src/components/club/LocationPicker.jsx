import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";

export default function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  function LocationMarker() {
    useMapEvent({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng);
      },
    });
    return position ? <Marker position={position}></Marker> : null;
  }

  return (
    <MapContainer
      center={[-29.412794975144536, -66.85592800288613]}
      zoom={13}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
