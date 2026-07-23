import { findObdCode } from "../lib/obd-codes";

type ReportHeaderProps = {
  vehicle: string;
  code: string;
  repairText: string;
};

export default function ReportHeader({
  vehicle,
  code,
  repairText,
}: ReportHeaderProps) {
  const obdCode = findObdCode(code);

  const generatedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const reportId = `AA-${new Date()
    .toISOString()
    .replace(/\D/g, "")
    .slice(0, 14)}`;

  return (
    <div className="report-header">
      <div className="report-brand">
  <div className="report-brand-logo">AA</div>

  <div>
    <div className="report-brand-name">AutoAdvocate</div>
    <div className="report-brand-subtitle">
      AI Vehicle Diagnostic Report
    </div>
  </div>
</div>  
      <div className="report-header-top">
        <div className="report-header-icon">🚗</div>

        <div>
          <p className="report-header-label">AutoAdvocate AI Report</p>
          <h1 className="report-header-title">{vehicle}</h1>
        </div>
      </div>

      <div className="report-header-divider" />

{obdCode && (
  <div className="report-header-code-panel">
    <div className="report-header-code">
      <strong>{obdCode.code}</strong>
      <span>{obdCode.title}</span>
      <small>{obdCode.system}</small>
    </div>
  </div>
)}



     <div className="report-header-footer">
  <div className="report-meta">
    <div className="report-meta-item">
      <span className="report-meta-label">Generated</span>
      <span className="report-meta-value">{generatedDate}</span>
    </div>

    <div className="report-meta-item">
      <span className="report-meta-label">Report ID</span>
      <span className="report-meta-value">{reportId}</span>
    </div>
  </div>

  <p className="report-header-description">
    {repairText}
  </p>

<p>Analyzed by the AutoAdvocate AI diagnostic engine</p>
</div>
</div>
);
}