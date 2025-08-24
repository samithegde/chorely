import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import Dashboard from "./Dashboard";
import L from "leaflet";

// Utility to create a colored marker icon
function createColorIcon(color: string) {
  return new L.Icon({
    iconUrl:
      `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

const COLORS = [
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Orange", value: "orange" },
  { name: "Yellow", value: "yellow" },
  { name: "Violet", value: "violet" },
  { name: "Grey", value: "grey" },
];

type Pin = {
  position: [number, number];
  note: string;
  color: string;
  taskName?: string;
  commissioner?: string;
  location?: string;
  dateTime?: string;
  reward?: string;
};

function MapWithPins({
  mode,
  acceptChore,
}: {
  mode: "commissioner" | "freelancer";
  acceptChore: (chore: Pin) => void;
}) {
  const [pins, setPins] = useState<Pin[]>([]);
  const [editingPin, setEditingPin] = useState<number | null>(null);
  const [showInfoForm, setShowInfoForm] = useState<number | null>(null);

  // Info form state (for commissioner editing)
  const [infoForm, setInfoForm] = useState({
    color: COLORS[0].value,
    location: "",
    taskName: "",
    dateTime: "",
    commissioner: "",
    reward: "",
    note: "",
  });

  /** Handle commissioner-only map clicks */
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (mode === "commissioner") {
          // Reset info form
          setInfoForm({
            color: COLORS[0].value,
            location: "",
            taskName: "",
            dateTime: "",
            commissioner: "",
            reward: "",
            note: "",
          });

          // Add new pin
          setPins([
            ...pins,
            {
              position: [e.latlng.lat, e.latlng.lng],
              note: "",
              color: COLORS[0].value,
              location: "",
              taskName: "",
              commissioner: "",
              dateTime: "",
              reward: "",
            },
          ]);
          setShowInfoForm(pins.length);
          setEditingPin(null);
        }
      },
    });
    return null;
  }

  function handleDeletePin(idx: number) {
    setPins(pins => pins.filter((_, i) => i !== idx));
    setEditingPin(null);
    setShowInfoForm(null);
  }

  function handleSaveInfo(idx: number) {
    setPins(pins =>
      pins.map((p, i) =>
        i === idx
          ? {
            ...p,
            color: infoForm.color,
            location: infoForm.location,
            taskName: infoForm.taskName,
            dateTime: infoForm.dateTime,
            reward: infoForm.reward,
            commissioner: infoForm.commissioner,
            note: infoForm.note,
          }
          : p
      )
    );
    setShowInfoForm(null);
    setEditingPin(null);
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
        <Marker key={idx} position={pin.position} icon={createColorIcon(pin.color)}>
          <Popup
            eventHandlers={{
              close: () => {
                setEditingPin(null);
                setShowInfoForm(null);
              },
              click: () => {
                if (mode === "commissioner") {
                  setEditingPin(null);
                  setShowInfoForm(idx);
                  setInfoForm({
                    color: pin.color,
                    location: pin.location || "",
                    taskName: pin.taskName || "",
                    dateTime: pin.dateTime || "",
                    reward: pin.reward || "",
                    note: pin.note || "",
                    commissioner: pin.commissioner || "",
                  });
                }
              },
            }}
          >
            {mode === "commissioner" ? (
              // --- COMMISSIONER MODE ---
              showInfoForm === idx ? (
                <div>
                  {/* Form for editing pins */}
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Pin color:{" "}
                      <select
                        value={infoForm.color}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, color: e.target.value }))
                        }
                      >
                        {COLORS.map(c => (
                          <option key={c.value} value={c.value}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Task Name:{" "}
                      <input
                        type="text"
                        value={infoForm.taskName}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, taskName: e.target.value }))
                        }
                        style={{ width: "90%" }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Location:{" "}
                      <input
                        type="text"
                        value={infoForm.location}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, location: e.target.value }))
                        }
                        style={{ width: "90%" }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Date/Time:{" "}
                      <input
                        type="datetime-local"
                        value={infoForm.dateTime}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, dateTime: e.target.value }))
                        }
                        style={{ width: "90%" }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Your Name:{" "}
                      <input
                        type="text"
                        value={infoForm.commissioner}
                        onChange={e =>
                          setInfoForm(f => ({
                            ...f,
                            commissioner: e.target.value,
                          }))
                        }
                        style={{ width: "90%" }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Reward:{" "}
                      <input
                        type="text"
                        value={infoForm.reward}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, reward: e.target.value }))
                        }
                        style={{ width: "90%" }}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <label>
                      Note:{" "}
                      <textarea
                        value={infoForm.note}
                        onChange={e =>
                          setInfoForm(f => ({ ...f, note: e.target.value }))
                        }
                        placeholder="Write a note..."
                        rows={3}
                        style={{ width: "100%" }}
                      />
                    </label>
                  </div>
                  <button
                    style={{ marginTop: "8px" }}
                    onClick={e => {
                      e.stopPropagation();
                      handleSaveInfo(idx);
                    }}
                  >
                    Save
                  </button>
                  <button
                    style={{ marginTop: "8px", marginLeft: "8px", color: "red" }}
                    onClick={e => {
                      e.stopPropagation();
                      setShowInfoForm(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    style={{ marginTop: "8px", marginLeft: "8px", color: "red" }}
                    onClick={e => {
                      e.stopPropagation();
                      handleDeletePin(idx);
                    }}
                  >
                    Delete Pin
                  </button>
                </div>
              ) : (
                <div>
                  <strong>{pin.taskName || "(No task name)"}</strong>
                  <div style={{ fontSize: "0.9em", color: "#888" }}>
                    {pin.location && <div>Location: {pin.location}</div>}
                    {pin.dateTime && <div>Date/Time: {pin.dateTime}</div>}
                    {pin.reward && <div>Reward: {pin.reward}</div>}
                  </div>
                  <div style={{ margin: "8px 0" }}>
                    {pin.note ? pin.note : <span style={{ color: "#888" }}>(No note)</span>}
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setShowInfoForm(idx);
                      setInfoForm({
                        color: pin.color,
                        location: pin.location || "",
                        taskName: pin.taskName || "",
                        dateTime: pin.dateTime || "",
                        commissioner: pin.commissioner || "",
                        reward: pin.reward || "",
                        note: pin.note || "",
                      });
                    }}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDeletePin(idx);
                    }}
                    style={{ color: "red" }}
                  >
                    Delete Pin
                  </button>
                </div>
              )
            ) : (
              // --- FREELANCER MODE ---
              <div>
                <strong>{pin.taskName || "(No task name)"}</strong>
                <div>{pin.location}</div>
                <div>{pin.dateTime}</div>
                <div>{pin.reward}</div>
                <button
                  style={{
                    marginTop: "8px",
                    background: "#4caf50",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px",
                  }}
                  onClick={() => {
                    alert(`You accepted: ${pin.taskName}`);   // ✅ keep the popup
                    acceptChore(pin);                         // ✅ save to Dashboard
                    setPins(pins.filter((_, i) => i !== idx)); // ✅ remove from map
                  }}
                >
                  Accept Chore
                </button>

              </div>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}


function MapPage({
  mode,
  acceptChore,
}: {
  mode: "commissioner" | "freelancer";
  acceptChore: (chore: Pin) => void;
}) {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapWithPins mode={mode} acceptChore={acceptChore} />
    </div>
  );
}

export default function App() {

  const [mode, setMode] = useState<"commissioner" | "freelancer">("commissioner");
  const [acceptedChores, setAcceptedChores] = useState<Pin[]>([]);

  function acceptChore(chore: Pin) {
    setAcceptedChores([...acceptedChores, chore]);
  }

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
          <Link to="/dashboard" style={{ color: "#f0f4ff", textDecoration: "none" }}>Dashboard</Link>
        </div>

        <button
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            background: mode === "commissioner" ? "#4caf50" : "#2196f3",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() =>
            setMode(mode === "commissioner" ? "freelancer" : "commissioner")
          }
        >
          {mode === "commissioner" ? "Commissioner Mode" : "Freelancer Mode"}
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/map"
          element={<MapPage mode={mode} acceptChore={acceptChore} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard acceptedChores={acceptedChores} />}
        />
      </Routes>


    </Router>
  );
}