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

/** The date the current set of roles went live on the site. */
const POSTED_2026_03_20 = "2026-03-20";

/**
 * Open roles. When a role is filled, delete it here: its page then returns 404 and
 * Google Jobs drops the posting, which is how Google asks for filled jobs to go.
 */
export const positions: readonly CareerPosition[] = [
  {
    id: "senior-frontend",
    type: "full-time",
    datePosted: POSTED_2026_03_20,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "We're looking for a senior frontend developer to own the UI layer across our product portfolio. You'll work on Next.js applications serving 46K+ users — building new features, improving performance, and maintaining our shared design system. This isn't agency work: you'll ship to production daily and see your code used by real people immediately. We value engineers who care about UX as much as DX.",
        requirements: [
          "5+ years of production experience with React and TypeScript",
          "Strong Next.js knowledge (App Router, Server Components, SSR/SSG)",
          "Experience building and maintaining component libraries / design systems",
          "Tailwind CSS proficiency — you think in utility classes",
          "Performance optimization: Core Web Vitals, bundle analysis, lazy loading",
          "Accessibility (WCAG 2.1 AA) awareness and implementation",
          "Experience with Framer Motion or similar animation libraries",
          "Comfortable with Git, code reviews, and CI/CD pipelines",
        ],
        benefits: [
          "Fully remote — work from anywhere in Europe",
          "Flexible schedule — async-first culture, no mandatory meetings before noon",
          "$1,500/year professional development budget (conferences, courses, books)",
          "$1,000 equipment allowance for your home office setup",
          "Work on your own products — not client projects with unclear ownership",
          "Small team (4 people) — your impact is visible from day one",
          "Paid vacation: 20 days + Ukrainian public holidays",
        ],
      },
      uk: {
        title: "Senior Frontend Developer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Шукаємо senior frontend-розробника, який відповідатиме за UI-шар усіх наших продуктів. Ви працюватимете із застосунками на Next.js, якими користуються 46K+ людей: створюватимете нові функції, покращуватимете продуктивність і розвиватимете нашу спільну дизайн-систему. Це не агентська робота: ви щодня релізите в продакшн і одразу бачите, як вашим кодом користуються реальні люди. Нам важливі інженери, для яких UX так само важливий, як DX.",
        requirements: [
          "5+ років продакшн-досвіду з React і TypeScript",
          "Глибоке знання Next.js (App Router, Server Components, SSR/SSG)",
          "Досвід створення та підтримки бібліотек компонентів і дизайн-систем",
          "Впевнене володіння Tailwind CSS — ви мислите utility-класами",
          "Оптимізація продуктивності: Core Web Vitals, аналіз бандла, lazy loading",
          "Розуміння доступності (WCAG 2.1 AA) і досвід її впровадження",
          "Досвід з Framer Motion або подібними бібліотеками анімацій",
          "Впевнена робота з Git, код-рев'ю та CI/CD-пайплайнами",
        ],
        benefits: [
          "Повністю віддалено — працюйте з будь-якої точки Європи",
          "Гнучкий графік — async-first культура, жодних обов'язкових зустрічей до обіду",
          "$1,500 на рік на професійний розвиток (конференції, курси, книжки)",
          "$1,000 на облаштування домашнього офісу",
          "Робота над власними продуктами, а не над клієнтськими проєктами з розмитою відповідальністю",
          "Невелика команда (4 людини) — ваш внесок видно з першого дня",
          "Оплачувана відпустка: 20 днів + державні свята України",
        ],
      },
    },
  },
  {
    id: "go-backend-developer",
    type: "full-time",
    datePosted: POSTED_2026_03_20,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "Go Backend Developer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "We're building our newest products in Go and need a backend engineer who loves the language. You'll design and implement APIs, database schemas, and background workers for Jobber (our AI job tracker with 15K+ users) and future products. Our Go services handle 12K req/s with 8ms P99 latency on modest Hetzner Cloud instances — we care about efficiency. You'll work with PostgreSQL, Redis, and Claude AI integration.",
        requirements: [
          "3+ years of production Go experience (chi/gin/echo, pgx/sqlx)",
          "Strong PostgreSQL skills — schema design, query optimization, migrations",
          "REST API design with OpenAPI/Swagger documentation",
          "Experience with Docker and container-based deployments",
          "Understanding of JWT auth, rate limiting, and API security",
          "Familiarity with Redis for caching and session management",
          "Experience writing table-driven tests and achieving 80%+ coverage",
          "Bonus: experience integrating LLM APIs (Claude, GPT)",
        ],
        benefits: [
          "Fully remote — work from anywhere in Europe",
          "Flexible schedule — async-first, results over hours",
          "$1,500/year professional development budget",
          "$1,000 equipment allowance",
          "Own the backend architecture — not just implement tickets",
          "Small team — direct impact on products used by 46K+ people",
          "Paid vacation: 20 days + Ukrainian public holidays",
        ],
      },
      uk: {
        title: "Go Backend Developer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Нові продукти ми пишемо на Go, і нам потрібен бекенд-інженер, який любить цю мову. Ви проєктуватимете й реалізовуватимете API, схеми баз даних і фонові воркери для Jobber (нашого ШІ-трекера вакансій з 15K+ користувачів) та майбутніх продуктів. Наші Go-сервіси обробляють 12K запитів/с із затримкою P99 8 мс на скромних інстансах Hetzner Cloud — ефективність для нас важлива. Ви працюватимете з PostgreSQL, Redis та інтеграцією Claude AI.",
        requirements: [
          "3+ роки продакшн-досвіду з Go (chi/gin/echo, pgx/sqlx)",
          "Сильні навички PostgreSQL — проєктування схем, оптимізація запитів, міграції",
          "Проєктування REST API з документацією OpenAPI/Swagger",
          "Досвід роботи з Docker і деплою в контейнерах",
          "Розуміння JWT-автентифікації, rate limiting і безпеки API",
          "Знайомство з Redis для кешування та керування сесіями",
          "Досвід написання table-driven тестів із покриттям 80%+",
          "Плюсом буде досвід інтеграції LLM API (Claude, GPT)",
        ],
        benefits: [
          "Повністю віддалено — працюйте з будь-якої точки Європи",
          "Гнучкий графік — async-first, важливий результат, а не години",
          "$1,500 на рік на професійний розвиток",
          "$1,000 на обладнання",
          "Ви відповідаєте за архітектуру бекенду, а не лише закриваєте тікети",
          "Невелика команда — прямий вплив на продукти, якими користуються 46K+ людей",
          "Оплачувана відпустка: 20 днів + державні свята України",
        ],
      },
    },
  },
  {
    id: "fullstack-developer",
    type: "full-time",
    datePosted: POSTED_2026_03_20,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "Full-Stack Developer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "We need a versatile engineer who's comfortable across the entire stack. You'll build features end-to-end — from React components to Go API endpoints to PostgreSQL queries. This role is ideal if you don't want to be boxed into 'frontend' or 'backend' and enjoy shipping complete features. You'll rotate across our products, tackling whatever has the highest impact that week.",
        requirements: [
          "3+ years full-stack experience with React/Next.js + a backend language",
          "TypeScript proficiency on the frontend",
          "Go or Node.js experience on the backend (Go preferred)",
          "PostgreSQL — comfortable writing raw SQL, not just ORM queries",
          "Docker basics: writing Dockerfiles, docker-compose for local dev",
          "Understanding of authentication flows (JWT, OAuth)",
          "Ability to work independently and make technical decisions",
          "Bonus: experience with Tailwind CSS and Next.js App Router",
        ],
        benefits: [
          "Fully remote — work from anywhere in Europe",
          "Flexible schedule — async-first culture",
          "$1,500/year professional development budget",
          "$1,000 equipment allowance",
          "Work across the full stack — never get bored",
          "Ship features end-to-end, from DB migration to UI",
          "Paid vacation: 20 days + Ukrainian public holidays",
        ],
      },
      uk: {
        title: "Full-Stack Developer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Нам потрібен універсальний інженер, якому комфортно на всьому стеку. Ви створюватимете функції від початку до кінця — від React-компонентів до ендпоінтів API на Go та запитів до PostgreSQL. Ця роль для вас, якщо не хочете замикатися у «фронтенді» чи «бекенді» й любите випускати завершені функції. Ви переходитимете між нашими продуктами й братиметеся за те, що цього тижня дає найбільший ефект.",
        requirements: [
          "3+ роки full-stack досвіду з React/Next.js і бекенд-мовою",
          "Впевнене володіння TypeScript на фронтенді",
          "Досвід Go або Node.js на бекенді (перевага — Go)",
          "PostgreSQL — ви впевнено пишете сирий SQL, а не лише ORM-запити",
          "Основи Docker: написання Dockerfile, docker-compose для локальної розробки",
          "Розуміння потоків автентифікації (JWT, OAuth)",
          "Уміння працювати самостійно й ухвалювати технічні рішення",
          "Плюсом буде досвід з Tailwind CSS і Next.js App Router",
        ],
        benefits: [
          "Повністю віддалено — працюйте з будь-якої точки Європи",
          "Гнучкий графік — async-first культура",
          "$1,500 на рік на професійний розвиток",
          "$1,000 на обладнання",
          "Робота на всьому стеку — нудно не буде",
          "Функції від початку до кінця, від міграції БД до UI",
          "Оплачувана відпустка: 20 днів + державні свята України",
        ],
      },
    },
  },
  {
    id: "devops-engineer",
    type: "part-time",
    datePosted: POSTED_2026_03_20,
    applicantCountries: EUROPE,
    content: {
      en: {
        title: "DevOps / Infrastructure Engineer",
        department: "Engineering",
        location: "Remote (Europe)",
        description:
          "We run all our products on Hetzner Cloud with Docker Compose, Caddy, and GitHub Actions. As we grow to more products and more traffic, we need someone to own our infrastructure: improve CI/CD pipelines, set up monitoring and alerting, manage database backups, and plan for scaling. This is a part-time role (20h/week) with potential to grow to full-time.",
        requirements: [
          "3+ years experience with Linux server administration",
          "Docker and Docker Compose in production environments",
          "CI/CD pipeline design (GitHub Actions preferred)",
          "Reverse proxy configuration (Caddy or Nginx)",
          "PostgreSQL administration: backups, replication, monitoring",
          "Experience with Hetzner Cloud, DigitalOcean, or similar VPS providers",
          "Terraform or Ansible for infrastructure as code",
          "Monitoring and alerting setup (Prometheus, Grafana, or similar)",
        ],
        benefits: [
          "Part-time (20h/week) — combine with other projects or studies",
          "Fully remote — work on your own schedule",
          "Potential to grow into full-time role",
          "$1,000/year professional development budget",
          "Real infrastructure challenges — not toy setups",
          "Direct impact on reliability for 46K+ users",
        ],
      },
      uk: {
        title: "DevOps / Infrastructure Engineer",
        department: "Розробка",
        location: "Віддалено (Європа)",
        description:
          "Усі наші продукти працюють на Hetzner Cloud із Docker Compose, Caddy та GitHub Actions. Продуктів і трафіку стає більше, тож нам потрібна людина, яка візьме відповідальність за інфраструктуру: покращить CI/CD-пайплайни, налаштує моніторинг і алертинг, керуватиме бекапами баз даних і плануватиме масштабування. Це часткова зайнятість (20 год на тиждень) з можливістю перейти на повну.",
        requirements: [
          "3+ роки досвіду адміністрування Linux-серверів",
          "Docker і Docker Compose у продакшн-середовищах",
          "Проєктування CI/CD-пайплайнів (перевага — GitHub Actions)",
          "Налаштування reverse proxy (Caddy або Nginx)",
          "Адміністрування PostgreSQL: бекапи, реплікація, моніторинг",
          "Досвід з Hetzner Cloud, DigitalOcean або подібними VPS-провайдерами",
          "Terraform або Ansible для інфраструктури як коду",
          "Налаштування моніторингу та алертингу (Prometheus, Grafana або подібні)",
        ],
        benefits: [
          "Часткова зайнятість (20 год на тиждень) — можна поєднувати з іншими проєктами чи навчанням",
          "Повністю віддалено — працюйте за власним графіком",
          "Можливість перейти на повну зайнятість",
          "$1,000 на рік на професійний розвиток",
          "Реальні інфраструктурні задачі, а не іграшкові сетапи",
          "Прямий вплив на надійність сервісів для 46K+ користувачів",
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
