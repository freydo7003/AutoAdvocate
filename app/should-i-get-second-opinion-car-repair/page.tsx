import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Should I Get a Second Opinion on a Car Repair? | AutoAdvocate",
  description:
    "Learn when it makes sense to get a second opinion on a car repair, what warning signs to look for, and what to ask before approving expensive repairs.",
};

export default function SecondOpinionCarRepairPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Should I Get a Second Opinion on a Car Repair?</h1>

        <p>
          Getting a second opinion can be a smart decision when a repair is
          expensive, the diagnosis is unclear, or you are uncomfortable with
          the explanation you received from the repair shop.
        </p>

        <p>
          A second opinion does not automatically mean the first shop is wrong.
          It gives you another opportunity to understand the problem, compare
          recommendations, and make a more informed decision.
        </p>

        <h2>When a Second Opinion May Be Worth It</h2>

        <ul>
          <li>The repair estimate is much higher than you expected.</li>
          <li>Several expensive parts are being replaced at the same time.</li>
          <li>The shop cannot clearly explain what testing confirmed the problem.</li>
          <li>The recommended repair does not seem related to your original symptoms.</li>
          <li>You are being pressured to approve expensive work immediately.</li>
          <li>You received different diagnoses from different repair shops.</li>
        </ul>

        <h2>When You May Need to Act Quickly</h2>

        <p>
          Some vehicle problems can create an immediate safety risk or cause
          additional damage if you continue driving. Problems involving brakes,
          steering, severe overheating, major fluid loss, or other serious
          symptoms may require prompt attention.
        </p>

        <p>
          If you are unsure whether the vehicle is safe to drive, ask the repair
          shop to explain the specific risk before moving the vehicle or delaying
          the repair.
        </p>

        <h2>What to Ask the First Repair Shop</h2>

        <ul>
          <li>What testing confirmed the diagnosis?</li>
          <li>Can you show me the failed or damaged component?</li>
          <li>Which repairs are necessary now and which can wait?</li>
          <li>Are there less expensive repair options?</li>
          <li>What happens if I delay this repair?</li>
          <li>Can I have a written, itemized estimate?</li>
        </ul>

        <h2>What to Bring for a Second Opinion</h2>

        <p>
          Bring the original repair estimate, information about your vehicle,
          and a description of the symptoms you have experienced. If you have
          diagnostic trouble codes or previous repair records, those can also
          help the second shop understand the situation.
        </p>

        <h2>Review Your Estimate Before You Decide</h2>

        <p>
          If you already have a repair estimate, AutoAdvocate can help explain
          the recommended work, costs, concerns, and questions you may want to
          ask before approving the repair or seeking another opinion.
        </p>

        <Link href="/scan" className="btn">
          Scan My Repair Estimate
        </Link>
       <h2>Related Car Repair Guides</h2>

<ul>
  <li>
    <Link href="/car-repair-estimate-too-high">
      Is My Car Repair Estimate Too High?
    </Link>
  </li>

  <li>
    <Link href="/how-to-read-car-repair-estimate">
      How to Read a Car Repair Estimate
    </Link>
  </li>
</ul> 
      </div>
    </main>
  );
}