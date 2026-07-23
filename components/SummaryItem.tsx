type SummaryItemProps = {
  icon: string;
  title: string;
  value: string;
  tone?: "default" | "danger" | "warning" | "success";
};

export default function SummaryItem({
  icon,
  title,
  value,
  tone = "default",
}: SummaryItemProps) {
return (
  <div className={`summary-item summary-item-${tone}`}>
    <div className="summary-icon">{icon}</div>

    <p className="summary-title">{title}</p>

    <p className="summary-value">{value}</p>
  </div>
);
}