import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Ghost, BookOpen, Settings, Code2, Layers, Terminal, Github, Menu, X, Search, Package, History, Play, Star, Zap, Shield, Braces } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import TableOfContents from './TableOfContents';
import ReadingProgress from './ReadingProgress';
import { useGitHubStars } from '@/hooks/useGitHubStars';

const navItems = [
  { to: '/docs/getting-started', label: 'Getting Started', icon: BookOpen },
  { to: '/docs/configuration', label: 'Configuration', icon: Settings },
  { to: '/docs/api-reference', label: 'API Reference', icon: Code2 },
  { to: '/docs/authentication', label: 'Authentication', icon: Shield },
  { to: '/docs/reality-mode', label: 'Reality Mode', icon: Zap },
  { to: '/docs/programmatic-api', label: 'Programmatic API', icon: Braces },
  { to: '/docs/examples', label: 'Examples', icon: Layers },
  { to: '/docs/cli', label: 'CLI Reference', icon: Terminal },
  { to: '/docs/playground', label: 'Playground', icon: Play },
  { to: '/docs/changelog', label: 'Changelog', icon: History },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const stars = useGitHubStars();

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  const handleSearchOpen = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Top Bar ─── */}
      <header className="fixed top-0 inset-x-0 z-40 h-14 border-b border-border/50 bg-background/60 backdrop-blur-xl">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors lg:hidden cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link to="/" className="flex items-center gap-2.5 text-foreground">
              <Ghost size={22} className="text-primary" />
              <span className="font-bold tracking-tight">PhantomBack</span>
            </Link>
            <span className="hidden sm:inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              v2.0.0
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1.5">
            {/* Search — desktop */}
            <button onClick={handleSearchOpen}
              className="hidden sm:flex items-center gap-2 h-9 px-3.5 rounded-lg border border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 bg-card/50 transition-colors cursor-pointer"
            >
              <Search size={14} />
              <span className="text-xs">Search...</span>
              <kbd className="ml-5 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>
            {/* Search — mobile */}
            <button onClick={handleSearchOpen}
              className="flex sm:hidden items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search size={16} />
            </button>

            <ThemeToggle />

            <a href="https://github.com/madhavxchaturvedi/npm-phantomback" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm"
              aria-label="GitHub"
            >
              <Github size={16} />
              {stars !== null && (
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  {stars}
                </span>
              )}
            </a>
            <a href="https://www.npmjs.com/package/phantomback" target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              aria-label="npm"
            >
              <Package size={16} />
            </a>
          </div>
        </div>
      </header>

      {/* ─── Sidebar ─── */}
      <aside className={cn(
        'fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 border-r border-border/50 bg-background/80 backdrop-blur-xl overflow-y-auto',
        'transition-transform duration-200 ease-in-out',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <nav className="p-5 space-y-1">
          <p className="px-3 pt-1 pb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Documentation
          </p>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon size={15} className="shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ─── Main Content ─── */}
      <main className="lg:pl-64 pt-14">
        <ReadingProgress />
        <div className="flex">
          <div className="flex-1 min-w-0 max-w-4xl mx-auto px-6 py-12 lg:px-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Table of Contents */}
          <div className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-20 py-12 pr-6">
              <TableOfContents />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
