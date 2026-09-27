// Twitter/X cards use a separate file convention from Open Graph, but the
// image itself should be identical — re-export the same generator.
export { default, alt, size, contentType } from "./opengraph-image";
