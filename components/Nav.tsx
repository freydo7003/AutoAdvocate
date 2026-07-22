import Link from "next/link";

export default function Nav() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link className="brand" href="/">AutoAdvocate</Link>
        <Link className="nav-link" href="/dashboard">Dashboard</Link>
        <Link className="nav-link" href="/vehicle">My Vehicle</Link>
        <Link className="nav-link" href="/diagnosis">Diagnostics</Link>
        <Link className="nav-link" href="/estimate">Repair Review</Link>
      </div>
    </nav>
  );
}
