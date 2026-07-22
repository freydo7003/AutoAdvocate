"use client";

import { useState } from "react";

export default function ScanEstimatePage() {
  const [fileName, setFileName] = useState("");
const [analyzed, setAnalyzed] = useState(false);
  return (
    <main className="container">
      <div className="card">
        <h1>Scan My Repair Estimate</h1>

        <p className="muted">
          Upload a photo or PDF of your repair estimate.
        </p>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              setFileName(file.name);
            }
          }}
        />

        {fileName && (
          <div className="card">
            <h2>File selected</h2>
            <p>{fileName}</p>
            <button
  className="btn"
  type="button"
  onClick={() => setAnalyzed(true)}
>
  Analyze Estimate
</button>
            <p className="muted">
              AutoAdvocate will analyze this estimate in a future step.
            </p>
          </div>
        )}
      </div>
      {analyzed && (
  <div className="card">
    <h2>AutoAdvocate Estimate Review</h2>

    <h3>🟡 Use Caution</h3>

    <p>
      This estimate has been uploaded successfully. AutoAdvocate will soon
      review the repairs, prices, and recommendations.
    </p>

    <h3>What AutoAdvocate will check</h3>

    <ul>
      <li>Which repairs are urgent</li>
      <li>Which repairs may be able to wait</li>
      <li>Whether the prices look reasonable</li>
      <li>Questions to ask the repair shop</li>
    </ul>
  </div>
)}
    </main>
  );
}