import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom"; // React Router

const MapComponent = () => {
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current && mapRef.current._leaflet_id) return;

    mapRef.current = L.map("map").setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 4,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const locations = [
      { name: "Delhi", coords: [28.6139, 77.209], status: "online" },
      { name: "Chennai", coords: [13.0827, 80.2707], status: "online" },
      { name: "Vellore", coords: [12.9165, 79.1325], status: "offline" },
      { name: "Mumbai", coords: [19.076, 72.8777], status: "offline" },
    ];

    locations.forEach((location) => {
      const markerColor = location.status === "online" ? "green" : "red";

      const marker = L.circleMarker(location.coords, {
        color: markerColor,
        radius: 8,
        fillOpacity: 0.8,
      }).addTo(mapRef.current);

      marker.bindPopup(
        `<b>${location.name}</b><br>Status: <span style='color:${markerColor};'>${location.status}</span>`
      );

      marker.on("click", () => {
        navigate("/dashboard");
      });
    });
  }, [navigate]);
  return <div id="map" style={{ height: "100%", width: "100%", position: "relative", zIndex: "0" }}></div>;

};

export default MapComponent;
