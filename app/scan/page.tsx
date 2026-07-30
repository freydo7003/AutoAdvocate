"use client";

import { useState } from "react";

export default function ScanEstimatePage() {
  const [fileName, setFileName] = useState("");
  const [estimateFile, setEstimateFile] = useState<File | null>(null);
  const [isReadingEstimate, setIsReadingEstimate] = useState(false);
const [extractedEstimateText, setExtractedEstimateText] = useState("");
const [uploadError, setUploadError] = useState("");
const [review, setReview] = useState("");
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
   const reviewResponse = await fetch("/api/analyze/review-estimate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    estimateText: data.extractedText,
  }),
});

const reviewData = await reviewResponse.json();

if (!reviewResponse.ok) {
  throw new Error(reviewData.error || "Unable to review estimate.");
}

setReview(reviewData.review); 
    setAnalyzed(true);
  } catch (error) {
    console.error(error);
    setUploadError("The estimate could not be read.");
  } finally {
    setIsReadingEstimate(false);
  }
}

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
              AutoAdvocate will extract and analyze your repair estimate using AI.
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
  <>
    {review && (
      <div className="card">
        <h2>AI Estimate Review</h2>

        <div
          style={{
            whiteSpace: "pre-wrap",
            lineHeight: 1.7,
          }}
        >
          {review}
        </div>
      </div>
    )}

 
  </>
)}
</main>
  );
}