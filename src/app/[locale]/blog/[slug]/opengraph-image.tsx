import { notFound } from "next/navigation";
import { locales } from "@/i18n/config";
import { getAllBlogSlugs } from "@/lib/mdx";
import {
  POST_CARD_CONTENT_TYPE,
  POST_CARD_SIZE,
  renderPostCard,
} from "@/lib/og/post-card";

/** Every post's card is drawn at build time, like the post itself. */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllBlogSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export const alt = "fluxLab.dev engineering blog";
export const size = POST_CARD_SIZE;
export const contentType = POST_CARD_CONTENT_TYPE;

/** The card a link to this post shows when shared: its title on the site's dot field. */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const card = await renderPostCard(await params);
  if (!card) notFound();
  return card;
}
