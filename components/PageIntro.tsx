export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="page-intro shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="lede">{children}</div></section>;
}
