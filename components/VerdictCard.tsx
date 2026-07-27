type VerdictCardProps = {
  severity: string;
  verdict: string;
  fairnessRating: string;
  actionItems: string[];
};

export default function VerdictCard({
  severity,
  verdict,
  fairnessRating,
  actionItems,
}: VerdictCardProps) {
  const styles = {
    high: {
      backgroundColor: "#fee2e2",
      borderColor: "#ef4444",
      textColor: "#991b1b",
      label: "High Concern",
      icon: "🔴",
    },

    medium: {
      backgroundColor: "#fef3c7",
      borderColor: "#f59e0b",
      textColor: "#92400e",
      label: "Moderate Concern",
      icon: "🟡",
    },

    low: {
      backgroundColor: "#dcfce7",
      borderColor: "#22c55e",
      textColor: "#166534",
      label: "Low Concern",
      icon: "🟢",
    },
  };

 const severityKey = severity.toLowerCase() as keyof typeof styles;
const currentStyle = styles[severityKey]; 
let actionTitle = "Ask More Questions";
let actionIcon = "🟡";

if (fairnessRating === "Likely Overpriced") {
  actionTitle = "Do Not Approve Yet";
  actionIcon = "🚫";
} else if (fairnessRating === "Fair Price") {
  actionTitle = "Reasonable to Approve";
  actionIcon = "✅";
}
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        backgroundColor: currentStyle.backgroundColor,
        border: `2px solid ${currentStyle.borderColor}`,
        borderRadius: "10px",
      }}
    >
 <h2
  style={{
    marginTop: 0,
    marginBottom: "8px",
    color: currentStyle.textColor,
  }}
>
  {actionIcon} {actionTitle}
</h2>

<p
  style={{
    marginTop: 0,
    marginBottom: "14px",
    color: currentStyle.textColor,
    fontWeight: 700,
  }}
>
  {currentStyle.icon} {currentStyle.label}
</p>

      <p
        style={{
          marginBottom: 0,
          color: currentStyle.textColor,
          fontWeight: 600,
        }}
      >
        {verdict}
      </p>
      <div
  style={{
    marginTop: "20px",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: "12px",
      fontSize: "1rem",
      color: currentStyle.textColor,
    }}
  >
    Before approving this repair:
  </h3>

  <ul
    style={{
      margin: 0,
      padding: 0,
      listStyle: "none",
    }}
  >
    {actionItems.map((item, index) => (
      <li
        key={index}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
          marginBottom: "10px",
          lineHeight: 1.5,
        }}
      >
        <span aria-hidden="true">☐</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}