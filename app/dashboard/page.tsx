import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "4rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <p style={{ fontWeight: 700, textTransform: "uppercase" }}>
          AutoAdvocate
        </p>

        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Know before you pay.
        </h1>

        <p style={{ fontSize: "1.2rem", lineHeight: 1.6 }}>
          Helping everyday drivers understand trouble codes, repair estimates,
          and the questions to ask before approving expensive repairs.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <Link href="/dashboard" style={cardStyle}>
          <h2>Dashboard</h2>
          <p>View your vehicle tools and recent activity.</p>
        </Link>

        <Link href="/diagnosis" style={cardStyle}>
          <h2>Look Up a Code</h2>
          <p>Enter an OBD-II code and understand what it may mean.</p>
        </Link>

        <Link href="/estimate" style={cardStyle}>
          <h2>Review an Estimate</h2>
          <p>Learn what questions to ask before approving a repair.</p>
        </Link>

        <Link href="/vehicle" style={cardStyle}>
          <h2>Your Vehicle</h2>
          <p>Add your vehicle information for more useful guidance.</p>
        </Link>
      </section>
    </main>
  );
}

const cardStyle = {
  display: "block",
  padding: "1.5rem",
  border: "1px solid #d8dde6",
  borderRadius: "16px",
  textDecoration: "none",
  color: "inherit",
  background: "white",
};
