import Link from "next/link";
import { navigation, siteConfig } from "@/content/site-content";

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><p className="eyebrow">Start a conversation</p><h2>Looking for an engineer who stays close to the work?</h2><a className="text-link" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div><div><nav aria-label="Footer navigation"><ul>{navigation.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></nav><p className="fine-print">© {new Date().getFullYear()} Jason Pollard. Built with restraint and checked by humans.</p></div></div></footer>;
}
