import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is My Car Repair Estimate Too High? | AutoAdvocate",
  description:
    "Learn how to tell if a car repair estimate is too high, what charges to check, and when to get a second opinion before approving repairs.",
};

export default function CarRepairEstimateTooHighPage() {
  return (
    <main className="container">
      <div className="card">
        <h1>Is My Car Repair Estimate Too High?</h1>

        <p>
          Getting a large repair estimate can be stressful, especially when
          you don't know whether the recommended repairs or prices are
          reasonable.
        </p>

        <p>
          Before approving the work, there are several things you can check to
          better understand what you're being charged for.
        </p>

        <Link href="/scan" className="btn">
          Scan My Repair Estimate
         <h2>What to Check on a Repair Estimate</h2>

<ul>
  <li>
    <strong>Parts:</strong> Are the parts clearly listed, and does the estimate
    say whether they are OEM, aftermarket, new, or remanufactured?
  </li>
  <li>
    <strong>Labor:</strong> Does the estimate show labor charges or the number
    of hours being billed?
  </li>
  <li>
    <strong>Diagnostic fees:</strong> Are you being charged separately for
    testing or diagnosis?
  </li>
  <li>
    <strong>Taxes and shop fees:</strong> Are additional charges clearly
    explained?
  </li>
  <li>
    <strong>Repair justification:</strong> Did the shop explain what testing
    supports the recommended repair?
  </li>
</ul>

<h2>When Should You Get a Second Opinion?</h2>

<p>
  Consider getting a second opinion when the repair is expensive, the estimate
  recommends replacing several major parts at once, or the shop cannot clearly
  explain the testing that confirmed the diagnosis.
</p>

<h2>Questions to Ask Before Approving Repairs</h2>

<ul>
  <li>What test results confirmed this repair is needed?</li>
  <li>Can you show me an itemized parts and labor breakdown?</li>
  <li>Are the replacement parts OEM or aftermarket?</li>
  <li>What warranty is included on the parts and labor?</li>
  <li>Will you contact me before doing any work that increases the price?</li>
</ul>

<h2>Not Sure About Your Estimate?</h2>

<p>
  AutoAdvocate can review a photo or screenshot of your repair estimate and
  explain the charges, concerns, and questions you may want to ask before
  approving the work.
</p> 
        </Link>
     <h2>Related Car Repair Guides</h2>

<ul>
  <li>
    <Link href="/how-to-read-car-repair-estimate">
      How to Read a Car Repair Estimate
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