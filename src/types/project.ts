export type ProjectStatus = "active" | "beta" | "coming-soon" | "archived";

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
  readonly title: string;
  readonly description: string;
  readonly features: readonly string[];
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
  readonly color: string;
  readonly icon: string;
  readonly url?: string;
  readonly github?: string;
  readonly featured: boolean;
  readonly stats?: ProjectStats;
  readonly launchDate: string;
}
