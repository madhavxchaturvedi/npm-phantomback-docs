import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const resolvedTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-md',
          'text-muted-foreground hover:text-foreground hover:bg-accent',
          'transition-colors cursor-pointer'
        )}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 min-w-[140px] rounded-lg border border-border bg-popover p-1 shadow-lg">
          {options.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); setOpen(false); }}
              className={cn(
                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer',
                theme === value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
