import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ArrowRight } from 'lucide-react';
import Fuse from 'fuse.js';
import { cn } from '@/lib/utils';
import { searchIndex } from '@/data/searchIndex';

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'content', 'section'],
  threshold: 0.4,
  includeMatches: true,
});

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };
    const customHandler = () => setOpen(true);
    window.addEventListener('keydown', handler);
    window.addEventListener('open-search', customHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('open-search', customHandler);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = fuse.search(query).slice(0, 8);
    setResults(found);
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (item) => {
    setOpen(false);
    const hash = item.heading ? `#${item.heading}` : '';
    navigate(item.path + hash);
    if (item.heading) {
      setTimeout(() => {
        document.getElementById(item.heading)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex].item);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Dialog */}
      <div className="relative w-full max-w-lg mx-4 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search size={18} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[320px] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </p>
          )}
          {results.map((result, i) => (
            <button
              key={`${result.item.path}-${result.item.title}-${i}`}
              onClick={() => handleSelect(result.item)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer',
                i === selectedIndex
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-accent'
              )}
            >
              <FileText size={16} className="shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{result.item.title}</p>
                <p className="text-xs text-muted-foreground truncate">{result.item.section}</p>
              </div>
              <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
            </button>
          ))}
          {!query && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Start typing to search the docs
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
