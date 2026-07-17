export const siteConfig = {
  name: "Jason Pollard",
  title: "Jason Pollard — Staff / Principal Software Engineer",
  description: "Staff-level software engineer and solutions architect modernizing difficult systems and applying AI with engineering judgment.",
  url: "https://jasonpollard.com",
  email: "hello@jasonpollard.com",
  location: "Remote, U.S.",
  resumeUrl: "/Jason-Pollard-Resume.pdf" as string | null,
};

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/ai-engineering", label: "AI Engineering" },
  { href: "/projects", label: "Projects" },
] as const;

export const capabilities = [
  { title: "Modernize difficult systems", text: "Untangle legacy constraints, migration risk, reliability problems, and platform dependencies without losing sight of delivery." },
  { title: "Lead hands-on delivery", text: "Set technical direction, turn ambiguity into workable increments, and stay close to implementation, testing, and operations." },
  { title: "Apply AI with engineering judgment", text: "Use AI to accelerate inspection, implementation, validation, and documentation—then review the result like production work." },
] as const;

export const evidence = [
  { value: "15", label: "repositories plus related container images cleared of all critical findings reported by the organization’s security platform" },
  { value: "22 → 14", label: "hours for a bulk-processing workflow after targeted performance and reliability work" },
  { value: "2", label: "large projects supported by AI-assisted, human-validated operational runbooks" },
  { value: "30 → 1", label: "unstable VB6 applications replaced by one .NET Windows Service, eliminating recurring server crashes" },
] as const;

export const workPrinciples = ["Clarify ambiguous work", "Decompose risk", "Validate assumptions", "Implement incrementally", "Test and review", "Document operational reality"] as const;

export const caseStudies = [
  {
    title: "Security and cloud remediation",
    situation: "Critical and high-severity findings spanned 15 repositories, related Azure Container Registry images, and virtual-machine maintenance.",
    approach: "Coordinated remediation across application and container dependencies, reduced repeat work, and automated Azure virtual-machine update workflows.",
    result: "Eliminated every critical finding reported by the organization’s security platform and reduced high-severity findings.",
    practices: ["Security remediation", "Azure", "Container images", "Infrastructure automation"],
  },
  {
    title: "Performance and reliability",
    situation: "A large monolithic application had a bulk-processing workflow that required 22 hours and broader performance concerns.",
    approach: "Used profiling, tracing, compression, optimized code paths, distributed messaging, caching, and purpose-built performance tests.",
    result: "Reduced bulk-processing time from 22 hours to 14 hours and strengthened the team’s ability to diagnose performance behavior.",
    practices: ["Profiling and tracing", "Distributed messaging", "Caching", "Performance testing"],
  },
  {
    title: "Platform modernization and delivery",
    situation: "Teams needed to move source control, applications, and delivery workflows away from aging or retiring platforms.",
    approach: "Led and implemented cross-team migrations including GitHub Enterprise Server to Cloud and on-premises workloads to Azure, with CI/CD, Kubernetes/OpenShift, Terraform, deprecation, and decommissioning work.",
    result: "Moved complex systems and delivery paths forward while coordinating application, infrastructure, security, and operational dependencies.",
    practices: ["GitHub", "CI/CD", "Azure", "Kubernetes / OpenShift", "Terraform"],
  },
  {
    title: "Operational knowledge that survives delivery",
    situation: "Two large projects needed practical runbooks grounded in both repository evidence and real operational knowledge.",
    approach: "Used AI to inspect repositories and draft material, then validated it against source documentation, system behavior, and human operational knowledge.",
    result: "Produced operational runbooks for both projects without treating generated documentation as authoritative by default.",
    practices: ["Repository analysis", "Runbooks", "Human validation", "Operational readiness"],
  },
] as const;

export const aiUses = ["Codebase inspection", "Story decomposition", "API-contract and data-path validation", "Feature-flagged spikes", "Security remediation", "Infrastructure automation", "Runbook and documentation generation"] as const;
export const aiWorkflow = ["Inspect the relevant context", "State assumptions and open questions", "Decompose the work and its risk", "Generate or modify code", "Test behavior", "Inspect dependencies", "Review security and standards", "Assess maintainability and architectural fit", "Document changes and remaining uncertainty"] as const;

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  name: string;
  label: string;
  description: string;
  details: readonly string[];
  href: string;
  linkLabel: string;
  primaryImage?: ProjectImage;
};

export const projects: readonly Project[] = [
  {
    name: "ArcadeGhosts",
    label: "Independent engineering project · Deployed application",
    description: "A TypeScript and Next.js application with a custom visual system, administrative workflows, database-backed content, and AI-assisted product iteration.",
    details: ["Neon Postgres content storage", "Vercel Blob media storage", "Administrative interface", "Custom visual design", "AI-assisted product iteration"],
    href: "https://arcadeghosts.org",
    linkLabel: "Visit arcadeghosts.org",
    primaryImage: {
      src: "/projects/arcadeghosts/home.png",
      width: 1440,
      height: 900,
      alt: "ArcadeGhosts homepage with a neon roadside scene and personal site introduction",
    },
  },
  {
    name: "Spotify History Analyzer",
    label: "Independent engineering project · Local data pipeline",
    description: "A dependency-free local Node.js pipeline that validates and normalizes Spotify extended streaming-history exports, produces analytical datasets, and generates a static report while keeping personal source data local.",
    details: ["JSON Schema validation and normalized stream-event model", "Chunked JSON, NDJSON, rankings, trends, and SQL-ready output", "Optional cached Last.fm enrichment with graceful fallback", "Static report covering listening patterns, eras, repeat behavior, and mood signals", "Synthetic demo fixture, focused tests, and GitHub Actions CI"],
    href: "https://github.com/jpollard-github/spotify-history-analyzer",
    linkLabel: "View Spotify History Analyzer on GitHub",
  },
  {
    name: "Mood Switcher",
    label: "Independent engineering project · Packaged VS Code extension",
    description: "A configurable VS Code extension that adapts themes, workspace settings, commands, resources, and timed focus sessions to task-specific modes while preserving the user's prior workspace state.",
    details: ["Activity-bar sidebar and visual dashboard", "Configurable modes, editor settings, commands, resources, and rituals", "Session timers, weekly analytics, import/export, and recommendation ranking", "Project-memory discovery and safe workspace restoration", "Six focused unit tests, reproducible VSIX packaging, and GitHub Actions CI"],
    href: "https://github.com/jpollard-github/mood-switcher",
    linkLabel: "View Mood Switcher on GitHub",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
