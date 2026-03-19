interface LogoProps {
  readonly size?: "sm" | "md";
}

const sizeConfig = {
  sm: {
    icon: 24,
    svg: 15,
    svgH: 13,
    name: "text-base",
    tld: "text-[8px]",
    gap: "gap-1.5",
  },
  md: {
    icon: 32,
    svg: 20,
    svgH: 17,
    name: "text-lg",
    tld: "text-[9px]",
    gap: "gap-2",
  },
} as const;

function LayersIcon({
  width,
  height,
}: {
  readonly width: number;
  readonly height: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 62 52"
      fill="none"
      className="relative z-10 overflow-visible"
      aria-hidden="true"
    >
      <g className="animate-layer-1">
        <polygon
          points="31,3 57,15 31,27 5,15"
          fill="currentColor"
          opacity=".92"
        />
      </g>
      <line
        x1="5"
        y1="15"
        x2="5"
        y2="25"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity=".18"
      />
      <line
        x1="57"
        y1="15"
        x2="57"
        y2="25"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity=".18"
      />
      <line
        x1="31"
        y1="27"
        x2="31"
        y2="36"
        className="stroke-brand"
        strokeWidth="1.4"
        opacity=".35"
      />
      <g className="animate-layer-2">
        <line
          x1="5"
          y1="25"
          x2="31"
          y2="36"
          stroke="#9E94F9"
          strokeWidth="2.1"
          strokeLinecap="round"
          opacity=".68"
        />
        <line
          x1="31"
          y1="36"
          x2="57"
          y2="25"
          stroke="#9E94F9"
          strokeWidth="2.1"
          strokeLinecap="round"
          opacity=".68"
        />
      </g>
      <line
        x1="5"
        y1="25"
        x2="5"
        y2="35"
        className="stroke-brand"
        strokeWidth="1.4"
        opacity=".28"
      />
      <line
        x1="57"
        y1="25"
        x2="57"
        y2="35"
        className="stroke-brand"
        strokeWidth="1.4"
        opacity=".28"
      />
      <line
        x1="31"
        y1="36"
        x2="31"
        y2="47"
        className="stroke-brand"
        strokeWidth="1.4"
        opacity=".45"
      />
      <g className="animate-layer-3">
        <line
          x1="5"
          y1="35"
          x2="31"
          y2="47"
          className="stroke-brand"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <line
          x1="31"
          y1="47"
          x2="57"
          y2="35"
          className="stroke-brand"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Logo({ size = "md" }: LogoProps) {
  const cfg = sizeConfig[size];

  return (
    <span className={`flex items-center ${cfg.gap}`}>
      {/* Icon container */}
      <span
        className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border text-white dark:text-white"
        style={{
          width: cfg.icon,
          height: cfg.icon,
          background: "#0a0916",
          borderColor: "rgba(123,110,246,0.22)",
          boxShadow:
            "0 0 0 1px rgba(123,110,246,0.07), 0 6px 20px rgba(123,110,246,0.15)",
        }}
      >
        {/* Glow */}
        <span
          className="absolute inset-0 animate-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse at 32% 24%, rgba(123,110,246,0.26) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <LayersIcon width={cfg.svg} height={cfg.svgH} />
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans font-bold tracking-tight text-foreground ${cfg.name}`}
        >
          flux-lab
        </span>
        <span
          className={`font-mono font-medium tracking-[0.3em] text-brand ${cfg.tld}`}
        >
          .dev
        </span>
      </span>
    </span>
  );
}
