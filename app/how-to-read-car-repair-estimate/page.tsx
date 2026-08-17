import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Read a Car Repair Estimate | AutoAdvocate",
  description:
    "Learn how to understand parts, labor, diagnostic fees, shop supplies, taxes, and repair recommendations on a car repair estimate before approving the work.",
};

export default function HowToReadCarRepairEstimatePage() {
  return (
    <main className="container">
      <div className="card">
        <h1>How to Read a Car Repair Estimate</h1>

        <p>
          Car repair estimates can be confusing because they often include
          technical terms, labor charges, parts prices, fees, and repair
          recommendations all in one document.
        </p>

        <p>
          Understanding what each section means can help you ask better
          questions and make a more informed decision before approving repairs.
        </p>

        <h2>Parts</h2>

        <p>
          Parts charges cover the components the shop plans to replace. Check
          whether the estimate identifies the part clearly and whether it says
          if the part is OEM, aftermarket, new, remanufactured, or used.
        </p>

        <h2>Labor</h2>

        <p>
          Labor charges usually reflect the amount of time needed to diagnose
          or repair the vehicle multiplied by the shop's labor rate. Some
          estimates show the labor hours and rate separately, while others only
          show the final labor charge.
        </p>

        <h2>Diagnostic Fees</h2>

        <p>
          A diagnostic fee pays for the time spent testing the vehicle and
          identifying the cause of the problem. A trouble code by itself does
          not always prove that a particular part has failed.
        </p>

        <h2>Shop Supplies and Fees</h2>

        <p>
          Shops may charge for supplies such as cleaners, lubricants, disposal,
          or other materials used during the repair. These charges should be
          clearly listed and explained.
        </p>

        <h2>Taxes</h2>

        <p>
          Taxes may apply to parts, labor, or both depending on local laws.
          Make sure the final total includes any taxes and additional fees you
          may be expected to pay.
        </p>

        <h2>Repair Recommendations</h2>

        <p>
          A repair recommendation should make sense based on the symptoms,
          inspection, test results, and condition of the vehicle. If an
          expensive part is being replaced, ask what testing confirmed that
          the part actually failed.
        </p>

        <h2>Questions to Ask the Repair Shop</h2>

        <ul>
          <li>What testing confirmed this repair is needed?</li>
          <li>Can you explain the parts and labor charges?</li>
          <li>Are the replacement parts OEM or aftermarket?</li>
          <li>What warranty is included?</li>
          <li>Will you contact me before increasing the estimate?</li>
        </ul>

        <h2>Still Confused by Your Estimate?</h2>

        <p>
          AutoAdvocate can review a photo or screenshot of your repair estimate
          and explain the charges, concerns, and questions you may want to ask
          before approving the work.
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
    <Link href="/should-i-get-second-opinion-car-repair">
      Should I Get a Second Opinion on a Car Repair?
    </Link>
  </li>
</ul>
      </div>
    </main>
  );
}