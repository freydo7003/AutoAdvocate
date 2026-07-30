"use client";

import { useState } from "react";

export default function ScanEstimatePage() {
  const [fileName, setFileName] = useState("");
  const [estimateFile, setEstimateFile] = useState<File | null>(null);
  const [isReadingEstimate, setIsReadingEstimate] = useState(false);
const [extractedEstimateText, setExtractedEstimateText] = useState("");
const [uploadError, setUploadError] = useState("");
const [analyzed, setAnalyzed] = useState(false);
async function readEstimate() {
  if (!estimateFile) {
    setUploadError("Please choose a repair estimate first.");
    return;
  }

  setIsReadingEstimate(true);
  setUploadError("");
  setExtractedEstimateText("");

  try {
    const formData = new FormData();
    formData.append("estimate", estimateFile);

    const response = await fetch("/api/analyze/extract-estimate", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setUploadError(data.error ?? "The estimate could not be read.");
      return;
    }

    setExtractedEstimateText(data.extractedText ?? "");
    setAnalyzed(true);
  } catch (error) {
    console.error(error);
    setUploadError("The estimate could not be read.");
  } finally {
    setIsReadingEstimate(false);
  }
}
const estimate = {
  verdict: "🟡 Overall Verdict: Use Caution",
  confidence: 78,

  repairs: [
    {
      name: "Front Brake Pads",
      status: "🟢",
      price: "$350.00",
      priority: "Can Wait",
    },
    {
      name: "Oxygen Sensor",
      status: "🟡",
      price: "$275.00",
      priority: "Schedule Within 30 Days",
    },
    {
      name: "Engine Flush",
      status: "🔴",
      price: "$150.00",
      priority: "Repair Soon",
    },
  ],

  questions: [
    "Why is the engine flush recommended?",
    "What testing confirmed the oxygen sensor?",
    "Are any repairs considered preventive maintenance?",
    "Is any work duplicated on the estimate?",
  ],

  totals: {
    parts: "$860.00",
    labor: "$495.00",
    taxes: "$70.18",
    total: "$1,425.18",
  },
};
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
  setEstimateFile(file);
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
 onClick={readEstimate}
 disabled={isReadingEstimate}
>
  {isReadingEstimate ? "Reading Estimate..." : "Analyze Estimate"}
</button>
            <p className="muted">
              AutoAdvocate will analyze this estimate in a future step.
            </p>
          </div>
        )}
      </div>
      {extractedEstimateText && (
  <div className="card">
    <h2>Extracted Estimate Text</h2>
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {extractedEstimateText}
    </pre>
  </div>
)}
 {analyzed && (
  <div className="card">
    <h2>📄 AutoAdvocate Estimate Review</h2>

   <h3>{estimate.verdict}</h3>

    <p>
  <strong>Confidence:</strong> {estimate.confidence}%
</p>

    <hr />

    <h3>Repairs Found</h3>

<ul>
 {estimate.repairs.map((repair) => (
  <li key={repair.name}>
  {repair.status} {repair.name} — <strong>{repair.price}</strong>
</li>  
  ))}
</ul>
<h3>Repair Priority</h3>

<ul>
 {estimate.repairs.map((repair) => (
    <li key={`${repair.name}-priority`}>
      <strong>
        {repair.status} {repair.priority}:
      </strong>{" "}
      {repair.name}
    </li>
  ))}
</ul>


    <hr />

    <h3>Repair Cost Breakdown</h3>

<p>
  <strong>Parts:</strong> {estimate.totals.parts}
</p>
<p>
  <strong>Labor:</strong> {estimate.totals.labor}
</p>

<p>
  <strong>Taxes and Fees:</strong> {estimate.totals.taxes}
</p>

<p>
  <strong>Estimated Total:</strong> {estimate.totals.total}
</p>

    <hr />

    <h3>Questions to Ask the Shop</h3>

    <ul>
  {estimate.questions.map((question) => (
    <li key={question}>{question}</li>
  ))}
</ul>
  </div>
)}    
</main>
  );
}