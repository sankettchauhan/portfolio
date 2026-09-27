import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectFilter } from "@/components/projects/ProjectFilter";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects: full-stack apps, UI experiments and API mashups.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        path="projects"
        title="Things I've built"
        description="Side projects from over the years. Work at Amazon is internal, so it lives on the homepage under experience."
      />
      <Container size="wide" className="pb-20">
        <ProjectFilter projects={projects} />
      </Container>
    </>
  );
}
