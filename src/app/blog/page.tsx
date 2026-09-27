import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PostList } from "@/components/home/Writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and write-ups on building software and games.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHeader path="blog" title="Notes & write-ups" description="Things I've built, broken and learned along the way." />
      <Container size="wide" className="pb-20">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <div className="card grid place-items-center border-dashed px-6 py-16 text-center">
            <p className="font-mono text-sm text-muted">
              {"// "}first post compiling…<span className="cursor-blink">_</span>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
