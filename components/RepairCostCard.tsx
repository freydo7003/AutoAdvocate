import ReportCard from "./ReportCard";

type RepairCostCardProps = {
  estimatedCost: string;
  repairTime: string;
  likelyCauses: string[];
};

export default function RepairCostCard({
  estimatedCost,
  repairTime,
  likelyCauses,
}: RepairCostCardProps) {
  return (
    <ReportCard title="Expected Repair Cost" icon="💰">
      <div className="repair-cost-grid">
        <div className="repair-cost-item">
          <span className="repair-cost-label">Typical Cost Range</span>
          <strong className="repair-cost-value">{estimatedCost}</strong>
        </div>

        <div className="repair-cost-item">
          <span className="repair-cost-label">Estimated Shop Time</span>
          <strong className="repair-cost-value">{repairTime}</strong>
        </div>
      </div>

      <div className="repair-cost-parts">
        <h4>Common Repair Possibilities</h4>

        <ul>
          {likelyCauses.slice(0, 3).map((cause, index) => (
            <li key={index}>{cause}</li>
          ))}
        </ul>
      </div>

      <p className="repair-cost-note">
        Actual pricing can vary based on location, labor rates, vehicle
        condition, and the parts required after testing.
      </p>
    </ReportCard>
  );
}