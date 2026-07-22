"use client";

import { FormEvent, useState } from "react";

type Review = {
  vehicle: string;
  repair: string;
  cost: string;
  message: string;
  questions: string[];
};

export default function EstimatePage() {
  const [review, setReview] = useState<Review | null>(null);

  function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const repair = String(data.get("repair") || "");
    const normalized = repair.toLowerCase();

    let message = "This repair is not yet in the prototype knowledge base. Ask the shop what test confirmed the failure and request a written parts-and-labor breakdown.";
    let questions = [
      "What test confirmed this repair is necessary?",
      "What less-expensive causes were ruled out?",
      "Can you show me the failed part or test result?"
    ];

    if (normalized.includes("alternator")) {
      message = "Alternator replacement may be reasonable, but the charging system should be tested before replacement.";
      questions = [
        "What was the charging voltage with the engine running?",
        "Was the battery tested separately?",
        "Were the belt and tensioner inspected?"
      ];
    } else if (normalized.includes("catalytic")) {
      message = "A catalytic-converter code does not always prove the converter itself has failed. Exhaust leaks, misfires, and mixture problems should be ruled out first.";
      questions = [
        "Were exhaust leaks checked?",
        "Are there any misfire or fuel-trim codes?",
        "What test confirmed converter efficiency?"
      ];
    }

    setReview({
      vehicle: String(data.get("vehicle") || ""),
      repair,
      cost: String(data.get("cost") || ""),
      message,
      questions
    });
  }

  return (
    <main className="shell">
      <div className="card">
        <h1>Repair estimate review</h1>
        <p className="muted">Enter what the shop recommended. AutoAdvocate will help you ask for evidence before approving it.</p>

        <form className="form" onSubmit={analyze}>
          <label>Vehicle<input name="vehicle" required placeholder="2015 Ford F-150" /></label>
          <label>Recommended repair<input name="repair" required placeholder="Replace alternator" /></label>
          <label>Quoted price<input name="cost" required placeholder="$1,200" /></label>
          <button className="btn" type="submit">Review repair</button>
        </form>

        {review && (
          <div className="result">
            <span className="badge warning">Second opinion</span>
            <h2>{review.repair}</h2>
            <p><strong>Vehicle:</strong> {review.vehicle}<br /><strong>Quoted price:</strong> {review.cost}</p>
            <p>{review.message}</p>
            <h3>Questions to ask the shop</h3>
            <ul>{review.questions.map(q => <li key={q}>{q}</li>)}</ul>
            <p><strong>Do not approve a repair solely because a code named a related component.</strong></p>
          </div>
        )}
      </div>
    </main>
  );
}
