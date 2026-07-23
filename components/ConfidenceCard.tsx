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
    </ReportCard>
  );
}