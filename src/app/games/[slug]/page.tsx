import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { games } from "@/content/games";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { GamePlayer } from "@/components/games/GamePlayer";

export const dynamicParams = false;

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

function findGame(slug: string) {
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();
  return game;
}

export async function generateMetadata({ params }: PageProps<"/games/[slug]">): Promise<Metadata> {
  const game = findGame((await params).slug);
  return { title: `Play ${game.title}`, description: `${game.tagline}, built with ${game.engine}. Playable in your browser.` };
}

export default async function GamePage({ params }: PageProps<"/games/[slug]">) {
  const game = findGame((await params).slug);
  const others = games.filter((g) => g.slug !== game.slug);

  return (
    <>
      <PageHeader path={`arcade/${game.slug}`} title={game.title} description={game.tagline} back={{ href: "/games", label: "arcade" }} />
      <Container size="wide" className="pb-20">
        <GamePlayer game={game} />

        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_18rem]">
          <section className="card p-5">
            <h2 className="eyebrow text-muted">about</h2>
            <p className="mt-2 leading-relaxed text-muted">{game.description}</p>
          </section>
          <section className="card p-5">
            <h2 className="eyebrow text-muted">controls</h2>
            <dl className="mt-3 space-y-2">
              {game.controls.map((c) => (
                <div key={c.keys} className="flex items-center justify-between gap-3 text-sm">
                  <dt>
                    <kbd className="rounded border border-b-2 border-border-strong bg-surface-2 px-1.5 font-mono text-xs text-fg">{c.keys}</kbd>
                  </dt>
                  <dd className="text-muted">{c.action}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {others.length > 0 && (
          <div className="mt-10">
            <h2 className="eyebrow mb-3 text-muted">play next</h2>
            <ul className="flex flex-wrap gap-3">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/games/${g.slug}`}
                    className="card card-hover group flex items-center gap-3 px-4 py-3"
                  >
                    <span className="font-pixel text-xs text-accent">{g.title.toUpperCase()}</span>
                    <span className="text-sm text-muted">{g.tagline}</span>
                    <ArrowRight className="size-4 text-subtle group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </>
  );
}
