import Link from "next/link";

export const metadata = {
  title: "Can I Drive With the Battery Light On? | AutoAdvocate",
  description:
    "Learn whether you can drive with the battery light on, what the warning may mean, and what you should do before your vehicle loses power.",
};

export default function CanIDriveWithBatteryLightPage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Can I Drive With the Battery Light On?</h1>

        <p>
          If your battery warning light comes on while driving, it does not
          necessarily mean that the battery itself is bad. It usually means
          there may be a problem with the vehicle&apos;s charging system.
        </p>

        <p>
          Your vehicle may continue running temporarily using stored battery
          power, but it could eventually lose electrical power and shut off.
        </p>

        <h2>How Long Can You Drive With the Battery Light On?</h2>

        <p>
          There is no reliable amount of time or distance you can safely count
          on. How long the vehicle continues running depends on the cause of the
          warning and how much battery power remains.
        </p>

        <p>
          If the battery light stays on while the engine is running, avoid
          unnecessary driving and have the charging system inspected as soon as
          possible.
        </p>

        <h2>What Can Cause the Battery Light to Come On?</h2>

        <p>
          Possible causes include an alternator problem, a loose or damaged
          drive belt, poor battery connections, damaged wiring, a weak battery,
          or another charging-system problem.
        </p>

        <h2>When Should You Stop Driving?</h2>

        <p>
          If you notice additional warning lights, dimming headlights, loss of
          electrical accessories, unusual noises, overheating, or changes in
          steering effort, get to a safe location and stop driving.
        </p>

        <h2>What Should You Do Next?</h2>

        <p>
          Have the battery and charging system tested so you can identify why
          the warning light came on before the vehicle leaves you stranded.
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