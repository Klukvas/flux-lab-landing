import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getAllProjects } from "@/data/projects";
import { builtWithLogos, integratedWithLogos, type Logo } from "@/data/logos";
import { getBlogPosts } from "@/lib/mdx";
import { DotStatement } from "./dot-statement";
import { ProductShowcase, type ShowcaseProduct } from "./product-showcase";
import {
  RadarPreview,
  WashPreview,
  CursopusPreview,
  AutoPreview,
  MarketPreview,
  LifePreview,
} from "./product-previews";
import { studioCopy } from "./studio-copy";
import { studioStyles as styles } from "./studio-styles";

function CapabilityDrawing() {
  return (
    <svg
      className={styles.schematic}
      viewBox="-12 -24 1224 256"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        <path d="M82 115H160M235 115H315M400 115H463V70H535M463 115v54h72M630 70h70v45h74M630 169h70v-54M836 115h43V64h83M880 115v66h82M1062 64h73v51h35M1062 181h73v-66" />
        {[25, 165, 310, 535, 962].map((x, index) => (
          <g key={x}>
            <rect
              x={x}
              y={index === 3 ? 40 : 55}
              width={index === 4 ? 100 : 78}
              height={index === 3 ? 60 : 126}
              rx="5"
            />
            <path
              d={`M${x + 10} 76h35m-35 12h55m-55 20h48m-48 12h32m-32 12h48m-48 12h25`}
            />
          </g>
        ))}
        <rect x="535" y="129" width="95" height="60" rx="5" />
        <path d="M548 145h61m-61 12h40m-40 12h56" />
        <ellipse cx="805" cy="98" rx="30" ry="11" />
        <path d="M775 98v50c0 15 60 15 60 0V98m-60 17c0 15 60 15 60 0m-60 17c0 15 60 15 60 0" />
        <path d="M900 60c-17-1-23-27-7-38 1-30 45-35 55-12 28-9 47 27 26 45-5 6-12 6-20 6h-54Z" />
        {[20, 89, 160].map((y) => (
          <rect key={y} x="1160" y={y} width="28" height="36" rx="4" />
        ))}
        <path d="M978 161v-18m17 18v-33m17 33v-22m17 22v-42" strokeWidth="7" />
      </g>
      <g fill="var(--brand)">
        {[
          [120, 115],
          [463, 115],
          [700, 115],
          [880, 64],
          [1135, 115],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  );
}

function TechnologyRow({
  title,
  logos,
}: {
  readonly title: string;
  readonly logos: readonly Logo[];
}) {
  return (
    <div className={styles.technologyRow}>
      <span className={styles.eyebrow}>{title}</span>
      <div>
        {logos.map((logo) => (
          <span className={styles.technology} key={logo.name}>
            {logo.mark.kind === "icon" ? (
              <svg viewBox={logo.mark.viewBox} aria-hidden="true">
                <path fill="currentColor" d={logo.mark.path} />
              </svg>
            ) : (
              <b aria-hidden="true">{logo.mark.letter}</b>
            )}
            {logo.name}
          </span>
        ))}
      </div>
    </div>
  );
}

type Copy = (typeof studioCopy)["en" | "uk"];
type SectionProps = { readonly c: Copy };

function StudioHero({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.hero}`}
      aria-labelledby="studio-title"
    >
      <DotStatement />
      <div className={styles.pitch}>
        <p className={styles.eyebrow}>{c.eyebrow}</p>
        <h1 id="studio-title">{c.title}</h1>
        <p className={styles.heroSubtitle}>{c.subtitle}</p>
        <div className={styles.actions}>
          <a href="#products" className={styles.primary}>
            {c.explore}
            <span aria-hidden="true">↗</span>
          </a>
          <Link href="/contact" className={styles.secondary}>
            {c.start}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className={styles.location}>
          <i />
          {c.location}
        </p>
      </div>
    </section>
  );
}

function StudioPortfolio({ c, uk }: SectionProps & { readonly uk: boolean }) {
  const products = getAllProjects();
  const summaries: Record<string, string> = {
    fluxradar: c.radar,
    washflow: c.wash,
    jobber: c.cursopus,
    autoflow: c.auto,
    market: c.market,
    lifespan: c.life,
    efluxcom: c.developmentText,
  };
  const taglines: Record<string, string> = uk
    ? {
        fluxradar: "Аудит сайту для SEO та ШІ-пошуку",
        washflow: "Розклад і CRM для автомийок",
        jobber: "Заявки на роботу та ШІ-резюме",
        autoflow: "Вітрина автосалону",
        market: "Замовлення, чеки й аналітика",
        lifespan: "Ваше життя на таймлайні",
      }
    : {
        fluxradar: "Website Audit for SEO & AI Search",
        washflow: "Car Wash Scheduling & CRM",
        jobber: "Job Applications & AI Resumes",
        autoflow: "Car Dealership Storefront",
        market: "Orders, Receipts & Analytics",
        lifespan: "Your Life, Visualized",
      };
  const previews: Record<string, React.ReactNode> = {
    fluxradar: <RadarPreview uk={uk} />,
    washflow: <WashPreview uk={uk} />,
    jobber: <CursopusPreview uk={uk} />,
    autoflow: <AutoPreview uk={uk} />,
    market: <MarketPreview uk={uk} />,
    lifespan: <LifePreview uk={uk} />,
  };
  const showcaseProducts: readonly ShowcaseProduct[] = products.map(
    (product) => ({
      slug: product.slug,
      name: product.name,
      status: product.status,
      statusLabel:
        product.status === "active"
          ? c.active
          : product.status === "beta"
            ? c.beta
            : c.development,
      tagline: taglines[product.slug],
      summary: summaries[product.slug],
      href:
        product.slug === "efluxcom" ? undefined : `/projects/${product.slug}`,
      preview: previews[product.slug],
    }),
  );
  return (
    <section
      id="products"
      className={`${styles.wrap} ${styles.portfolio}`}
      aria-labelledby="products-title"
    >
      <header className={styles.sectionTitle}>
        <h2 id="products-title">{c.products}</h2>
        <p>{c.productsSubtitle}</p>
      </header>
      <ProductShowcase
        products={showcaseProducts}
        label={c.productsBy}
        viewLabel={c.view}
      />
    </section>
  );
}

function PlaybookSection({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.section} ${styles.playbook}`}
      aria-labelledby="playbook-title"
    >
      <p className={styles.eyebrow}>{c.how}</p>
      <header className={styles.sectionTitle}>
        <h2 id="playbook-title">{c.playbook}</h2>
        <p>{c.playbookSubtitle}</p>
      </header>
      <ol className={styles.phases}>
        {c.phases.map(([week, title, description]) => (
          <li key={title}>
            <span>{week}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
      <div className={styles.ongoing}>
        <span>{c.ongoing}</span>
        <p>{c.ongoingText}</p>
      </div>
    </section>
  );
}

function CapabilitiesSection({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.section}`}
      aria-labelledby="capabilities-title"
    >
      <p className={styles.eyebrow}>{c.what}</p>
      <header className={styles.sectionTitle}>
        <h2 id="capabilities-title">{c.capabilities}</h2>
        <p>{c.capabilitiesSubtitle}</p>
      </header>
      <CapabilityDrawing />
      <div className={styles.capabilities}>
        {c.capabilityColumns.map((col) => (
          <div key={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <TechnologyRow title={c.built} logos={builtWithLogos} />
      <TechnologyRow title={c.integrated} logos={integratedWithLogos} />
    </section>
  );
}

function EngagementSection({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.section}`}
      aria-labelledby="engagement-title"
    >
      <header className={styles.sectionTitle}>
        <h2 id="engagement-title">{c.ways}</h2>
        <p>{c.waysSubtitle}</p>
      </header>
      <div className={styles.engagements}>
        {c.engagements.map(([title, description]) => (
          <Link href="/services" key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
      <div className={styles.alignEnd}>
        <Link href="/services" className={styles.textLink}>
          {c.services} ↗
        </Link>
      </div>
    </section>
  );
}

function WhySection({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.section} ${styles.why}`}
      aria-labelledby="why-title"
    >
      <p className={styles.eyebrow}>{c.why}</p>
      <header className={styles.sectionTitle}>
        <h2 id="why-title">{c.whyTitle}</h2>
      </header>
      <div className={styles.comic}>
        <Image
          src="/home/fluxlab-product-team-v2.png"
          alt={c.comicAlt}
          width={1536}
          height={512}
          sizes="(max-width: 900px) 100vw, 1280px"
        />
      </div>
      <div className={styles.reasons}>
        {c.reasons.map(([title, description]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogSection({
  c,
  locale,
}: SectionProps & { readonly locale: string }) {
  const blogPosts = getBlogPosts(locale);
  const blogSlugs = [
    "typescript-best-practices",
    "building-modern-web-apps",
    "why-outsource-to-product-studio-ukraine",
  ];
  const posts = blogSlugs
    .map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter((post) => post !== undefined);
  const selectedPosts = posts.length === 3 ? posts : blogPosts.slice(0, 3);
  return (
    <section
      className={`${styles.wrap} ${styles.section}`}
      aria-labelledby="blog-title"
    >
      <header className={styles.sectionTitle}>
        <h2 id="blog-title">{c.blog}</h2>
        <p>{c.blogSubtitle}</p>
      </header>
      <div className={styles.blogGrid}>
        {selectedPosts.map((post, index) => (
          <article
            key={post.slug}
            className={index === 0 ? styles.leadPost : styles.smallPost}
          >
            <div>
              <p className={styles.eyebrow}>{post.tags[0] ?? "Engineering"}</p>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <Link href={`/blog/${post.slug}`} className={styles.textLink}>
                {c.read} ↗
              </Link>
            </div>
            <div aria-hidden="true" className={styles.blogArt}>
              <span>{index === 0 ? "TS" : index === 1 ? "N" : "{ }"}</span>
              <i />
              <i />
            </div>
          </article>
        ))}
      </div>
      <div className={styles.alignEnd}>
        <Link href="/blog" className={styles.textLink}>
          {c.all} ↗
        </Link>
      </div>
    </section>
  );
}

function ConsultationSection({ c }: SectionProps) {
  return (
    <section
      className={`${styles.wrap} ${styles.cta}`}
      aria-labelledby="cta-title"
    >
      <div>
        <h2 id="cta-title">{c.cta}</h2>
        <p>{c.ctaText}</p>
        <div className={styles.actions}>
          <Link href="/contact" className={styles.inverted}>
            {c.call} ↗
          </Link>
          <a href="#products" className={styles.secondary}>
            {c.work} →
          </a>
        </div>
      </div>
      <div className={styles.ctaDots} aria-hidden="true" />
    </section>
  );
}

export function StudioHome({ locale }: { readonly locale: string }) {
  const uk = locale === "uk";
  const c = studioCopy[uk ? "uk" : "en"];
  return (
    <div className={styles.home}>
      <StudioHero c={c} />
      <StudioPortfolio c={c} uk={uk} />
      <PlaybookSection c={c} />
      <CapabilitiesSection c={c} />
      <EngagementSection c={c} />
      <WhySection c={c} />
      <BlogSection c={c} locale={locale} />
      <ConsultationSection c={c} />
    </div>
  );
}
