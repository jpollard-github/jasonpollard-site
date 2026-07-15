import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { caseStudies } from "@/content/site-content";

export const metadata: Metadata = { title: "Selected Work", description: "Public-safe engineering outcomes across security, performance, modernization, and operations.", alternates: { canonical: "/work" } };
export default function WorkPage() { return <><PageIntro eyebrow="Selected work" title="Difficult systems, improved in concrete ways."><p>These examples focus on the situation, the engineering approach, and the defensible result. Details stay general where the work was internal.</p></PageIntro><div className="case-list shell">{caseStudies.map((study, i) => <article className="case-study" key={study.title}><header><span>{String(i + 1).padStart(2, "0")}</span><h2>{study.title}</h2></header><dl><div><dt>Situation</dt><dd>{study.situation}</dd></div><div><dt>Approach</dt><dd>{study.approach}</dd></div><div><dt>Result</dt><dd>{study.result}</dd></div></dl><ul className="tags" aria-label="Technologies and practices">{study.practices.map((p) => <li key={p}>{p}</li>)}</ul></article>)}</div></>; }
