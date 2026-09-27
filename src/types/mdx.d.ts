declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { PostMeta } from "@/lib/posts";

  export const meta: PostMeta;
  export default function MDXContent(props: MDXProps): React.JSX.Element;
}
