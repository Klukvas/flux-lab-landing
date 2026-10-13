import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { getBlogPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/types";

export const POST_CARD_SIZE = { width: 1200, height: 630 } as const;
export const POST_CARD_CONTENT_TYPE = "image/png";

/** The site's tokens, copied: this renders outside the app's CSS. */
const COLORS = { fg: "#E8E7EF", gray300: "#9896A8", gray400: "#7A768F", brand: "#7B6EF6" } as const;
/** Tags shown in the meta line; the rest would only crowd it. */
const MAX_TAGS = 3;

/** Large titles get the big size; long ones step down so three lines still fit. */
function titleFontSize(title: string): number {
  if (title.length <= 45) return 64;
  if (title.length <= 75) return 54;
  return 46;
}

/** Card assets live in src/assets/og; next.config lists them for the standalone output. */
const ASSET_DIR = path.join(process.cwd(), "src/assets/og");

async function readAsset(name: string): Promise<Buffer> {
  return readFile(path.join(ASSET_DIR, name));
}

/**
 * Fonts for the card. Syne and DM Mono are the site's faces and cover Latin; Inter and
 * JetBrains Mono step in per glyph for Cyrillic titles, as the system font does on the site.
 */
async function loadFonts() {
  const [syne, dmMono, inter, jetBrainsMono] = await Promise.all([
    readAsset("Syne-ExtraBold.woff"),
    readAsset("DMMono-Medium.woff"),
    readAsset("Inter-ExtraBold.woff"),
    readAsset("JetBrainsMono-Medium.woff"),
  ]);
  return [
    { name: "Syne", data: syne, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 800 as const, style: "normal" as const },
    { name: "DM Mono", data: dmMono, weight: 500 as const, style: "normal" as const },
    { name: "JetBrains Mono", data: jetBrainsMono, weight: 500 as const, style: "normal" as const },
  ];
}

/** The text-free card rendered from scripts/og: the dot field, the mark and the wordmark. */
async function loadBase(): Promise<string> {
  const png = await readAsset("blog-base.png");
  return `data:image/png;base64,${png.toString("base64")}`;
}

interface PostCardProps {
  readonly post: BlogPostMeta;
  readonly base: string;
  readonly eyebrow: string;
  readonly meta: string;
}

function PostCard({ post, base, eyebrow, meta }: PostCardProps) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: "#07060E" }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws plain img tags */}
      <img src={base} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0 }} />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 196,
          width: 940,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "DM Mono, JetBrains Mono",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: COLORS.brand,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "block",
            marginTop: 26,
            fontFamily: "Syne, Inter",
            fontWeight: 800,
            fontSize: titleFontSize(post.title),
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: COLORS.fg,
            lineClamp: 3,
          }}
        >
          {post.title}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 72,
          display: "flex",
          fontFamily: "DM Mono, JetBrains Mono",
          fontSize: 20,
          color: COLORS.gray300,
        }}
      >
        {meta}
      </div>
    </div>
  );
}

interface PostCardParams {
  readonly locale: string;
  readonly slug: string;
}

/** The social card for one post, or null when the post does not exist in that language. */
export async function renderPostCard({ locale, slug }: PostCardParams): Promise<ImageResponse | null> {
  const post = getBlogPost(locale, slug);
  if (!post) return null;

  const t = await getTranslations({ locale, namespace: "blog" });
  const [fonts, base] = await Promise.all([loadFonts(), loadBase()]);
  const meta = [
    formatDate(post.meta.date, locale),
    `${post.meta.readingTime} ${t("minRead")}`,
    ...post.meta.tags.slice(0, MAX_TAGS),
  ].join("  ·  ");

  return new ImageResponse(
    <PostCard post={post.meta} base={base} eyebrow={t("title")} meta={meta} />,
    { ...POST_CARD_SIZE, fonts },
  );
}
