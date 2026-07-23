type VerdictCardProps = {
  severity: "high" | "medium" | "low";
  verdict: string;
};

export default function VerdictCard({
  severity,
  verdict,
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

  const currentStyle = styles[severity];

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
          color: currentStyle.textColor,
        }}
      >
        {currentStyle.icon} {currentStyle.label}
      </h2>

      <p
        style={{
          marginBottom: 0,
          color: currentStyle.textColor,
          fontWeight: 600,
        }}
      >
        {verdict}
      </p>
    </div>
  );
}