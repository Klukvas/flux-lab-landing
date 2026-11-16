export type ProjectStatus =
  "active" | "beta" | "coming-soon" | "in-development" | "archived";

export interface ProjectFeature {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

export interface ProjectStats {
  readonly users: number;
  readonly companies: number;
}

export interface ProjectHighlight {
  readonly label: string;
  readonly value: string;
}

export interface ProjectScreenshot {
  readonly src: string;
  /** Same screen in the dark theme; shown instead of `src` while the site is dark. */
  readonly srcDark?: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
}

/** One visual direction a template can be dressed in for a client, shown as a mockup. */
export interface ProjectDesign {
  readonly src: string;
  readonly name: string;
  readonly description: string;
}

export interface ProjectDesignGallery {
  /** One line above the grid saying what the designs are and what the live demo shows. */
  readonly intro: string;
  readonly items: readonly ProjectDesign[];
}

/** One number stuck beside a project's card in the catalog. */
export interface ProjectCatalogStat {
  readonly value: string;
  readonly label: string;
}

export type ProjectScheduleSlot = "free" | "busy";

/**
 * One small piece of the product's own interface, drawn in code on its catalog card so the
 * card shows how the product looks without a cropped screenshot.
 */
export type ProjectCatalogMotif =
  | {
      readonly kind: "finding";
      readonly badge: string;
      readonly text: string;
      readonly hint: string;
    }
  | {
      readonly kind: "stages";
      readonly stages: readonly {
        readonly label: string;
        readonly count: number;
        readonly color: string;
      }[];
    }
  | {
      readonly kind: "schedule";
      readonly rows: readonly {
        readonly label: string;
        readonly slots: readonly ProjectScheduleSlot[];
      }[];
      readonly freeLabel: string;
      readonly busyLabel: string;
    }
  | {
      readonly kind: "listing";
      readonly caption: string;
      readonly price: string;
    }
  | {
      readonly kind: "receipt";
      readonly title: string;
      readonly lines: readonly {
        readonly label: string;
        readonly amount: string;
      }[];
      readonly totalLabel: string;
      readonly total: string;
    }
  | { readonly kind: "days"; readonly caption: string }
  | {
      readonly kind: "product";
      readonly brand: string;
      readonly name: string;
      readonly price: string;
      readonly stock: string;
      readonly action: string;
    };

/** What the projects catalog shows for a product beyond its tagline and description. */
export interface ProjectCatalog {
  /** Who the product is for, short enough for one line after "For". */
  readonly audience?: string;
  readonly stats: readonly ProjectCatalogStat[];
  readonly motif?: ProjectCatalogMotif;
}

export interface Project {
  readonly slug: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly overview: string;
  readonly challenge: string;
  readonly solution: string;
  readonly targetAudience: string;
  readonly status: ProjectStatus;
  readonly tags: readonly string[];
  readonly techStack: readonly string[];
  readonly features: readonly ProjectFeature[];
  readonly highlights: readonly ProjectHighlight[];
  readonly integrations: readonly string[];
  readonly screenshots: readonly ProjectScreenshot[];
  readonly designs?: ProjectDesignGallery;
  readonly catalog?: ProjectCatalog;
  readonly color: string;
  readonly icon: string;
  readonly url?: string;
  readonly github?: string;
  readonly featured: boolean;
  readonly stats?: ProjectStats;
  readonly launchDate: string;
}
