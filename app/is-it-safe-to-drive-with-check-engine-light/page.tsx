import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is It Safe to Drive With a Check Engine Light? | AutoAdvocate",
  description:
    "Learn when a check engine light may be safe to drive with, when to stop driving, and how AutoAdvocate can help you understand the warning before approving repairs.",
};

export default function SafeToDriveWithCheckEngineLightPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Is It Safe to Drive With a Check Engine Light?</h1>

        <p>
          A check engine light can mean anything from a minor emissions issue
          to a problem that could damage the engine or leave you stranded.
        </p>

        <p>
          The safest decision depends on how the vehicle is driving, whether
          the light is steady or flashing, and what symptoms are happening at
          the same time.
        </p>

        <h2>When You May Be Able to Keep Driving</h2>

        <p>
          If the check engine light is steady, the vehicle is driving normally,
          and there are no serious symptoms, a short trip may be reasonable
          while you arrange an inspection.
        </p>

        <p>
          Even then, the warning should not be ignored. A diagnostic trouble
          code can help identify what system the vehicle computer detected.
        </p>

        <h2>When You Should Stop Driving</h2>

        <ul>
          <li>The check engine light is flashing.</li>
          <li>The engine is shaking or misfiring badly.</li>
          <li>The vehicle is overheating.</li>
          <li>You notice a major loss of power.</li>
          <li>There is heavy smoke or a strong burning smell.</li>
          <li>Oil pressure or temperature warning lights are also on.</li>
        </ul>

        <h2>Why a Trouble Code Does Not Always Identify the Failed Part</h2>

        <p>
          A trouble code tells you what condition or system the vehicle
          computer detected. It does not always prove that one specific part
          has failed.
        </p>

        <p>
          Multiple problems can sometimes trigger the same code, which is why
          testing is often needed before replacing expensive components.
        </p>

        <h2>Questions to Ask the Repair Shop</h2>

        <ul>
          <li>What trouble code was found?</li>
          <li>What testing was performed after reading the code?</li>
          <li>Is the vehicle safe to drive until the repair is completed?</li>
          <li>What could happen if I delay the repair?</li>
          <li>What evidence confirms the recommended part has failed?</li>
        </ul>

        <h2>Understand the Problem Before You Approve a Repair</h2>

        <p>
          AutoAdvocate can compare your vehicle symptoms, trouble code, and the
          repair shop's recommendation to help explain the problem in plain
          English and identify questions you may want to ask before spending
          money.
        </p>

        <Link href="/analyze" className="btn">
          Analyze My Repair
        </Link>

        <h2>Related Car Repair Guides</h2>

        <ul>
          <li>
            <Link href="/should-i-approve-this-car-repair">
              Should I Approve This Car Repair?
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