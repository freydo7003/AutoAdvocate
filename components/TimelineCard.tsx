type TimelineCardProps = {
  urgency: "immediate" | "soon" | "routine";
};

export default function TimelineCard({
  urgency,
}: TimelineCardProps) {
  const timelines = {
    immediate: {
      label: "Immediate",
      message:
        "Repair as soon as possible to reduce safety risks or prevent major damage.",
      icon: "🚨",
    },

    soon: {
      label: "Soon",
      message:
        "Schedule the repair soon before the problem becomes more expensive or causes additional damage.",
      icon: "⏳",
    },

    routine: {
      label: "Routine",
      message:
        "This can usually be handled during normal maintenance or at your next convenient service visit.",
      icon: "🗓️",
    },
  };

  const currentTimeline = timelines[urgency];

  return (
    <div
      style={{
        marginTop: "12px",
        padding: "12px",
        backgroundColor: "#f8fafc",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
      }}
    >
      <strong>⏰ Recommended Repair Timeline</strong>

      <p style={{ marginTop: "8px", marginBottom: 0 }}>
        {currentTimeline.icon}{" "}
        <strong>{currentTimeline.label}</strong> —{" "}
        {currentTimeline.message}
      </p>
    </div>
  );
}