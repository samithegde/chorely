import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

function MapWithPins() {
  const [pins, setPins] = useState<
    { position: [number, number]; note: string }[]
  >([]);
  const [editingPin, setEditingPin] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState("");

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setPins([
          ...pins,
          { position: [e.latlng.lat, e.latlng.lng], note: "" },
        ]);
        setEditingPin(pins.length); // Edit the new pin
        setNoteInput("");
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={[43.6532, -79.3832]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {pins.map((pin, idx) => (
        <Marker key={idx} position={pin.position}>
          <Popup
            eventHandlers={{
              close: () => setEditingPin(null),
              click: () => {
                setEditingPin(idx);
                setNoteInput(pin.note);
              },
            }}
          >
            {editingPin === idx ? (
              <div>
                <textarea
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  placeholder="Write a note..."
                  rows={3}
                  style={{ width: "100%" }}
                />
                <button
                  style={{ marginTop: "8px" }}
                  onClick={() => {
                    setPins(pins =>
                      pins.map((p, i) =>
                        i === idx ? { ...p, note: noteInput } : p
                      )
                    );
                    setEditingPin(null);
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  setEditingPin(idx);
                  setNoteInput(pin.note);
                }}
                style={{ cursor: "pointer" }}
              >
                {pin.note ? pin.note : <span style={{ color: "#888" }}>(No note. Click to add.)</span>}
              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function MapPage() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapWithPins />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          padding: "12px 24px",
          background: "#223a5f",
        }}
      >
        <img
          src="/anotherchorely.png"
          alt="Logo"
          style={{ height: "40px", marginRight: "16px" }}
        />
        <div style={{ display: "flex", gap: "16px" }}>
          <Link to="/" style={{ color: "#f0f4ff", textDecoration: "none" }}>Landing</Link>
          <Link to="/map" style={{ color: "#f0f4ff", textDecoration: "none" }}>Map</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}