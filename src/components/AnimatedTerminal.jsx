import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const lines = [
  { prompt: true, text: 'npx phantomback start --zero', delay: 0 },
  { prompt: false, text: '', delay: 800 },
  { prompt: false, text: '  👻 PhantomBack v1.0.0', delay: 1000 },
  { prompt: false, text: '', delay: 1100 },
  { prompt: false, text: '  ✔ Generated 6 resources with realistic data', delay: 1300 },
  { prompt: false, text: '  ✔ Auth endpoints ready (register / login)', delay: 1600 },
  { prompt: false, text: '  ✔ Nested routes auto-detected', delay: 1900 },
  { prompt: false, text: '', delay: 2100 },
  { prompt: false, text: '  🚀 Server running at http://localhost:3777', delay: 2300 },
  { prompt: false, text: '', delay: 2600 },
  { prompt: true, text: 'curl localhost:3777/api/users/1', delay: 3000 },
  { prompt: false, text: '', delay: 3600 },
  { prompt: false, text: '  {', delay: 3800 },
  { prompt: false, text: '    "id": 1,', delay: 3900 },
  { prompt: false, text: '    "name": "Alice Johnson",', delay: 4000 },
  { prompt: false, text: '    "email": "alice@example.com",', delay: 4100 },
  { prompt: false, text: '    "role": "admin"', delay: 4200 },
  { prompt: false, text: '  }', delay: 4300 },
];

export default function AnimatedTerminal({ className }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [typingLine, setTypingLine] = useState(null); // { index, text, charIndex }
  const containerRef = useRef(null);

  useEffect(() => {
    const timers = [];

    lines.forEach((line, i) => {
      const timer = setTimeout(() => {
        if (line.prompt && line.text) {
          // Type out prompt lines character by character
          let charIdx = 0;
          setTypingLine({ index: i, text: '', fullText: line.text });
          const typeInterval = setInterval(() => {
            charIdx++;
            if (charIdx <= line.text.length) {
              setTypingLine({ index: i, text: line.text.slice(0, charIdx), fullText: line.text });
            } else {
              clearInterval(typeInterval);
              setTypingLine(null);
              setVisibleLines((prev) => [...prev, { ...line, index: i }]);
            }
          }, 30);
          timers.push(typeInterval);
        } else {
          setVisibleLines((prev) => [...prev, { ...line, index: i }]);
        }
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, typingLine]);

  return (
    <div className={cn(
      'rounded-xl border border-border/60 overflow-hidden shadow-2xl shadow-black/20',
      className
    )}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-border/40">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[11px] text-muted-foreground font-mono ml-2">Terminal</span>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="bg-[#0b0d14] p-4 font-mono text-[13px] leading-relaxed h-[320px] overflow-y-auto"
      >
        {visibleLines.map((line, i) => (
          <div key={i} className="min-h-[1.5em]">
            {line.prompt && (
              <span className="text-emerald-400 select-none">$ </span>
            )}
            <span className={cn(
              line.prompt ? 'text-foreground' : '',
              !line.prompt && line.text.includes('✔') && 'text-emerald-400',
              !line.prompt && line.text.includes('🚀') && 'text-cyan-400',
              !line.prompt && line.text.includes('👻') && 'text-violet-400 font-semibold',
              !line.prompt && (line.text.includes('"') || line.text.includes('{') || line.text.includes('}')) && 'text-amber-300',
              !line.prompt && !line.text.includes('✔') && !line.text.includes('🚀') && !line.text.includes('👻') && !line.text.includes('"') && !line.text.includes('{') && !line.text.includes('}') && 'text-muted-foreground',
            )}>
              {line.text}
            </span>
          </div>
        ))}

        {/* Currently typing line */}
        {typingLine && (
          <div className="min-h-[1.5em]">
            <span className="text-emerald-400 select-none">$ </span>
            <span className="text-foreground">{typingLine.text}</span>
            <span className="inline-block w-[8px] h-[15px] bg-foreground ml-0.5 animate-pulse align-middle" />
          </div>
        )}

        {/* Blinking cursor at end */}
        {!typingLine && visibleLines.length === lines.length && (
          <div className="min-h-[1.5em]">
            <span className="text-emerald-400 select-none">$ </span>
            <span className="inline-block w-[8px] h-[15px] bg-foreground/70 ml-0.5 animate-pulse align-middle" />
          </div>
        )}
      </div>
    </div>
  );
}
