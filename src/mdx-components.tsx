import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";

// Global MDX element overrides. Typography styling comes from the `prose`
// wrapper on the post page; these handle behavior (internal links, images).
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
  img: ({ alt = "", ...props }) => (
    <Image
      sizes="(min-width: 768px) 720px, 100vw"
      style={{ width: "100%", height: "auto" }}
      className="rounded-xl border border-border"
      {...(props as Omit<ImageProps, "alt">)}
      alt={alt}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
