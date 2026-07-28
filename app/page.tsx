import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="eyebrow">AI-Powered Repair Estimate Analysis</div>
         <h1>Don't Approve Your Repair Until You Understand It.</h1> 
          <p>
         AutoAdvocate uses AI to explain repair estimates, diagnose trouble codes, and help you determine whether a repair recommendation is reasonable before you spend your money.   
          </p>
          <div className="actions">
         <Link className="btn" href="/analyze">
    Analyze My Repair
</Link>

<Link className="btn secondary" href="/diagnosis">
    Check Engine Code
</Link>  
          </div>
        </div>
      </section>

      
    <section className="shell" style={{ marginTop: "80px", marginBottom: "80px" }}>
  <h2 style={{ textAlign: "center", marginBottom: "12px" }}>
    How AutoAdvocate Works
  </h2>

  <p
    className="muted"
    style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 50px" }}
  >
    Get a second opinion before approving an expensive repair in just three simple steps.
  </p>

  <div className="grid">
    <div className="card">
      <h3>📄 Upload Your Estimate</h3>
      <p className="muted">
        Upload a repair estimate or enter your vehicle information to begin the analysis.
      </p>
    </div>

    <div className="card">
      <h3>🤖 AI Reviews Everything</h3>
      <p className="muted">
        AutoAdvocate analyzes parts, labor, diagnostic trouble codes, and repair recommendations.
      </p>
    </div>

    <div className="card">
      <h3>✅ Make an Informed Decision</h3>
      <p className="muted">
        Receive a clear report, fairness score, confidence rating, and suggested questions to ask before approving repairs.
      </p>
    </div>
  </div>
</section>  
<section
  className="shell"
  style={{
    marginBottom: "80px",
    textAlign: "center",
  }}
>
  <h2>Why Drivers Trust AutoAdvocate</h2>

  <p
    className="muted"
    style={{
      maxWidth: "800px",
      margin: "20px auto 50px",
    }}
  >
    AutoAdvocate is designed to help everyday drivers better understand
    expensive repair recommendations. We don't sell repairs or recommend
    repair shops—we simply explain the information so you can make a more
    informed decision.
  </p>

  <div className="grid">
    <div className="card">
      <h3>🔍 Transparent AI Analysis</h3>
      <p className="muted">
        Understand what your mechanic is recommending in plain English.
      </p>
    </div>

    <div className="card">
      <h3>💲 Fairness Score</h3>
      <p className="muted">
        Compare repair recommendations with common industry expectations.
      </p>
    </div>

    <div className="card">
      <h3>🛡️ Built for Consumers</h3>
      <p className="muted">
        AutoAdvocate exists to help drivers ask better questions before
        spending their money.
      </p>
    </div>
  </div>
</section>
<main className="shell" style={{ marginBottom: "80px" }}>
  <div style={{ textAlign: "center", marginBottom: "40px" }}>
    <h2>Everything You Need to Understand Your Repair</h2>

    <p
      className="muted"
      style={{
        maxWidth: "760px",
        margin: "16px auto 0",
      }}
    >
      Whether you have a check engine light, a repair estimate, or simply want
      a second opinion, AutoAdvocate gives you the tools to make a more
      informed decision.
    </p>
  </div>

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
<div className="card">
  <h2>📄 Scan My Repair Estimate</h2>

  <p className="muted">
    Upload a photo or PDF of your repair estimate and let AutoAdvocate review it.
  </p>

  <Link className="btn" href="/scan">
    Scan Estimate
  </Link>
</div>
        </div>
      </main>
    </>
  );
}
