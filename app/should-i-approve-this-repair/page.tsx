import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Should I Approve This Car Repair? | AutoAdvocate",
  description:
    "Learn what to check before approving a car repair, when to ask for more testing, and how AutoAdvocate can help you understand the recommendation.",
};

export default function ShouldIApproveThisCarRepairPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Should I Approve This Car Repair?</h1>

        <p>
          Before approving a repair, it helps to understand why the work is
          being recommended, what testing supports the diagnosis, and whether
          the repair is urgent.
        </p>

        <p>
          A repair recommendation can be reasonable even when it is expensive,
          but you should still understand what evidence supports the diagnosis
          before spending your money.
        </p>

        <h2>Questions to Ask Before Approving a Repair</h2>

        <ul>
          <li>What testing confirmed the diagnosis?</li>
          <li>Is the recommended repair necessary now, or can it wait?</li>
          <li>What could happen if I delay the repair?</li>
          <li>Are there other possible causes of the problem?</li>
          <li>Can you show me an itemized parts and labor estimate?</li>
          <li>What warranty is included on the repair?</li>
        </ul>

        <h2>When You Should Ask for More Testing</h2>

        <p>
          More testing may be worth requesting when a shop recommends replacing
          an expensive component based only on a trouble code, when several
          major parts are being replaced at once, or when the explanation does
          not clearly match the symptoms you are experiencing.
        </p>

        <h2>When the Repair May Be Urgent</h2>

        <p>
          Repairs involving braking, steering, severe overheating, major fluid
          leaks, or conditions that could leave you stranded may require prompt
          attention. Ask the shop to explain the specific risk if you delay the
          repair.
        </p>

        <h2>Not Sure Whether to Approve the Repair?</h2>

        <p>
          AutoAdvocate can compare your vehicle symptoms, trouble code, and the
          shop's recommendation to help you understand whether the repair
          appears reasonable and what questions you may want to ask next.
        </p>

        <Link href="/analyze" className="btn">
          Analyze My Repair
        </Link>

        <h2>Related Car Repair Guides</h2>

        <ul>
          <li>
            <Link href="/car-repair-estimate-too-high">
              Is My Car Repair Estimate Too High?
            </Link>
          </li>

          <li>
            <Link href="/should-i-get-second-opinion-car-repair">
              Should I Get a Second Opinion on a Car Repair?
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}