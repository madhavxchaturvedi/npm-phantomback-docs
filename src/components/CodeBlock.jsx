import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check, FileCode, TerminalSquare } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';
import { useToast } from './Toast';

const langLabels = {
  javascript: 'JS',
  js: 'JS',
  json: 'JSON',
  bash: 'Shell',
  html: 'HTML',
  css: 'CSS',
  typescript: 'TS',
  jsx: 'JSX',
  tsx: 'TSX',
};

export default function CodeBlock({ code, language = 'javascript', title, highlightLines = [], terminal = false }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const toast = useToast();

  const resolvedTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  const prismTheme = resolvedTheme === 'dark' ? themes.nightOwl : themes.github;

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    toast('Copied to clipboard!', 'copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      'group relative my-4 rounded-lg border overflow-hidden',
      'border-border bg-surface2',
      terminal && 'border-success/20'
    )}>
      {/* Header */}
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {terminal ? <TerminalSquare size={14} className="text-success" /> : <FileCode size={14} />}
            {title && <span className="font-medium">{title}</span>}
            {!title && language && (
              <span className="font-medium">{langLabels[language] || language}</span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors cursor-pointer',
              copied
                ? 'text-success'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {/* No header — floating copy button */}
      {!title && !language && (
        <button
          onClick={handleCopy}
          className={cn(
            'absolute top-2 right-2 z-10 flex items-center justify-center w-7 h-7 rounded-md',
            'opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer',
            copied
              ? 'text-success bg-success/10'
              : 'text-muted-foreground hover:text-foreground bg-surface hover:bg-accent'
          )}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      )}

      {/* Code */}
      <Highlight theme={prismTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(className, 'overflow-x-auto p-4 text-[13px] leading-relaxed')}
            style={{ ...style, background: 'transparent', margin: 0 }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              const isHighlighted = highlightLines.includes(i + 1);
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={cn(
                    lineProps.className,
                    isHighlighted && 'bg-primary/10 -mx-4 px-4 border-l-2 border-primary'
                  )}
                >
                  <span className={cn(
                    'inline-block w-8 text-right mr-4 select-none',
                    isHighlighted ? 'text-primary' : 'text-muted-foreground/50'
                  )}>
                    {terminal ? '$' : i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export function CodeTabs({ tabs }) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-border bg-surface">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-xs font-medium transition-colors cursor-pointer',
              i === active
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Active tab content */}
      <CodeBlock
        code={tabs[active].code}
        language={tabs[active].language || 'bash'}
        title={null}
      />
    </div>
  );
}
