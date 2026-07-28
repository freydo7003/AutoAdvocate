import Link from "next/link";

export default function Nav() {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link className="brand" href="/">AutoAdvocate</Link>
        <Link className="nav-link" href="/">Home</Link>
        <Link className="nav-link" href="/analyze">Analyze Repair</Link>
        <Link className="nav-link" href="/diagnosis">Engine Codes</Link>
        <Link className="nav-link" href="/vehicle">My Garage</Link>
      </div>
    </nav>
  );
}
