export interface BlogPostMeta {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly author: string;
  readonly tags: readonly string[];
  readonly readingTime: number;
  readonly image?: string;
  readonly locale: string;
}

export interface BlogPost extends BlogPostMeta {
  readonly content: string;
}

export interface TableOfContentsItem {
  readonly id: string;
  readonly title: string;
  readonly level: number;
}
