import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatPostDate } from "@/components/home/Writing";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

async function findPost(slug: string) {
  const posts = await getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  // Posts are newest first: "next" is the newer one.
  return { post: posts[i], newer: posts[i - 1], older: posts[i + 1] };
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { post } = await findPost((await params).slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { post, newer, older } = await findPost(slug);
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <article>
      <PageHeader path={`blog/${slug}`} title={post.title} back={{ href: "/blog", label: "all posts" }}>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-subtle">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.tags?.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {post.draft && <span className="rounded border border-accent/50 px-1.5 text-accent">draft · dev only</span>}
        </p>
      </PageHeader>

      <Container size="wide" className="pb-16">
        <div className="prose prose-site max-w-3xl border-t border-dashed border-border pt-8">
          <Content />
        </div>

        <nav aria-label="More posts" className="mt-16 grid max-w-3xl gap-3 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="card card-hover group p-4">
              <span className="flex items-center gap-1 font-mono text-xs text-subtle">
                <ArrowLeft className="size-3" /> older
              </span>
              <span className="mt-1 block font-medium text-fg group-hover:text-accent">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="card card-hover group p-4 text-right">
              <span className="flex items-center justify-end gap-1 font-mono text-xs text-subtle">
                newer <ArrowRight className="size-3" />
              </span>
              <span className="mt-1 block font-medium text-fg group-hover:text-accent">{newer.title}</span>
            </Link>
          )}
        </nav>
      </Container>
    </article>
  );
}
