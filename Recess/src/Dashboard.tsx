import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="taskBox">
        <h1 className = "task">Task</h1>
        <h2 className ="taskName">Lawn Mowing</h2>
        <h1 className = "commissioner">Commissioner: <var></var></h1>
        <div className = "info">
            <h1>INFO</h1>
            <h1>Location</h1>
            <h2 className ="LocationName">905 Queen Street West</h2>
            <h1>Time</h1>
            <h2 className ="Time">August 26th, 11:45 AM</h2>
            <div className="rewardsBox">
              <h1 className = "rewardText">Reward</h1>
              <h2 className="Reward"> $45 CAD</h2>
            </div>
        </div>
        <div className = "buttonBox">
          <button className="cancel">Cancel Gig</button>
          <button className = "contact">Contact Commissioner</button>
        </div>
        <div className = "details">
          <h1>Details</h1>
          <p className = "description">blah blah blah blah blah blah blah blah blah blah blah</p>
        </div>
      </div>
      <button className ="more">Find More Gigs</button>
    </div>
  );
}

