import Link from "next/link";
export default function NotFound() { return <section className="not-found shell"><p className="eyebrow">404 · Missing route</p><h1>This path doesn’t lead anywhere useful.</h1><p>The system is working; this address is not.</p><Link className="button primary" href="/">Return home</Link></section>; }
