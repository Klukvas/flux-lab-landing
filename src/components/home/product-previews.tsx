import Image from "next/image";
import { studioStyles as styles } from "./studio-styles";

type PreviewProps = { readonly uk: boolean };
const text = (uk: boolean, en: string, translated: string) =>
  uk ? translated : en;

export function RadarPreview({ uk }: PreviewProps) {
  const findings = [
    {
      severity: text(uk, "FIX FIRST", "НАСАМПЕРЕД"),
      count: text(uk, "3 links", "3 посилання"),
      title: text(uk, "Broken links", "Неробочі посилання"),
      detail: text(
        uk,
        "Links lead to pages that no longer exist. Visitors hit a dead end instead of your booking form.",
        "Посилання ведуть на сторінки, яких більше немає. Відвідувачі не можуть дістатися форми запису.",
      ),
      evidence: "/services/old-page → 404",
      action: text(
        uk,
        "Point each link at the right page or remove it.",
        "Замініть адресу на актуальну або видаліть посилання.",
      ),
      example: "/services/old-page → /services",
      urgent: true,
    },
    {
      severity: text(uk, "WORTH FIXING", "ВАРТО ВИПРАВИТИ"),
      count: text(uk, "4 pages", "4 сторінки"),
      title: text(uk, "Missing page descriptions", "Відсутні описи сторінок"),
      detail: text(
        uk,
        "Without a description, Google may show a random piece of text under your link.",
        "Без опису Google може показувати випадковий уривок тексту під посиланням.",
      ),
      evidence: '<meta name="description">',
      action: text(
        uk,
        "Write one or two clear sentences for each page.",
        "Напишіть одне або два зрозумілі речення для кожної сторінки.",
      ),
      example: text(
        uk,
        "“Car wash services in Kyiv. Book online and get a clean car today.”",
        "«Автомийка в Києві. Запишіться онлайн та помийте авто сьогодні.»",
      ),
      urgent: false,
    },
    {
      severity: text(uk, "WORTH FIXING", "ВАРТО ВИПРАВИТИ"),
      count: text(uk, "12 images", "12 зображень"),
      title: text(uk, "Missing image alt text", "Відсутній alt-текст"),
      detail: text(
        uk,
        "Some pictures have no description for search engines and people using screen readers.",
        "Деякі зображення не мають опису для пошукових систем та користувачів скринридерів.",
      ),
      evidence: '<img alt="">',
      action: text(
        uk,
        "Add a short, clear description of what is in the image.",
        "Додайте короткий і зрозумілий опис зображення.",
      ),
      example: text(
        uk,
        'alt="Car wash entrance with sign"',
        'alt="Вхід на автомийку з вивіскою"',
      ),
      urgent: false,
    },
  ];
  return (
    <figure className={`${styles.preview} ${styles.report}`}>
      <figcaption className={styles.previewCaption}>
        <span>{text(uk, "Example report", "Приклад звіту")}</span>
        <span>
          {text(
            uk,
            "Illustrative findings and actions",
            "Приклади проблем і рішень",
          )}
        </span>
      </figcaption>
      <div className={styles.reportHead}>
        <span>{text(uk, "Severity", "Пріоритет")}</span>
        <span>{text(uk, "Finding & evidence", "Проблема та докази")}</span>
        <span>{text(uk, "What to do", "Що робити")}</span>
      </div>
      {findings.map((f) => (
        <div
          key={f.title}
          className={`${styles.reportRow} ${f.urgent ? styles.urgent : ""}`}
        >
          <div className={styles.severity}>
            <span className={styles.warning}>!</span>
            <div>
              <strong>{f.severity}</strong>
              <small>{f.count}</small>
            </div>
          </div>
          <div>
            <h4>{f.title}</h4>
            <p>{f.detail}</p>
            <code>{f.evidence}</code>
          </div>
          <div>
            <p>{f.action}</p>
            <code>{f.example}</code>
          </div>
        </div>
      ))}
    </figure>
  );
}

export function WashPreview({ uk }: PreviewProps) {
  return (
    <figure className={`${styles.preview} ${styles.washPreview}`}>
      <figcaption className={styles.previewCaption}>
        {text(
          uk,
          "Example schedule & booking review",
          "Приклад розкладу та перевірки запису",
        )}
      </figcaption>
      <div className={styles.previewTabs}>
        <span>{text(uk, "Orders", "Замовлення")}</span>
        <strong>{text(uk, "Schedule", "Розклад")}</strong>
      </div>
      <div className={styles.filters}>
        <span>
          <small>{text(uk, "Branch", "Філія")}</small>
          {text(uk, "Kyiv (Main)", "Київ (Основна)")}
        </span>
        <span>
          <small>{text(uk, "Date", "Дата")}</small>20.03.2026
        </span>
        <span>
          <small>{text(uk, "Work post", "Пост")}</small>
          {text(uk, "Any", "Будь-який")}
        </span>
      </div>
      <table className={styles.schedule}>
        <thead>
          <tr>
            <th>{text(uk, "Post", "Пост")}</th>
            {["09:00", "09:30", "10:00", "10:30"].map((time) => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((post) => (
            <tr key={post}>
              <th>
                {text(uk, "Post", "Пост")} {post}
              </th>
              {[0, 1, 2, 3].map((slot) => (
                <td
                  key={slot}
                  className={post === 3 ? styles.occupied : styles.free}
                >
                  {post === 3
                    ? text(uk, "Busy", "Зайнято")
                    : text(uk, "Free", "Вільно")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.review}>
        <h4>{text(uk, "Review & Confirm", "Перевірка запису")}</h4>
        <dl>
          <div>
            <dt>{text(uk, "Service", "Послуга")}</dt>
            <dd>{text(uk, "Full car wash", "Комплексна мийка")}</dd>
          </div>
          <div>
            <dt>{text(uk, "Time slot", "Час")}</dt>
            <dd>20.03.2026 · 10:00</dd>
          </div>
          <div>
            <dt>{text(uk, "Vehicle", "Автомобіль")}</dt>
            <dd>{text(uk, "Passenger car", "Легковий")}</dd>
          </div>
          <div>
            <dt>{text(uk, "Worker", "Працівник")}</dt>
            <dd>{text(uk, "Any available", "Будь-який вільний")}</dd>
          </div>
        </dl>
        <p className={styles.exampleNote}>
          {text(
            uk,
            "A clear review before a booking is confirmed.",
            "Усі деталі перед підтвердженням запису.",
          )}
        </p>
      </div>
    </figure>
  );
}

export function CursopusPreview({ uk }: PreviewProps) {
  const columns = [
    {
      name: text(uk, "Wishlist", "Бажані"),
      roles: ["Infrastructure Engineer", "Applied Scientist", "ML Engineer"],
    },
    {
      name: text(uk, "Applied", "Подано"),
      roles: ["Software Engineer II", "Data Engineer"],
    },
    {
      name: text(uk, "Screening", "Скринінг"),
      roles: [
        "Backend Engineer (Go)",
        "Backend Engineer — Payments",
        "Full Stack Engineer",
      ],
    },
  ];
  return (
    <figure className={`${styles.preview} ${styles.cursopusPreview}`}>
      <figcaption className={styles.previewCaption}>
        {text(
          uk,
          "Example application board & resume",
          "Приклад дошки заявок і резюме",
        )}
      </figcaption>
      <h4 className={styles.boardTitle}>
        {text(uk, "Applications", "Заявки")}
        <span>{text(uk, "Board view", "Дошка")}</span>
      </h4>
      <div className={styles.board}>
        {columns.map((col) => (
          <div className={styles.boardColumn} key={col.name}>
            <h5>
              <i />
              {col.name}
              <span>{col.roles.length}</span>
            </h5>
            {col.roles.map((role) => (
              <div className={styles.job} key={role}>
                <span>{role}</span>
                <i />
                <i />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.resume}>
        <h4>{text(uk, "Resumes", "Резюме")}</h4>
        <div className={styles.resumeFile}>
          <span aria-hidden="true">▤</span>
          <div>
            <strong>
              {text(uk, "Software Engineer Resume", "Резюме інженера")}
            </strong>
            <small>
              {text(
                uk,
                "Tailored for your next application",
                "Підготовлене для наступної заявки",
              )}
            </small>
          </div>
        </div>
      </div>
    </figure>
  );
}

export function AutoPreview({ uk }: PreviewProps) {
  return (
    <figure className={`${styles.preview} ${styles.autoPreview}`}>
      <figcaption className={styles.previewCaption}>
        {text(uk, "Sample inventory", "Приклад каталогу")}
      </figcaption>
      <div className={styles.filters}>
        <span>BMW</span>
        <span>5 Series</span>
        <span>2020–2022</span>
      </div>
      <div className={styles.carCards}>
        {["BMW 5 Series 530i xDrive", "BMW 520d Steptronic"].map(
          (name, index) => (
            <div className={styles.carCard} key={name}>
              <div
                className={`${styles.carPhoto} ${index === 1 ? styles.secondCar : ""}`}
              >
                <Image
                  src="/images/projects/autoflow_v2_03_catalog.webp"
                  alt={name}
                  width={2560}
                  height={1280}
                  sizes="1100px"
                />
              </div>
              <h4>{name}</h4>
              <p>{index === 0 ? "2021 · 42 000 km" : "2019 · 98 000 km"}</p>
              <span>
                {text(
                  uk,
                  "Photos, specifications & availability",
                  "Фото, характеристики й наявність",
                )}
              </span>
            </div>
          ),
        )}
      </div>
    </figure>
  );
}

export function MarketPreview({ uk }: PreviewProps) {
  return (
    <figure className={`${styles.preview} ${styles.marketPreview}`}>
      <figcaption className={styles.previewCaption}>
        {text(uk, "Example receipt design", "Приклад дизайну чека")}
      </figcaption>
      <div className={styles.receiptHeader}>
        <strong>▤ ReceiptMaster</strong>
        <span>{text(uk, "Receipt design", "Дизайн чека")}</span>
      </div>
      <h4>{text(uk, "Template Selection", "Вибір шаблону")}</h4>
      <p>
        {text(uk, "Three layouts for PDF receipts.", "Три формати PDF-чеків.")}
      </p>
      <div className={styles.templates}>
        {["Standard", "Compact", "Thermal"].map((name, index) => (
          <div
            key={name}
            className={`${styles.template} ${index === 0 ? styles.selectedTemplate : ""}`}
          >
            <div
              className={`${styles.paper} ${index === 2 ? styles.thermal : ""}`}
            >
              <b />
              {[0, 1, 2, 3, 4].map((line) => (
                <i key={line} />
              ))}
              <hr />
              <i />
            </div>
            <strong>{name}</strong>
            <small>
              {text(
                uk,
                index === 0
                  ? "Standard design"
                  : index === 1
                    ? "Compact design"
                    : "Thermal design",
                index === 0
                  ? "Стандартний"
                  : index === 1
                    ? "Компактний"
                    : "Термочек",
              )}
            </small>
            {index === 0 && (
              <span
                className={styles.selectedCheck}
                aria-label={text(uk, "Selected example", "Вибраний приклад")}
              >
                ✓
              </span>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

export function LifePreview({ uk }: PreviewProps) {
  const chapters = uk
    ? ["Стартап", "Подорож до Праги", "Курс Rust"]
    : ["Startup", "Prague trip", "Rust course"];
  return (
    <figure className={`${styles.preview} ${styles.lifePreview}`}>
      <figcaption className={styles.previewCaption}>
        {text(uk, "Example timeline", "Приклад таймлайну")}
      </figcaption>
      <div className={styles.previewTabs}>
        <strong>{text(uk, "Timeline", "Таймлайн")}</strong>
        <span>{text(uk, "Chapters", "Розділи")}</span>
        <span>{text(uk, "Moods", "Настрої")}</span>
        <b>{text(uk, "Your timeline", "Ваш таймлайн")}</b>
      </div>
      <div
        className={styles.lifeGrid}
        role="img"
        aria-label={text(
          uk,
          "Three life chapters with daily mood circles in different colors",
          "Три розділи життя з кольоровими колами щоденних настроїв",
        )}
      >
        {chapters.map((chapter, row) => (
          <div className={styles.lifeRow} key={chapter}>
            <span>{chapter}</span>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <i
                key={day}
                style={{
                  background: [
                    "#00c98c",
                    "#9044fa",
                    "#167bff",
                    "#353b49",
                    "#ff9e32",
                  ][(day + row * 2) % 5],
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <p className={styles.exampleNote}>
        {text(
          uk,
          "Days, moods and memories, connected by the chapters you choose.",
          "Дні, настрої та спогади, об’єднані вашими розділами життя.",
        )}
      </p>
    </figure>
  );
}
