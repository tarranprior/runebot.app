import ReactMarkdown from "react-markdown";

type LegalMarkdownProps = {
  content: string;
};

export function LegalMarkdown({ content }: LegalMarkdownProps) {
  return (
    <div className="space-y-5 text-[15px] leading-7 text-foreground/80 sm:text-base">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1
              className="mt-10 mb-4 text-3xl font-semibold tracking-tight text-foreground first:mt-0"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-foreground first:mt-0"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="mt-8 mb-3 text-xl font-semibold tracking-tight text-foreground"
              {...props}
            />
          ),
          p: ({ ...props }) => <p className="text-foreground/80" {...props} />,
          ul: ({ ...props }) => (
            <ul className="ml-6 list-disc space-y-2 text-foreground/80" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="ml-6 list-decimal space-y-2 text-foreground/80" {...props} />
          ),
          li: ({ ...props }) => <li className="pl-1" {...props} />,
          a: ({ ...props }) => (
            <a
              className="text-accent underline-offset-2 transition hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
