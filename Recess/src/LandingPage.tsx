import React from "react";

export default function LandingPage() {
  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
        width: "100vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 80px",
        background: "linear-gradient(to bottom, #1c1c1c, #2a2a2a)",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Text */}
      <div style={{ maxWidth: "400px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>
          Get Your <br /> First Gig.
        </h1>
        <p style={{ fontSize: "1rem", color: "#ccc", marginBottom: "24px" }}>
          Freelance for youth, made easy.
        </p>
        <button
          style={{
            padding: "12px 24px",
            background: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/map")}
        >
          Open Map
        </button>
      </div>

      <div
        style={{
          flexShrink: 0,
          width: "50%",
          height: "70%",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="/MAP.png"
          alt="Map preview"
          style={{
            width: "150%",
            height: "150%",
            objectFit: "cover",
            transform: "translate(-25%, -25%)", // Center the zoom
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.64)", // Add drop shadow
          }}
        />
      </div>
    </div>
  );
}
