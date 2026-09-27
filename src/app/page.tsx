import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { work, education } from "@/content/experience";
import { projects } from "@/content/projects";
import { games } from "@/content/games";
import { certifications } from "@/content/certifications";
import { getAllPosts, MIN_POSTS } from "@/lib/posts";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/home/Hero";
import { Bento } from "@/components/home/Bento";
import { Experience } from "@/components/home/Experience";
import { Skills } from "@/components/home/Skills";
import { ProjectGrid } from "@/components/home/Projects";
import { Arcade } from "@/components/home/Arcade";
import { Certifications } from "@/components/home/Certifications";
import { OffTheClock } from "@/components/home/OffTheClock";
import { PostList } from "@/components/home/Writing";
import { Contact } from "@/components/home/Contact";

function ViewAll({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent">
      {label}
      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

type SectionDef = Omit<React.ComponentProps<typeof Section>, "index">;

export default async function Home() {
  const posts = await getAllPosts();
  const sections: (SectionDef | false)[] = [
    {
      id: "experience",
      eyebrow: "experience",
      title: "Where I've worked",
      children: <Experience work={work} education={education} />,
    },
    {
      id: "skills",
      eyebrow: "skills",
      title: "What I work with",
      children: <Skills />,
    },
    {
      id: "projects",
      eyebrow: "projects",
      title: "Things I've built",
      description: "Side projects from over the years. Work projects at Amazon are internal, so they live in the experience section.",
      action: <ViewAll href="/projects" label="all projects" />,
      children: <ProjectGrid items={projects.filter((p) => p.featured).slice(0, 4)} />,
    },
    {
      id: "arcade",
      eyebrow: "arcade",
      title: "Insert coin",
      description: "Small games I built for fun. They run right here in your browser.",
      action: <ViewAll href="/games" label="all games" />,
      children: <Arcade games={games} />,
    },
    {
      id: "certifications",
      eyebrow: "certifications",
      title: "Certifications & awards",
      children: <Certifications items={certifications} />,
    },
    {
      id: "off-the-clock",
      eyebrow: "off the clock",
      title: "When I'm not coding",
      children: <OffTheClock />,
    },
    posts.length >= MIN_POSTS && {
      id: "writing",
      eyebrow: "writing",
      title: "Notes & write-ups",
      action: <ViewAll href="/blog" label="all posts" />,
      children: <PostList posts={posts.slice(0, 3)} />,
    },
    {
      id: "contact",
      eyebrow: "contact",
      title: "Let's connect",
      children: <Contact />,
    },
  ];

  return (
    <>
      <Hero />
      <Bento />
      {sections
        .filter((s): s is SectionDef => Boolean(s))
        .map((s, i) => (
          <Section key={s.id} index={i + 1} {...s} />
        ))}
    </>
  );
}
