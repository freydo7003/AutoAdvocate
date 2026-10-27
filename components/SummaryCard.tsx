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
  yes: "Generally OK Based on Symptoms",
  limited: "Limit Driving Until Inspected",
  no: "Do Not Drive",
};

  const urgencyLabels = {
    immediate: "Repair Immediately",
    soon: "Schedule Repair Soon",
    routine: "Routine Service",
  };

  return (
    <div className="report-card">
 <h2 style={{ marginTop: 0 }}>Repair Analysis Summary</h2> 

<div className="summary-grid">
   <SummaryItem
  icon={severity === "high" ? "🔴" : severity === "medium" ? "🟡" : "🟢"}
  title="Repair Approval Risk"
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
  title="Initial Diagnostic Cost"
  value={estimatedCost.split(";")[0].trim()}
/>

<SummaryItem
  icon="🔧"
  title="Alternative Repair Possibility"
  value={estimatedCost.split(";")[1]?.trim() || "Not available"}
/>

<SummaryItem
  icon="⏱️"
  title="Estimated Shop Time"
  value={repairTime.split(";")[0].trim()}
/>

    <SummaryItem
      icon="🚗"
      title="Driving Guidance"
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