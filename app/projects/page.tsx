import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { projects } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Independent Projects",
  description: "Independent projects in local data analysis, developer tooling, and full-stack TypeScript application development.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro eyebrow="Independent projects" title="Curiosity, turned into working systems.">
        <p>Selected projects spanning data pipelines, developer tooling, full-stack application architecture, and deliberate use of AI.</p>
      </PageIntro>
      <div className="projects shell">
        {projects.map((project, index) => (
          <article className="project" key={project.name}>
            <div className="project-index">P-{String(index + 1).padStart(2, "0")}</div>
            <div className={`project-body ${project.primaryImage ? "project-body-with-image" : "project-body-text"}`}>
              <div className="project-copy">
                <p className="eyebrow">{project.label}</p>
                <h2>{project.name}</h2>
                <p className="project-description">{project.description}</p>
                <ul>
                  {project.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a className="text-link" href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
              {project.primaryImage ? (
                <div className="project-visual">
                  <Image
                    className="project-image"
                    src={project.primaryImage.src}
                    width={project.primaryImage.width}
                    height={project.primaryImage.height}
                    sizes="(max-width: 960px) calc(100vw - 48px), 50vw"
                    alt={project.primaryImage.alt}
                    unoptimized
                  />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
