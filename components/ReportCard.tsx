import type { ReactNode } from "react";

type ReportCardProps = {
  title: string;
  icon: string;
  children: ReactNode;
};

export default function ReportCard({
  title,
  icon,
  children,
}: ReportCardProps) {
  return (
    <div className="report-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "10px",
        }}
      >
        <span style={{ fontSize: "28px" }}>{icon}</span>

        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>

      {children}
    </div>
  );
}