"use client";

import { FormEvent, useState } from "react";
import ReportCard from "../../components/ReportCard";
import VerdictCard from "../../components/VerdictCard";
import TimelineCard from "../../components/TimelineCard";
import SummaryCard from "../../components/SummaryCard";
import ReportHeader from "../../components/ReportHeader";
import ConfidenceCard from "../../components/ConfidenceCard";
import RepairCostCard from "../../components/RepairCostCard";
import FairnessScoreCard from "../../components/FairnessScoreCard";
type AnalysisResult = {
  verdict: string;
  heading: string;
  explanation: string;
  questions: string[];
  nextChecks: string[];
};
type AIAnalysisResult = {
  severity: "high" | "medium" | "low";
  urgency: "immediate" | "soon" | "routine";
  verdict: string;
  summary: string;
  concerns: string[];
  likelyCauses: string[];
  recommendedTests: string[];
  questions: string[];
  spendingAdvice: string;
  estimatedCost: string;
  repairTime: string;
  safeToDrive: "yes" | "no" | "limited";
  confidence: number;
confidenceReason: string;
fairnessScore: number;
fairnessRating: string;
fairnessExplanation: string;

actionItems: string[];
};
export default function AnalyzeRepairPage() {
  const [vehicle, setVehicle] = useState("");
  const [code, setCode] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [shopRecommendation, setShopRecommendation] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [estimateFile, setEstimateFile] = useState<File | null>(null);
const [extractedEstimateText, setExtractedEstimateText] = useState("");
function getVerdictStyle(severity: AIAnalysisResult["severity"]) {
  if (severity === "high") {
    return {
      backgroundColor: "#fee2e2",
      borderLeft: "6px solid #dc2626",
      padding: "16px",
      borderRadius: "8px",
    };
  }

  if (severity === "medium") {
    return {
      backgroundColor: "#fef3c7",
      borderLeft: "6px solid #d97706",
      padding: "16px",
      borderRadius: "8px",
    };
  }

  return {
    backgroundColor: "#dcfce7",
    borderLeft: "6px solid #16a34a",
    padding: "16px",
    borderRadius: "8px",
  };

}
async function testEstimateUpload(fileToUpload?: File) {
 const file = fileToUpload ?? estimateFile;

if (!file) {
  alert("Please choose a repair estimate first.");
  return;
}

  const formData = new FormData();
  formData.append("estimate", file);

  const response = await fetch("/api/upload-test", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.error ?? "The upload failed.");
    return;
  }
setExtractedEstimateText(data.extractedText ?? "");

}


async function analyzeRepair(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
setIsLoading(true);
setAiAnalysis(null);
    const normalizedCode = code.trim().toUpperCase();
    const recommendation = shopRecommendation.toLowerCase();
 try {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      repairText: `
Vehicle: ${vehicle}
Code: ${code}
Symptoms: ${symptoms}
Shop Recommendation: ${shopRecommendation}

${
  extractedEstimateText
    ? `Repair Estimate:
${extractedEstimateText}`
    : ""
}
      `,
    }),
  });

  const data = await response.json();
console.log(data.analysis);
  setAiAnalysis(data.analysis);
} catch (error) {
  console.error(error);
  setAiAnalysis(null);
} finally {
  setIsLoading(false);
}   
if (
  normalizedCode === "P0302" &&
  (recommendation.includes("spark plug") ||
    recommendation.includes("ignition coil"))
) {
  setResult({
    verdict: "🟢 Looks Reasonable",
    heading: "The recommendation matches common causes of this trouble code.",
    explanation:
      "P0302 indicates a misfire on Cylinder 2. Spark plugs and ignition coils are among the most common causes. The recommendation appears reasonable, but the failed part should still be tested before replacement.",
    questions: [
      "Did you test the ignition coil?",
      "Did you inspect the spark plug?",
      "Was the misfire confirmed on Cylinder 2?",
      "Were any other engine problems found?",
    ],
    nextChecks: [
      "Inspect the spark plug.",
      "Test or swap the ignition coil.",
      "Clear the code after the repair.",
      "Road test the vehicle to confirm the misfire is gone.",
    ],
  });

  return;
}
if (
  normalizedCode === "P0302" &&
  recommendation.includes("transmission")
) {
  setResult({
    verdict: "🔴 Get a Second Opinion",
    heading: "The recommendation does not match the trouble code.",
    explanation:
      "P0302 means Cylinder 2 is misfiring. A transmission replacement would not normally repair an engine misfire. The ignition system, fuel injector, compression, and wiring should be tested first.",
    questions: [
      "What test shows the transmission caused the misfire?",
      "Were the spark plug and ignition coil tested?",
      "Was the fuel injector checked?",
      "Was a compression test performed?",
    ],
    nextChecks: [
      "Inspect the Cylinder 2 spark plug.",
      "Swap or test the Cylinder 2 ignition coil.",
      "Test the fuel injector.",
      "Perform a compression test if the misfire remains.",
    ],
  });

  return;
}
    if (
      normalizedCode === "P0171" &&
      recommendation.includes("oxygen sensor")
    ) {
      setResult({
        verdict: "🟡 Use Caution",
        heading: "The recommendation may need more supporting evidence.",
        explanation:
          "P0171 means the engine is running lean on Bank 1. An oxygen sensor can contribute to incorrect readings, but vacuum leaks, intake leaks, fuel-delivery problems, and incorrect mass-air-flow readings should also be considered before replacing parts.",
        questions: [
          "Were the short-term and long-term fuel trims reviewed?",
          "Was the intake system smoke-tested for leaks?",
          "Were mass-air-flow sensor readings checked?",
          "What test confirmed the oxygen sensor itself had failed?",
        ],
        nextChecks: [
          "Inspect for vacuum and intake leaks.",
          "Review fuel-trim data at idle and higher RPM.",
          "Check mass-air-flow sensor readings.",
          "Test fuel pressure if air leaks are not found.",
        ],
      });

      return;
    }

    if (
      normalizedCode === "P0420" &&
      recommendation.includes("catalytic")
    ) {
      setResult({
        verdict: "🟡 Use Caution",
        heading: "A catalytic converter should be confirmed before replacement.",
        explanation:
          "P0420 indicates that catalyst efficiency is below the expected threshold. A worn converter is possible, but exhaust leaks, oxygen-sensor problems, misfires, and rich-running conditions can also affect the result.",
        questions: [
          "Were exhaust leaks ruled out?",
          "Were upstream and downstream oxygen-sensor readings compared?",
          "Were active misfires or fuel-control problems corrected first?",
          "What test confirmed the converter itself was inefficient?",
        ],
        nextChecks: [
          "Inspect for exhaust leaks.",
          "Review oxygen-sensor waveform data.",
          "Check for stored or pending misfire codes.",
          "Review fuel trims before replacing the converter.",
        ],
      });

      return;
    }

    setResult({
        verdict: "🟡 Use Caution",
      heading: "More information is needed before judging the repair.",
      explanation:
        "The trouble code identifies the system that detected a problem, but it does not automatically prove which part has failed. A reliable repair recommendation should be supported by testing.",
      questions: [
        "What testing confirmed the recommended part failed?",
        "Were wiring, connectors, and related systems checked?",
        "Are there additional stored or pending trouble codes?",
        "Will the repair be verified after the part is installed?",
      ],
      nextChecks: [
        "Confirm the exact trouble code.",
        "Review symptoms and when they occur.",
        "Ask for the diagnostic test results.",
        "Consider a second opinion if the evidence is unclear.",
      ],
    });
  }

  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">AutoAdvocate</p>
        <h1>Analyze My Repair</h1>
        <p className="muted">
          Enter your vehicle information, symptoms, trouble code, and the repair
          shop&apos;s recommendation.
        </p>

        <form onSubmit={analyzeRepair}>
          <label>
            Vehicle
            <input
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
              placeholder="Example: 2018 Chevrolet Malibu 1.5T"
            />
          </label>

          <label>
            OBD-II Trouble Code (Optional)
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Example: P0171"
            />
          </label>

          <label>
            Symptoms
            <textarea
              value={symptoms}
              onChange={(event) => setSymptoms(event.target.value)}
              placeholder="Example: Rough idle, hesitation, poor fuel economy"
              rows={4}
            />
          </label>

          <label>
            What did the repair shop recommend?
            <textarea
              value={shopRecommendation}
              onChange={(event) =>
                setShopRecommendation(event.target.value)
              }
              placeholder="Example: Replace the oxygen sensor"
              rows={4}
            />
          </label>

<div className="estimate-upload">
  <label htmlFor="estimateFile">
    📄 Upload Repair Estimate (Optional)
  </label>

 <input
  id="estimateFile"
  type="file"
  accept=".pdf,.png,.jpg,.jpeg"
  onChange={(event) => {
    const selectedFile = event.target.files?.[0] ?? null;

    setEstimateFile(selectedFile);
    setExtractedEstimateText("");

    if (selectedFile) {
      setTimeout(() => {
        testEstimateUpload(selectedFile);
      }, 0);
    }
  }}
/>

  {estimateFile && (
    <p className="estimate-file-name">
      Selected file: <strong>{estimateFile.name}</strong>
    </p>
  )}
  {extractedEstimateText && (
  <div className="estimate-preview">
    <label>Extracted Estimate Text</label>

    <textarea
      rows={10}
      value={extractedEstimateText}
      onChange={(event) =>
        setExtractedEstimateText(event.target.value)
      }
    />
  </div>
)}
  
</div>

<button className="btn" type="submit">
  Analyze My Repair
</button>
        </form>
      </section>
{isLoading && (
  <div className="card analyzing-card">
    <div className="analyzing-spinner" />

    <div>
      <h2>AutoAdvocate AI Analysis</h2>
      <p>Analyzing your repair information...</p>
      <p className="muted">
        This may take several seconds. Please keep this page open.
      </p>
    </div>
  </div>
)}

{aiAnalysis && (
  <section className="card">
<ReportHeader
  vehicle={vehicle}
  code={code}
  repairText={`Symptoms: ${symptoms}. Shop recommendation: ${shopRecommendation}.`}
/>

<div className="report-actions">
  <button
    type="button"
    className="print-button"
   onClick={() => {
  const originalTitle = document.title;

  const safeVehicle = vehicle
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const safeCode = code
    .trim()
    .toUpperCase()
    .replace(/[^a-zA-Z0-9]+/g, "-");

  document.title = `AutoAdvocate-${safeVehicle}-${safeCode}`;

  window.print();

  document.title = originalTitle;
}}
  >
    🖨️ Print / Save PDF
  </button>
</div>

<SummaryCard
  severity={aiAnalysis.severity}
  estimatedCost={aiAnalysis.estimatedCost}
  repairTime={aiAnalysis.repairTime}
  safeToDrive={aiAnalysis.safeToDrive}
  urgency={aiAnalysis.urgency}
/>
<FairnessScoreCard
  score={aiAnalysis.fairnessScore}
  rating={aiAnalysis.fairnessRating}
  explanation={aiAnalysis.fairnessExplanation}
/>
<RepairCostCard
  estimatedCost={aiAnalysis.estimatedCost}
  repairTime={aiAnalysis.repairTime}
  likelyCauses={aiAnalysis.likelyCauses}
/>
<ConfidenceCard
  confidence={aiAnalysis.confidence}
  confidenceReason={aiAnalysis.confidenceReason}
/>
<VerdictCard
  severity={aiAnalysis.severity}
  verdict={aiAnalysis.verdict}
  fairnessRating={aiAnalysis.fairnessRating}
  actionItems={aiAnalysis.actionItems}
/>

<TimelineCard
  urgency={aiAnalysis.urgency}
  fairnessRating={aiAnalysis.fairnessRating}
/>
<ReportCard title="What's Happening" icon="🚗">
  <p>{aiAnalysis.summary}</p>
</ReportCard>

<ReportCard title="Concerns" icon="⚠️">
  <ul>
    {aiAnalysis.concerns.map((concern, index) => (
      <li key={index}>{concern}</li>
    ))}
  </ul>
</ReportCard>

<ReportCard title="Likely Causes" icon="🔧">
  <ul>
    {aiAnalysis.likelyCauses.map((cause, index) => (
      <li key={index}>{cause}</li>
    ))}
  </ul>
</ReportCard>

 <ReportCard title="Recommended Tests" icon="🧪">
  <ul>
    {aiAnalysis.recommendedTests.map((test, index) => (
      <li key={index}>{test}</li>
    ))}
  </ul>
</ReportCard>

<ReportCard title="Questions for the Shop" icon="❓">
  <ul>
    {aiAnalysis.questions.map((question, index) => (
      <li key={index}>{question}</li>
    ))}
  </ul>
</ReportCard>

<ReportCard title="Before You Spend Money" icon="💰">
  <p>{aiAnalysis.spendingAdvice}</p>
</ReportCard>
  </section>
)}
      
    </main>
  );
}