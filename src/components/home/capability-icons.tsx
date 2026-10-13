import type { ReactNode } from "react";

/** One small line icon per capability row, drawn in a 24-unit box with a 1.6 stroke. */
export const CAPABILITY_ICONS: Record<string, ReactNode> = {
  discovery: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  flows: <path d="M4 7h6l4 10h6M4 17h6M14 7h6M18 5l2 2-2 2M18 15l2 2-2 2" />,
  design: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <path d="M17 14v6M14 17h6" />
    </>
  ),
  mvp: <path d="M5 19l4-4M13 5l6 6-7 7-6-6zM12 8l4 4M15 3l1.5 1.5M19.5 7.5 21 9" />,
  ai: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  analytics: <path d="M4 19h16M6 15l4-4 3 3 5-6M14 8h4v4" />,
  frontend: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 9h18M8 21h8M7 6.5h.01M10 6.5h.01" />
    </>
  ),
  backend: (
    <>
      <rect x="3.5" y="4" width="17" height="6" rx="1.5" />
      <rect x="3.5" y="14" width="17" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeWidth="2.5" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  apis: <path d="M9 7H6.5a3.5 3.5 0 000 7H9M15 7h2.5a3.5 3.5 0 010 7H15M8 10.5h8M4 20l3-3M20 4l-3 3" />,
  multitenant: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M14.5 18c.3-2.2 1.6-3.5 3.5-3.5 2 0 3.5 1.5 3.5 4" />
    </>
  ),
  realtime: <path d="M13 3L5 13.5h6L11 21l8-10.5h-6z" />,
  mobile: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 5h3M12 18.5h.01" strokeWidth="2" />
    </>
  ),
  cicd: <path d="M4 7l4 5-4 5M10 17h10M14 4a4 4 0 014 4M18 4l1 4-4 1" />,
  infra: <path d="M7 18a4 4 0 01-.6-7.95A6 6 0 0118 9.5a3.5 3.5 0 01-.5 7H7z" />,
  monitoring: <path d="M3 12h4l2-6 3 12 3-8 1.5 2H21" />,
  security: <path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6zM9.5 12l2 2 3.5-4" />,
  audits: <path d="M4 14a8 8 0 0116 0M12 14l4-4M12 14h.01" />,
  payments: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h3" />
    </>
  ),
};
