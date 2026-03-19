'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogContentProps {
  readonly content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-brand prose-a:underline prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] dark:prose-code:bg-gray-800 prose-pre:rounded-xl prose-pre:bg-gray-950 prose-pre:text-sm dark:prose-pre:bg-gray-900 prose-img:rounded-xl prose-strong:text-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
