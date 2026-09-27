import type { Metadata } from "next";
import { games } from "@/content/games";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Arcade } from "@/components/home/Arcade";

export const metadata: Metadata = {
  title: "Arcade",
  description: "Small browser games I built for fun. Playable right here.",
};

export default function GamesPage() {
  return (
    <>
      <PageHeader
        path="arcade"
        title="Insert coin"
        description="Small games I built to learn game loops, collisions and level design. Pick one and press start."
      />
      <Container size="wide" className="pb-20">
        <Arcade games={games} />
      </Container>
    </>
  );
}
