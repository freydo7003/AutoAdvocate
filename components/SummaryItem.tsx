
type SummaryItemProps = {
  icon: string;
  title: string;
  value: string;
  tone?: "default" | "danger" | "warning" | "success";
  disclaimer?: string;
};

export default function SummaryItem({
  icon,
  title,
  value,
  tone = "default",
  disclaimer,
}: SummaryItemProps) {
  return (
    <div className={`summary-item summary-item-${tone}`}>
      <div className="summary-icon">{icon}</div>

      <p className="summary-title">{title}</p>

      <p className="summary-value">{value}</p>

      {disclaimer && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "#64748b",
            marginTop: "8px",
            lineHeight: 1.4,
          }}
        >
          {disclaimer}
        </p>
      )}
    </div>
  );
}
