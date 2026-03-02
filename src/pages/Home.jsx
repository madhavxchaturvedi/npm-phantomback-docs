import { Link } from 'react-router-dom';
import {
  Ghost, Zap, Shield, Database, Search, Terminal, Layers, FlameKindling,
  ArrowRight, Copy, Check, Github, Package, Star, Sparkles,
  Timer, ServerCrash, Unplug, FileWarning, Hourglass,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { useGitHubStars } from '@/hooks/useGitHubStars';
import { useToast } from '@/components/Toast';

const features = [
  { icon: Zap, title: 'Zero Config', desc: 'Run one command and get a full REST API with realistic data. No setup needed.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { icon: Database, title: 'Smart Data', desc: 'Auto-generates realistic data using 40+ field types — names, emails, prices & more.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Shield, title: 'Built-in Auth', desc: 'JWT authentication with register, login, and protected routes out of the box.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { icon: Search, title: 'Full-text Search', desc: 'Search, filter, sort, and paginate across any resource with query params.', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { icon: Layers, title: 'Nested Routes', desc: 'Auto-detects relations and creates nested endpoints like /posts/1/comments.', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { icon: Terminal, title: 'Powerful CLI', desc: 'Start servers, scaffold configs, customize ports and prefixes from the terminal.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { icon: FlameKindling, title: 'Reality Mode', desc: 'Chaos engineering for your fake backend — inject latency, failures, and dropped connections.', color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};
const stagger = { animate: { transition: { staggerChildren: 0.05 } } };

function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const toast = useToast();
  const cmd = 'npx phantomback start --zero';
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(cmd);
        setCopied(true);
        toast('Copied to clipboard!', 'copied');
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-3 rounded-xl border border-border/60 bg-card/80 px-5 py-3 hover:border-primary/40 transition-all cursor-pointer group backdrop-blur-sm"
    >
      <span className="text-emerald-400 font-mono text-sm select-none">$</span>
      <code className="text-sm font-mono text-foreground/80">{cmd}</code>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors ml-1">
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
      </span>
    </button>
  );
}

export default function Home() {
  const stars = useGitHubStars();
  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navbar ─── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-6">
          <Link to="/" className="flex items-center gap-2.5 text-foreground">
            <Ghost size={22} className="text-primary" />
            <span className="font-bold tracking-tight">PhantomBack</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              to="/docs/getting-started"
              className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-accent"
            >
              Docs
            </Link>
            <a href="https://github.com/madhavxchaturvedi/npm-phantomback" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 h-9 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm">
              <Github size={17} />
              {stars !== null && (
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  {stars}
                </span>
              )}
            </a>
            <a href="https://www.npmjs.com/package/phantomback" target="_blank" rel="noreferrer"
              className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <Package size={17} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-14 pb-24 px-6 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        {/* Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_60%)] opacity-[0.08] pointer-events-none" />
        {/* Secondary glow */}
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,#06b6d4_0%,transparent_60%)] opacity-[0.04] pointer-events-none" />

        <motion.div className="relative z-10 text-center max-w-4xl mx-auto" initial="initial" animate="animate" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.3 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary mb-8">
              <Sparkles size={13} />
              Open Source &middot; MIT License
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} transition={{ duration: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-foreground mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Fake Backend.
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-rose-500 bg-clip-text text-transparent">
              Real-World Chaos.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} transition={{ duration: 0.35 }}
            className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Instant REST API with realistic data, auth, pagination & search — then flip on
            Reality Mode to inject latency, failures, and dropped connections. Build resilient frontends from day one.
          </motion.p>

          {/* Copy command */}
          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="mb-8">
            <CopyCommand />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <a href="https://github.com/madhavxchaturvedi/npm-phantomback" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
            >
              <Github size={16} /> GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      </section>

      {/* ─── Features ─── */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A complete API backend without writing a single line of backend code.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title}
                className="group rounded-2xl border border-border/60 bg-card/50 p-7 hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className={cn('flex items-center justify-center w-12 h-12 rounded-xl mb-5', bg)}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Reality Mode Showcase ─── */}
      <section className="relative py-28 px-6 bg-card/30 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(circle,#f97316_0%,transparent_60%)] opacity-[0.06] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 text-xs font-semibold text-orange-400 mb-4">
              <FlameKindling size={13} />
              Reality Mode
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Chaos Engineering for Your
              <span className="bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent"> Fake Backend</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Production APIs are unreliable. Reality Mode injects controlled instability so your frontend
              handles failures gracefully — before your users hit them.
            </p>
          </div>

          {/* Scenario cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            {[
              { icon: Timer, label: 'Latency Spikes', desc: '200–5000ms random delay', color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { icon: ServerCrash, label: 'Random Failures', desc: '500, 502, 503, 504 errors', color: 'text-red-400', bg: 'bg-red-500/10' },
              { icon: Unplug, label: 'Connection Drops', desc: 'Socket destroyed mid-request', color: 'text-rose-400', bg: 'bg-rose-500/10' },
              { icon: FileWarning, label: 'Corruption', desc: 'Malformed JSON responses', color: 'text-orange-400', bg: 'bg-orange-500/10' },
              { icon: Hourglass, label: 'Timeouts', desc: 'Requests hang forever', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
            ].map(({ icon: Icon, label, desc, color, bg }) => (
              <div key={label} className="rounded-xl border border-border/60 bg-card/80 p-5 text-center hover:border-orange-500/30 transition-all">
                <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg mx-auto mb-3', bg)}>
                  <Icon size={18} className={color} />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{label}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* One-liner + link */}
          <div className="text-center">
            <code className="inline-block text-sm font-mono text-foreground/70 bg-surface2 px-5 py-2.5 rounded-xl border border-border/40 mb-6">
              phantomback start --zero --chaos
            </code>
            <p className="text-sm text-muted-foreground">
              One flag to enable. Runtime API to control.{' '}
              <Link to="/docs/reality-mode" className="text-primary font-medium hover:underline">
                Read the full docs &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
              Quick Start
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Three Steps. That's It.
            </h2>
            <p className="text-muted-foreground text-lg">
              From zero to a full REST API in under 30 seconds.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { num: '1', title: 'Install', desc: 'Install globally or use npx', code: 'npm install -g phantomback' },
              { num: '2', title: 'Start the Server', desc: 'Launch with zero-config mode', code: 'phantomback start --zero' },
              { num: '3', title: 'Add Chaos', desc: 'Enable Reality Mode for resilience testing', code: 'phantomback start --zero --chaos' },
            ].map((step) => (
              <div key={step.num}
                className="flex items-start gap-5 rounded-2xl border border-border/60 bg-card/80 p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-lg shrink-0">
                  {step.num}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
                  <code className="inline-block text-sm font-mono text-foreground/70 bg-surface2 px-3 py-1.5 rounded-lg border border-border/40">
                    {step.code}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to build resilient apps?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Instant fake backend. Real-world chaos testing. All in one tool.
          </p>
          <Link to="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
          >
            Read the Docs <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/60 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Ghost size={16} className="text-primary" />
              Built by{' '}
              <a href="https://madhavxchaturvedi.vercel.app/" target="_blank" rel="noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors">
                Madhav Chaturvedi
              </a>
            </div>
            <div className="flex items-center gap-5 text-sm text-muted-foreground">
              <a href="https://github.com/madhavxchaturvedi/npm-phantomback" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
              <a href="https://www.npmjs.com/package/phantomback" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">npm</a>
              <a href="https://phantombackxdocs.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Docs</a>
              <a href="https://www.linkedin.com/in/madhavxchaturvedi/" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/madhavxchaturvedi" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground/60">
            MIT License · © {new Date().getFullYear()} PhantomBack
          </div>
        </div>
      </footer>
    </div>
  );
}
