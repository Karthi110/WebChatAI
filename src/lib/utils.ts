import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function reconstructUrl({ url }: { url: string[] }) {
  const decodeComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  const CompleteUrl = decodeComponents.join("/");
  const lastSlashIndex = CompleteUrl.lastIndexOf("/");
  const baseUrl = CompleteUrl.substring(0, lastSlashIndex).replace(
    "https:/",
    "https://"
  );
  const loaderType = CompleteUrl.substring(lastSlashIndex + 1);
  return { baseUrl, loaderType };
}

export const getMetadataFromUrl = async (url: string) => {
  try {
    // Fetch the HTML content of the page
    const response = await fetch(url);
    const html = await response.text();

    // Use regular expressions or basic string searches to extract metadata
    const getMetaTagContent = (name: string) => {
      const metaTag = html.match(
        new RegExp(
          `<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`,
          "i"
        )
      );
      return metaTag ? metaTag[1] : "";
    };

    const getPropertyTagContent = (property: string) => {
      const propertyTag = html.match(
        new RegExp(
          `<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["'][^>]*>`,
          "i"
        )
      );
      return propertyTag ? propertyTag[1] : "";
    };

    // Extract title
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] || "";

    // Extract description
    const description = getMetaTagContent("description");

    // Extract OpenGraph image (og:image) or Twitter image
    const ogImage = getPropertyTagContent("og:image");
    const twitterImage = getMetaTagContent("twitter:image");

    // Extract first <img> tag as a fallback image
    const firstImgSrc = html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || "";

    // Return the metadata object
    return {
      title,
      description,
      ogImage,
      twitterImage,
      firstImgSrc,
    };
  } catch (error) {
    console.error(`Error fetching metadata from ${url}:`, error);
    return null;
  }
};
