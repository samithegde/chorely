import React from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
import "./Dashboard.css";

type Pin = {
  taskName: string;
  location: string;
  dateTime: string;
  reward: string;
  commissioner?: string;
  description?: string;
};

export default function Dashboard({ acceptedChores }: { acceptedChores: Pin[] }) {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h2>📋 Accepted Chores</h2>

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
                <button className="cancel">Cancel Gig</button>
                <button className="contact">Contact Commissioner</button>
              </div>

              <div className="details">
                <h1>Details</h1>
                <p className="description">
                  {chore.description || "No additional details provided."}
                </p>
              </div>
            </div>
          ))}

          {/* Find More Gigs button at the bottom if there ARE accepted chores */}
          <button className="more" onClick={() => navigate("/map")}>
            Find More Gigs
          </button>
        </>
      )}
    </div>
  );
}
