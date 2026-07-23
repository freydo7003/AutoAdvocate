import SummaryItem from "./SummaryItem";

type SummaryCardProps = {
  severity: "high" | "medium" | "low";
  estimatedCost: string;
  repairTime: string;
  safeToDrive: "yes" | "no" | "limited";
  urgency: "immediate" | "soon" | "routine";
};

export default function SummaryCard({
  severity,
  estimatedCost,
  repairTime,
  safeToDrive,
  urgency,
}: SummaryCardProps) {
  const riskLabels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  const drivingLabels = {
    yes: "Yes",
    no: "No",
    limited: "Limited Driving Only",
  };

  const urgencyLabels = {
    immediate: "Repair Immediately",
    soon: "Schedule Repair Soon",
    routine: "Routine Service",
  };

  return (
    <div className="report-card">
  <h2 style={{ marginTop: 0 }}>Vehicle Risk Summary</h2>

<div className="summary-grid">
   <SummaryItem
  icon={severity === "high" ? "🔴" : severity === "medium" ? "🟡" : "🟢"}
  title="Overall Risk"
  value={riskLabels[severity]}
  tone={
    severity === "high"
      ? "danger"
      : severity === "medium"
      ? "warning"
      : "success"
  }
/>

    <SummaryItem
      icon="💰"
      title="Estimated Repair Cost"
      value={estimatedCost}
    />

    <SummaryItem
      icon="⏱️"
      title="Estimated Shop Time"
      value={repairTime}
    />

    <SummaryItem
      icon="🚗"
      title="Safe to Drive"
      value={drivingLabels[safeToDrive]}
    />

    <SummaryItem
      icon="📅"
      title="Recommended Action"
      value={urgencyLabels[urgency]}
    />
  </div>
</div>
  );
}