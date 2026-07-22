import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">Your car repair advocate</div>
          <h1>Your Car's Best Advocate</h1>
          <p>
            AutoAdvocate explains trouble codes, reviews repair recommendations,
            and helps everyday car owners ask the right questions before approving expensive work.
          </p>
          <div className="actions">
            <Link className="btn" href="/dashboard">Open dashboard</Link>
            <Link className="btn secondary" href="/diagnosis">Check an engine code</Link>
          </div>
        </div>
      </section>

      <main className="shell">
        <div className="grid">
          <div className="card">
            <h2>Understand the code</h2>
            <p className="muted">See what the computer detected, likely causes, and the next test to perform.</p>
            <Link className="btn" href="/diagnosis">Analyze code</Link>
          </div>
          <div className="card">
            <h2>Review the estimate</h2>
            <p className="muted">Learn what should be proven before you approve a recommended repair.</p>
            <Link className="btn" href="/estimate">Review repair</Link>
          </div>
          <div className="card">
            <h2>Save your vehicle</h2>
            <p className="muted">Create a vehicle profile so future guidance can become model-specific.</p>
            <Link className="btn" href="/vehicle">Add vehicle</Link>
          </div>
          <div className="card">
  <h2>Analyze My Repair</h2>
  <p className="muted">
    Compare your symptoms, trouble code, and the repair shop's recommendation.
  </p>
  <Link className="btn" href="/analyze">
    Analyze repair
  </Link>
</div>
        </div>
      </main>
    </>
  );
}
