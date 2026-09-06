import Link from "next/link";

export const metadata = {
  title: "How Long Can You Drive With a Check Engine Light On? | AutoAdvocate",
  description:
    "Learn how long you can drive with the check engine light on, when it may be safe to continue driving, and when you should stop immediately.",
};

export default function HowLongCheckEngineLightPage() {
  return (
    <main className="container">
      <section className="card">
        <h1>How Long Can You Drive With the Check Engine Light On?</h1>

        <p>
          There is no single number of miles or amount of time that is safe for
          every check engine light. How long you can continue driving depends
          on why the light came on and whether it is steady or flashing.
        </p>

        <h2>Can You Keep Driving With a Steady Check Engine Light?</h2>

        <p>
          If the check engine light is steady and the vehicle is driving
          normally, you may be able to continue driving for a limited time.
          However, you should have the vehicle diagnosed soon instead of
          ignoring the warning.
        </p>

        <p>
          Pay attention to changes such as rough running, loss of power,
          unusual noises, smoke, overheating, or additional warning lights.
          Those symptoms can indicate a more serious problem.
        </p>

        <h2>What If the Check Engine Light Is Flashing?</h2>

        <p>
          A flashing check engine light is more urgent. It can indicate a
          serious problem such as a severe engine misfire that may damage the
          catalytic converter or other components.
        </p>

        <p>
          If the light is flashing, especially if the engine is shaking,
          running poorly, or losing power, get to a safe location and stop
          driving.
        </p>

        <h2>How Many Miles Can You Drive?</h2>

        <p>
          There is no reliable mileage limit. One vehicle may continue driving
          normally with a minor problem, while another may have an issue that
          requires immediate attention. The warning light alone cannot tell you
          how many miles are safe.
        </p>

        <h2>What Should You Do Next?</h2>

        <p>
          Have the vehicle scanned for diagnostic trouble codes. Those codes
          can help identify which system detected a problem, but they do not
          always tell you exactly which part needs to be replaced.
        </p>

        <h2>Already Know the Trouble Code?</h2>

        <p>
          If you have a check engine code, symptoms, or a mechanic&apos;s
          diagnosis, AutoAdvocate can help you understand the problem and the
          recommended repair.
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