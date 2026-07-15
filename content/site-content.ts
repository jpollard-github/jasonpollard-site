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

export const projects = [
  {
    name: "BrandKit",
    label: "Independent engineering project · Case study in progress",
    description: "A source-driven TypeScript and Node.js system for producing consistent brand assets from version-controlled configuration.",
    details: ["Reusable brand configuration and theme guardrails", "More than 20 generator families", "PNG, PDF, and HTML outputs", "Validation scripts, verification workflows, and review packets", "AI-assisted product design, implementation, visual iteration, and documentation"],
    href: null,
  },
  {
    name: "ArcadeGhosts",
    label: "Independent engineering project · Deployed application",
    description: "A TypeScript and Next.js application with a custom visual system, administrative workflows, and database-backed content.",
    details: ["Neon Postgres content storage", "Vercel Blob media storage", "Administrative interface", "Custom visual design", "AI-assisted product iteration"],
    href: "https://arcadeghosts.org",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
