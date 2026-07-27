import ReportCard from "./ReportCard";

type FairnessScoreCardProps = {
  score: number;
  rating: string;
  explanation: string;
};

export default function FairnessScoreCard({
  score,
  rating,
  explanation,
}: FairnessScoreCardProps) {
  const safeScore = Math.max(0, Math.min(100, score));

  let toneClass = "fairness-score-good";

  if (safeScore < 40) {
    toneClass = "fairness-score-bad";
  } else if (safeScore < 70) {
    toneClass = "fairness-score-warning";
  }

  return (
    <ReportCard title="Mechanic Fairness Score" icon="🛡️">
      <div className={`fairness-score-box ${toneClass}`}>
        <div>
          <span className="fairness-score-label">Quote Fairness</span>
          <strong className="fairness-score-rating">{rating}</strong>
        </div>

        <div className="fairness-score-number">{safeScore}/100</div>
      </div>

      <div className="fairness-score-track">
        <div
          className={`fairness-score-fill ${toneClass}`}
          style={{ width: `${safeScore}%` }}
        />
      </div>

      <p className="fairness-score-explanation">{explanation}</p>
    </ReportCard>
  );
}