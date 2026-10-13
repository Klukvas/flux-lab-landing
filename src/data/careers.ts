import { defaultLocale, isLocale } from "@/i18n/config";
import type { CareerPosition, LocalizedCareerPosition } from "@/types";

/** "Remote (Europe)": Ukraine plus the EU, EEA, UK, Switzerland and EU candidate countries. */
const EUROPE = [
  "Ukraine",
  "Poland",
  "Germany",
  "Czechia",
  "Slovakia",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Moldova",
  "Lithuania",
  "Latvia",
  "Estonia",
  "Finland",
  "Sweden",
  "Denmark",
  "Norway",
  "Iceland",
  "Netherlands",
  "Belgium",
  "Luxembourg",
  "France",
  "Spain",
  "Portugal",
  "Italy",
  "Malta",
  "Greece",
  "Cyprus",
  "Croatia",
  "Slovenia",
  "Austria",
  "Switzerland",
  "Ireland",
  "United Kingdom",
  "Serbia",
  "Montenegro",
  "North Macedonia",
  "Albania",
  "Bosnia and Herzegovina",
] as const;

/**
 * "Remote (Worldwide)". Google Jobs only accepts named countries, so this lists the
 * markets the studio works with rather than every country on Earth.
 */
const WORLDWIDE = ["United States", "Canada", ...EUROPE] as const;

/** The date the technical writer role went live on the site. */
const POSTED_2026_03_20 = "2026-03-20";

/** The date the Rust and C# roles went live on the site. */
const POSTED_2026_10_13 = "2026-10-13";

/**
 * Open roles. When a role is filled, delete it here: its page then returns 404 and
 * Google Jobs drops the posting, which is how Google asks for filled jobs to go.
 */
export const positions: readonly CareerPosition[] = [
  {
    id: "rust-systems-engineer",
    type: "full-time",
    datePosted: POSTED_2026_10_13,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "Rust Systems Engineer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "We're moving the performance-critical parts of our platform to Rust and need an engineer to lead that work. The first target is FluxRadar's crawling and analysis engine: fetching and parsing thousands of pages per audit, running site-health checks, and turning raw signals into scores — all within a tight time and memory budget on modest Hetzner Cloud instances. From there you'll own shared infrastructure such as job queues, rate limiters and the ingestion pipeline that receives data from 18K+ EFluxCom devices. You'll work alongside our Go and TypeScript services and decide where Rust earns its place.",
        requirements: [
          "3+ years of production Rust experience (tokio, axum or actix-web, sqlx or diesel)",
          "Solid grasp of ownership, lifetimes and trait-based design — you write idiomatic Rust, not C++ in disguise",
          "Experience with async Rust: structured concurrency, backpressure, cancellation",
          "HTTP at scale: connection pooling, timeouts, retries, politeness limits for crawlers",
          "PostgreSQL and Redis from Rust, including schema design and migrations",
          "Profiling and benchmarking (perf, flamegraph, criterion) — you measure before you optimize",
          "Docker-based deployments and CI/CD (GitHub Actions)",
          "Bonus: Go experience, or a published crate",
        ],
        benefits: [
          "Fully remote — work from anywhere in Europe",
          "Flexible schedule — async-first culture, no mandatory meetings before noon",
          "$1,500/year professional development budget (conferences, courses, books)",
          "$1,000 equipment allowance for your home office setup",
          "Greenfield Rust codebase — you set the conventions",
          "Small team — your impact is visible from day one",
          "Paid vacation: 20 days + Ukrainian public holidays",
        ],
      },
      uk: {
        title: "Rust Systems Engineer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Критичні до продуктивності частини платформи ми переносимо на Rust і шукаємо інженера, який очолить цю роботу. Перша ціль — рушій краулінгу й аналізу FluxRadar: завантаження та парсинг тисяч сторінок за один аудит, перевірки здоров'я сайту й перетворення сирих сигналів на оцінки — усе в жорсткому бюджеті часу та пам'яті на скромних інстансах Hetzner Cloud. Далі ви відповідатимете за спільну інфраструктуру: черги задач, rate limiter'и та пайплайн, який приймає дані з 18K+ пристроїв EFluxCom. Ви працюватимете поруч із нашими сервісами на Go й TypeScript і вирішуватимете, де Rust справді виправдовує себе.",
        requirements: [
          "3+ роки продакшн-досвіду з Rust (tokio, axum або actix-web, sqlx або diesel)",
          "Глибоке розуміння ownership, lifetimes і дизайну на трейтах — ви пишете ідіоматичний Rust, а не замаскований C++",
          "Досвід з async Rust: структурована конкурентність, backpressure, скасування задач",
          "HTTP у масштабі: пули з'єднань, таймаути, повтори, обмеження навантаження для краулерів",
          "PostgreSQL і Redis з Rust, включно з проєктуванням схем і міграціями",
          "Профілювання та бенчмарки (perf, flamegraph, criterion) — ви вимірюєте, перш ніж оптимізувати",
          "Деплой у Docker і CI/CD (GitHub Actions)",
          "Плюсом буде досвід з Go або опублікований крейт",
        ],
        benefits: [
          "Повністю віддалено — працюйте з будь-якої точки Європи",
          "Гнучкий графік — async-first культура, жодних обов'язкових зустрічей до обіду",
          "$1,500 на рік на професійний розвиток (конференції, курси, книжки)",
          "$1,000 на облаштування домашнього офісу",
          "Rust-кодова база з нуля — ви задаєте конвенції",
          "Невелика команда — ваш внесок видно з першого дня",
          "Оплачувана відпустка: 20 днів + державні свята України",
        ],
      },
    },
  },
  {
    id: "dotnet-backend-developer",
    type: "full-time",
    datePosted: POSTED_2026_10_13,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "C# / .NET Backend Developer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "Accounting is our financial platform for small and medium businesses: invoicing, expense tracking, bank synchronization, VAT and exports to 1C/BAS. We're building its next core on .NET and need a C# engineer to own it: the double-entry ledger, the tax and reporting engine, bank and payment-provider integrations, and the background jobs that keep thousands of businesses' books in sync. Correctness matters more than speed here — money math, audit trails and idempotent processing are the daily work. You'll work with the TypeScript frontend team and define the API contract between backend and client.",
        requirements: [
          "4+ years of production C# and .NET (ASP.NET Core, EF Core or Dapper)",
          "Strong PostgreSQL skills: transactions, isolation levels, schema design and migrations",
          "Domain modelling for financial data: decimal math, multi-currency, immutable ledgers, audit trails",
          "Background processing and reliable messaging (Hangfire, Quartz or MassTransit; RabbitMQ or Redis Streams)",
          "REST API design with OpenAPI, versioning and authentication (JWT, OAuth 2.0)",
          "Testing culture: xUnit or NUnit, integration tests against a real database, Testcontainers",
          "Docker-based deployments on Linux and CI/CD (GitHub Actions)",
          "Bonus: bank API or Open Banking integrations, 1C/BAS exports, or Ukrainian tax reporting",
        ],
        benefits: [
          "Fully remote — work from anywhere in Europe",
          "Flexible schedule — async-first culture, no mandatory meetings before noon",
          "$1,500/year professional development budget (conferences, courses, books)",
          "$1,000 equipment allowance for your home office setup",
          "Own the financial core — architecture decisions are yours to make and defend",
          "Small team — your impact is visible from day one",
          "Paid vacation: 20 days + Ukrainian public holidays",
        ],
      },
      uk: {
        title: "C# / .NET Backend Developer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Accounting — наша фінансова платформа для малого й середнього бізнесу: виставлення рахунків, облік витрат, синхронізація з банками, ПДВ та експорт в 1C/BAS. Її наступне ядро ми будуємо на .NET і шукаємо C#-інженера, який візьме його на себе: леджер із подвійним записом, податковий і звітний рушій, інтеграції з банками та платіжними провайдерами, а також фонові задачі, що тримають бухгалтерію тисяч бізнесів синхронізованою. Тут коректність важливіша за швидкість: грошова арифметика, аудит-трейли й ідемпотентна обробка — це щоденна робота. Ви працюватимете разом із фронтенд-командою на TypeScript і визначатимете контракт API між бекендом і клієнтом.",
        requirements: [
          "4+ роки продакшн-досвіду з C# і .NET (ASP.NET Core, EF Core або Dapper)",
          "Сильні навички PostgreSQL: транзакції, рівні ізоляції, проєктування схем і міграції",
          "Моделювання фінансових даних: decimal-арифметика, мультивалютність, незмінні леджери, аудит-трейли",
          "Фонова обробка та надійний обмін повідомленнями (Hangfire, Quartz або MassTransit; RabbitMQ або Redis Streams)",
          "Проєктування REST API з OpenAPI, версіюванням та автентифікацією (JWT, OAuth 2.0)",
          "Культура тестування: xUnit або NUnit, інтеграційні тести на реальній базі, Testcontainers",
          "Деплой у Docker на Linux і CI/CD (GitHub Actions)",
          "Плюсом буде досвід інтеграції з банківськими API чи Open Banking, експорту в 1C/BAS або української податкової звітності",
        ],
        benefits: [
          "Повністю віддалено — працюйте з будь-якої точки Європи",
          "Гнучкий графік — async-first культура, жодних обов'язкових зустрічей до обіду",
          "$1,500 на рік на професійний розвиток (конференції, курси, книжки)",
          "$1,000 на облаштування домашнього офісу",
          "Ви відповідаєте за фінансове ядро — архітектурні рішення ухвалюєте й відстоюєте ви",
          "Невелика команда — ваш внесок видно з першого дня",
          "Оплачувана відпустка: 20 днів + державні свята України",
        ],
      },
    },
  },
  {
    id: "technical-writer",
    type: "contract",
    datePosted: POSTED_2026_03_20,
    applicantCountries: WORLDWIDE,
    content: {
      en: {
        title: "Technical Writer / Content Creator",
        department: "Marketing",
        location: "Remote (Worldwide)",
        description:
          "We publish technical blog posts about our engineering practices — Go, React, PostgreSQL, Docker, AI integration, and SaaS building. We need a technical writer who can turn our engineering knowledge into engaging, SEO-optimized articles. You'll interview our developers, research topics, and produce 4-6 articles per month in English and/or Ukrainian. Ideal for a developer who enjoys writing or a technical writer with engineering background.",
        requirements: [
          "Strong technical writing portfolio (dev blogs, documentation, tutorials)",
          "Understanding of web development concepts (you don't need to code, but you need to understand it)",
          "SEO basics: keyword research, meta descriptions, internal linking",
          "Ability to write in English (Ukrainian is a strong bonus)",
          "Self-directed — can research topics and produce drafts independently",
          "Experience with Markdown/MDX",
          "Bonus: experience writing about Go, React, PostgreSQL, or DevOps",
        ],
        benefits: [
          "Fully remote — worldwide, any timezone",
          "Flexible contract — per-article or monthly retainer",
          "Byline credit on flux-lab.dev blog",
          "Access to engineering team for interviews and fact-checking",
          "Topics in high-demand tech niches — great for your portfolio",
        ],
      },
      uk: {
        title: "Technical Writer / Content Creator",
        department: "Маркетинг",
        location: "Віддалено (будь-яка країна)",
        description:
          "Ми публікуємо технічні статті про наші інженерні практики — Go, React, PostgreSQL, Docker, інтеграцію ШІ та створення SaaS. Нам потрібен технічний райтер, який перетворить інженерні знання команди на цікаві SEO-оптимізовані статті. Ви братимете інтерв'ю в наших розробників, досліджуватимете теми й писатимете 4–6 статей на місяць англійською та/або українською. Ідеально для розробника, який любить писати, або для технічного райтера з інженерним бекграундом.",
        requirements: [
          "Сильне портфоліо технічних текстів (дев-блоги, документація, туторіали)",
          "Розуміння концепцій веброзробки (кодити не обов'язково, але розуміти — так)",
          "Основи SEO: дослідження ключових слів, метаописи, внутрішня перелінковка",
          "Уміння писати англійською (українська — велика перевага)",
          "Самостійність — можете дослідити тему й підготувати чернетку без підказок",
          "Досвід роботи з Markdown/MDX",
          "Плюсом буде досвід написання про Go, React, PostgreSQL або DevOps",
        ],
        benefits: [
          "Повністю віддалено — будь-яка країна, будь-який часовий пояс",
          "Гнучкий контракт — оплата за статтю або щомісячний ретейнер",
          "Ваше ім'я як автора в блозі flux-lab.dev",
          "Доступ до інженерної команди для інтерв'ю та фактчекінгу",
          "Теми з популярних технічних ніш — чудово для вашого портфоліо",
        ],
      },
    },
  },
] as const;

function localize(
  position: CareerPosition,
  locale: string,
): LocalizedCareerPosition {
  const { content, ...facts } = position;
  return { ...facts, ...content[isLocale(locale) ? locale : defaultLocale] };
}

export function getPositionIds(): readonly string[] {
  return positions.map((position) => position.id);
}

export function getAllPositions(
  locale: string,
): readonly LocalizedCareerPosition[] {
  return positions.map((position) => localize(position, locale));
}

export function getPositionById(
  id: string,
  locale: string,
): LocalizedCareerPosition | undefined {
  const position = positions.find((candidate) => candidate.id === id);
  return position ? localize(position, locale) : undefined;
}
