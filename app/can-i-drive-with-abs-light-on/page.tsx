import Link from "next/link";

export const metadata = {
  title: "Can I Drive With the ABS Light On? | AutoAdvocate",
  description:
    "Learn whether it is safe to drive with the ABS light on, what the warning may mean, and when you should stop driving and get your vehicle checked.",
};

export default function CanIDriveWithABSPage() {
  return (
    <main className="container">
      <section className="card">
        <h1>Can I Drive With the ABS Light On?</h1>

        <p>
          If your ABS light comes on, your regular brakes may still work, but
          the anti-lock braking system may not be available when you need it.
        </p>

        <p>
          That can matter most during hard braking, slippery roads, rain, snow,
          or emergency stops.
        </p>

        <h2>Is It Safe to Keep Driving?</h2>

        <p>
          If the ABS light is the only warning light on and the vehicle feels
          normal when braking, you may be able to drive carefully for a short
          distance to have the problem inspected.
        </p>

        <p>
          If the ABS light appears together with the red brake warning light,
          the brake pedal feels unusual, braking performance changes, or you
          hear grinding or other abnormal noises, stop driving and have the
          vehicle inspected as soon as possible.
        </p>

        <h2>What Can Cause the ABS Light to Come On?</h2>

        <p>
          Common causes can include a failed wheel speed sensor, damaged wiring,
          low brake fluid, a problem with the ABS module, or another issue in
          the braking system.
        </p>

        <h2>What Should You Do Next?</h2>

        <p>
          Do not ignore the warning. Have the ABS system scanned for trouble
          codes so you can understand what triggered the light and whether the
          repair is urgent.
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