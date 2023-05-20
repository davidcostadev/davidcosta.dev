'use client';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// https://raw.githubusercontent.com/react-syntax-highlighter/react-syntax-highlighter/master/AVAILABLE_LANGUAGES_PRISM.MD
export function Code({ className, ...props }: { className: string }) {
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    <SyntaxHighlighter
      language={match[1]}
      {...props}
      useInlineStyles={false}
      PreTag={'div'}
      CodeTag="div"
      showLineNumbers={true}
    />
  ) : (
    <code className={className} {...props} />
  );
}
