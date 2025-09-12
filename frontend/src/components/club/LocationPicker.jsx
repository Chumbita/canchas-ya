import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"

export default function LocationPicker() {
  const containerStyle = {width: "100%", heigth: "400px"};
  const defaultCenter = {lat: -29.4131, lng: -66.8558};
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });
  return (
    <div>
      
    </div>
  )
}
