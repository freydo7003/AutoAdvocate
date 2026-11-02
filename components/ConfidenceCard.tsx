import ReportCard from "./ReportCard";

type ConfidenceCardProps = {
  confidence: number;
  confidenceReason: string;
};

export default function ConfidenceCard({
  confidence,
  confidenceReason,
}: ConfidenceCardProps) {
  const color =
    confidence >= 85
      ? "#22c55e"
      : confidence >= 65
      ? "#f59e0b"
      : "#ef4444";

  return (
    <ReportCard title="AI Confidence" icon="🎯">
      <div
        style={{
          width: "100%",
          height: "18px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            width: `${confidence}%`,
            height: "100%",
            background: color,
            transition: "width .4s ease",
          }}
        />
      </div>

      <h2 style={{ marginTop: 0 }}>{confidence}%</h2>

      <p>{confidenceReason}</p>
     <p
  style={{
    fontSize: "0.85rem",
    color: "#64748b",
    marginTop: "12px",
    lineHeight: 1.5,
  }}
>
  <strong>What does this score mean?</strong> This score reflects
  the AI's confidence in its assessment based on the information
  provided. A lower score means more diagnostic information may
  be needed. It does not represent the probability that a
  particular repair is necessary.
</p> 
    </ReportCard>
  );
}