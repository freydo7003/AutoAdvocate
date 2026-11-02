"use client";

import { useState } from "react";

export default function ScanEstimatePage() {
  const [fileName, setFileName] = useState("");
  const [questionsCopied, setQuestionsCopied] = useState(false);
  const [estimateFile, setEstimateFile] = useState<File | null>(null);
  const [isReadingEstimate, setIsReadingEstimate] = useState(false);
const [extractedEstimateText, setExtractedEstimateText] = useState("");
const [uploadError, setUploadError] = useState("");
const [review, setReview] = useState<{
  verdict: string;
  summary: string;
  urgent: string[];
  canWait: string[];
  needsConfirmation: string[];
  concerns: string[];
  questions: string[];
  costs: {
    parts: string;
    labor: string;
    taxes: string;
    fees: string;
    total: string;
  };
} | null>(null);
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

<p>
  <strong>Not sure if your mechanic's estimate is reasonable?</strong>
  {" "}Upload your repair estimate and let AutoAdvocate
  help you understand what you're being charged for.
</p>

<p>
  Our AI-powered review examines the listed repairs,
  parts and labor charges, potential concerns, and
  questions you should ask before approving the work.
</p>

<p className="muted">
  Upload a JPG, PNG, or PDF repair estimate.
  For your privacy, remove unnecessary personal
  information before uploading.
</p>


<div
  style={{
    backgroundColor: "#f8fafc",
    border: "2px dashed #94a3b8",
    borderRadius: "12px",
    padding: "24px",
    marginTop: "20px",
    marginBottom: "16px",
  }}
>
  <h2>Upload Your Repair Estimate</h2>
  <p className="muted">
    Choose a photo, screenshot, or PDF of the estimate
    your repair shop provided.
  </p>

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => {
            const file = event.target.files?.[0];

          

if (file) {
  setExtractedEstimateText("");
  setReview(null);
  setAnalyzed(false);
  setUploadError("");
setQuestionsCopied(false);
  if (file.size > 5 * 1024 * 1024) {
    setFileName("");
    setEstimateFile(null);
    setUploadError(
      "This file is too large. Please upload an estimate smaller than 5 MB."
    );
    return;
  }

  setFileName(file.name);
  setEstimateFile(file);
}


          }}
        />
</div>
{uploadError && (
  <p
    role="alert"
    style={{
      color: "#b91c1c",
      fontWeight: 600,
      marginTop: "12px",
    }}
  >
    {uploadError}
  </p>
)}

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
    backgroundColor: "#fff7ed",
    border: "1px solid #fdba74",
    borderLeft: "5px solid #ea580c",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "24px",
  }}
>
  <h3 style={{ marginTop: 0, color: "#9a3412" }}>
    {review.verdict}
  </h3>

  <p style={{ marginBottom: 0 }}>
    {review.summary}
  </p>
</div>
 

    <hr />

    <h3>🚨 Urgent</h3>

    {review.urgent.length > 0 ? (
      <ul>
        {review.urgent.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No urgent repairs identified.</p>
    )}

    <h3>⏳ Can Wait</h3>

    {review.canWait.length > 0 ? (
      <ul>
        {review.canWait.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No repairs were clearly identified as safe to delay.</p>
    )}

    <h3>🔎 Needs Confirmation</h3>

    {review.needsConfirmation.length > 0 ? (
      <ul>
        {review.needsConfirmation.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No additional confirmation was identified.</p>
    )}

    <hr />

    <h3>💰 Cost Breakdown</h3>

    <p>
      <strong>Parts:</strong> {review.costs.parts}
    </p>

    <p>
      <strong>Labor:</strong> {review.costs.labor}
    </p>

    <p>
      <strong>Taxes:</strong> {review.costs.taxes}
    </p>

    <p>
      <strong>Fees:</strong> {review.costs.fees}
    </p>

   
<div
  style={{
    backgroundColor: "#f1f5f9",
    borderRadius: "10px",
    padding: "16px",
    marginTop: "12px",
    marginBottom: "20px",
  }}
>
  <p
    style={{
      fontSize: "20px",
      fontWeight: 700,
      margin: 0,
    }}
  >
    Total Estimated Cost: {review.costs.total}
  </p>
</div>


    <hr />

    <h3>⚠️ Concerns</h3>

    {review.concerns.length > 0 ? (
      <ul>
        {review.concerns.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No major concerns were identified.</p>
    )}

    
<div
  style={{
    backgroundColor: "#eff6ff",
    borderLeft: "5px solid #2563eb",
    borderRadius: "10px",
    padding: "16px 20px",
    marginTop: "20px",
  }}
>
  <h3 style={{ marginTop: 0 }}>
    ❓ Questions to Ask Your Mechanic
  </h3>
  
<button
  type="button"
  className="btn"
  onClick={async () => {
    try {
      await navigator.clipboard.writeText(
        review.questions
          .map((question, index) => `${index + 1}. ${question}`)
          .join("\n")
      );
      setQuestionsCopied(true);
    } catch {
      setQuestionsCopied(false);
      alert("Unable to copy questions. Please try again.");
    }
  }}
>
  {questionsCopied ? "✓ Questions Copied!" : "Copy Questions"}
</button>

  <p className="muted">
    Use these questions when speaking with your repair shop
    before approving the recommended work.
  </p>


    {review.questions.length > 0 ? (
      <ul>
        {review.questions.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ) : (
      <p className="muted">No additional questions were suggested.</p>
    )}
  </div>
</div>
)}
 
  </>
)}
</main>
  );
}