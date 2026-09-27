import type { Metadata } from "next";
import Link from "next/link";
import { games } from "@/content/games";
import { Container } from "@/components/layout/Container";
import { PixelIcon } from "@/components/icons/pixel";

export const metadata: Metadata = { title: "404 · Game over" };

export default function NotFound() {
  return (
    <Container size="wide" className="grid min-h-[70dvh] place-items-center py-16">
      <div className="crt card flex w-full max-w-xl flex-col items-center gap-5 bg-[#050806]! px-6 py-14 text-center">
        <PixelIcon name="invader" className="h-10 text-[#4ef08a] drop-shadow-[0_0_10px_rgb(78_240_138/0.5)]" />
        <p className="font-pixel text-2xl text-[#e8ffe9] sm:text-4xl">GAME OVER</p>
        <p className="font-mono text-sm text-[#9fb8a6]">
          404: this page doesn&apos;t exist <span className="text-[#5b7263]">(or got eaten by a skeletor)</span>
        </p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <Link href="/" className="font-pixel rounded-lg bg-[#4ef08a] px-4 py-3 text-[10px] text-[#03140a] hover:bg-[#7dffae]">
            ▶ CONTINUE
          </Link>
          <Link
            href={`/games/${games[0].slug}`}
            className="font-pixel rounded-lg border border-[#2a3d31] px-4 py-3 text-[10px] text-[#d6e6da] hover:border-[#4ef08a]"
          >
            PLAY {games[0].title.toUpperCase()}
          </Link>
        </div>
      </div>
    </Container>
  );
}
