import Link from "next/link";
import { navigation } from "@/content/site-content";

export function SiteHeader() {
  return <header className="site-header"><div className="shell nav-wrap"><Link className="wordmark" href="/" aria-label="Jason Pollard, home"><span>JP</span> Jason Pollard</Link><nav aria-label="Primary navigation"><ul>{navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav></div></header>;
}
