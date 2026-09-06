import Link from "next/link";

export const metadata = {
  title: "Can I Drive With the Oil Pressure Light On? | AutoAdvocate",
  description:
    "Learn whether it is safe to drive with the oil pressure light on, what the warning may mean, and why you should take an oil pressure warning seriously.",
};

export default function CanIDriveWithOilPressureLightPage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Can I Drive With the Oil Pressure Light On?</h1>

        <p>
          If your oil pressure warning light comes on while driving, you should
          take it seriously. Low oil pressure can prevent the engine from
          receiving the lubrication it needs and may lead to severe engine
          damage.
        </p>

        <h2>Should You Keep Driving?</h2>

        <p>
          If the oil pressure light stays on while the engine is running, get
          to a safe location and shut the engine off as soon as you safely can.
          Continuing to drive could cause expensive engine damage.
        </p>

        <p>
          Do not assume that adding oil will always solve the problem. Low oil
          level is one possible cause, but the warning can also indicate a
          problem with the oil pressure system.
        </p>

        <h2>What Can Cause the Oil Pressure Light to Come On?</h2>

        <p>
          Possible causes include a low engine oil level, an oil leak, an oil
          pump problem, a faulty oil pressure sensor, a clogged oil passage or
          filter, or internal engine wear.
        </p>

        <h2>What Should You Do?</h2>

        <p>
          Once you are safely stopped and the engine is off, check the engine
          oil level if you know how to do so safely. If the level is low, the
          vehicle may need oil, but the reason for the low level should still
          be investigated.
        </p>

        <p>
          If the oil level is normal or the warning remains on after the proper
          oil level is restored, avoid running the engine until the cause can
          be diagnosed.
        </p>

        <h2>Need Help Understanding the Problem?</h2>

        <p>
          If a repair shop has diagnosed the vehicle or given you a repair
          recommendation, AutoAdvocate can help you understand what the repair
          means before you make a decision.
        </p>

        <div style={{ marginTop: "24px" }}>
          <Link href="/analyze" className="btn">
            Analyze My Repair
          </Link>
        </div>
      </section>
    </main>
  );
}