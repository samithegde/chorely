import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Pin = {
  taskName: string;
  location: string;
  dateTime: string;
  reward: string;
  commissioner?: string;
  description?: string;
  position?: [number, number];
};

function createColorIcon(color: string) {
  return new L.Icon({
    iconUrl:
      `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export default function Dashboard({
  acceptedChores,
  onCancelChore,
}: {
  acceptedChores: Pin[];
  onCancelChore: (idx: number) => void;
}) {
  const navigate = useNavigate();
  const [completedTasks, setCompletedTasks] = useState<
    { taskName: string; dateTime: string }[]
  >([]);

  const handleCompleteTask = (idx: number) => {
    const completed = acceptedChores[idx];
    setCompletedTasks((prev) => [
      ...prev,
      { taskName: completed.taskName, dateTime: completed.dateTime },
    ]);
    onCancelChore(idx);
  };

  return (
    <div className="dashboard-split">
      <div className="dashboard-left">
        <h2>📋 My Tasks</h2>

        {acceptedChores.length === 0 ? (
          <div className="empty-state">
            <img
              src="/nothinghere.png"
              alt="Nothing Here"
              className="nothing-image"
            />
            <button className="more" onClick={() => navigate("/map")}>
              Find More Gigs
            </button>
          </div>
        ) : (
          <>
            {acceptedChores.map((chore, idx) => (
              <div key={idx} className="taskBox">
                <h1 className="task">Task</h1>
                <h2 className="taskName">{chore.taskName || "(No task name)"}</h2>

                <h1 className="commissioner">
                  Commissioner: {chore.commissioner || "Unknown"}
                </h1>

                <div className="info">
                  <h1>INFO</h1>
                  <h1>Location</h1>
                  <h2 className="LocationName">{chore.location}</h2>

                  <h1>Time</h1>
                  <h2 className="Time">{chore.dateTime}</h2>

                  <div className="rewardsBox">
                    <h1 className="rewardText">Reward</h1>
                    <h2 className="Reward">{chore.reward}</h2>
                  </div>
                </div>

                <div className="buttonBox">
                  <div className="topRow">
                    <button
                      className="cancel"
                      onClick={() => onCancelChore(idx)}
                    >
                      Cancel
                    </button>
                    <button className="contact">Contact Commissioner</button>
                  </div>

                  <div className="bottomRow">
                    <button
                      className="complete"
                      onClick={() => handleCompleteTask(idx)}
                    >
                      Complete Task
                    </button>
                  </div>
                </div>

                <div className="details">
                  <h1>Details</h1>
                  <p className="description">
                    {chore.description || "No additional details provided."}
                  </p>
                </div>
              </div>
            ))}

            <button className="more" onClick={() => navigate("/map")}>
              Find More Gigs
            </button>

            {completedTasks.length > 0 && (
              <div className="completed-section">
                <h2>✅ Completed Tasks</h2>
                {completedTasks.map((task, idx) => (
                  <div key={idx} className="completedTask">
                    <span className="completedName">{task.taskName}</span>
                    <span className="completedDate">{task.dateTime}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="dashboard-right">
        <MapContainer
          center={[43.6532, -79.3832]}
          zoom={12}
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {acceptedChores.map((chore, idx) =>
            chore.position ? (
              <Marker
                key={idx}
                position={chore.position}
                icon={createColorIcon("blue")}
              >
                <Popup>
                  <strong>{chore.taskName}</strong>
                  <br />
                  {chore.location}
                  <br />
                  {chore.dateTime}
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </div>
    </div>
  );
}
