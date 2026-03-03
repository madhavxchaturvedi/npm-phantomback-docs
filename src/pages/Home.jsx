import { Link } from 'react-router-dom';
import {
  Ghost, Zap, Shield, Database, Search, Terminal, Layers, FlameKindling,
  ArrowRight, Copy, Check, Github, Package, Star, Sparkles,
  Timer, ServerCrash, Unplug, FileWarning, Hourglass,
  Filter, ListOrdered, Columns, Braces,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/ThemeToggle';
import { useGitHubStars } from '@/hooks/useGitHubStars';
import { useToast } from '@/components/Toast';

/* ── Fake Backend features ── */
const fakeBackendFeatures = [
  { icon: Zap,      title: 'Zero Config',       desc: 'One command → full REST API with realistic data. No setup needed.',          color: 'text-amber-400',   bg: 'bg-amber-500/10' },
  { icon: Database,  title: '40+ Field Types',   desc: 'Names, emails, prices, UUIDs, images, relations & more powered by Faker.js.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { icon: Shield,    title: 'JWT Auth',          desc: 'Register, login, protected routes — built-in with zero backend code.',       color: 'text-blue-400',    bg: 'bg-blue-500/10' },
  { icon: Search,    title: 'Full-text Search',  desc: 'Search any string field with ?q= — case-insensitive, instant results.',     color: 'text-cyan-400',    bg: 'bg-cyan-500/10' },
  { icon: Layers,    title: 'Nested Routes',     desc: 'Relations auto-generate endpoints like /users/1/posts.',                    color: 'text-violet-400',  bg: 'bg-violet-500/10' },
  { icon: Filter,    title: '7 Filter Operators', desc: 'eq, gte, lte, gt, lt, ne, like — all via query params.',                   color: 'text-pink-400',    bg: 'bg-pink-500/10' },
  { icon: ListOrdered, title: 'Sort & Paginate', desc: 'Multi-field sorting, page/limit/offset pagination with meta.',              color: 'text-teal-400',    bg: 'bg-teal-500/10' },
  { icon: Columns,   title: 'Field Selection',   desc: 'Pick fields with ?fields= — return only what you need.',                   color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
  { icon: Braces,    title: 'Programmatic API',  desc: 'Import as a library — access DataStore, Express app, and chaos engine.',    color: 'text-rose-400',    bg: 'bg-rose-500/10' },
];

/* ── Chaos scenarios ── */
const chaosScenarios = [
  { icon: Unplug,      label: 'Connection Drops', desc: 'TCP socket destroyed mid-request',  color: 'text-rose-400',   bg: 'bg-rose-500/10',   rate: '2%' },
  { icon: Hourglass,   label: 'Timeouts',         desc: 'Request hangs with no response',    color: 'text-yellow-400', bg: 'bg-yellow-500/10', rate: '3%' },
  { icon: ServerCrash, label: 'Random Failures',   desc: '500 / 502 / 503 / 504 errors',     color: 'text-red-400',    bg: 'bg-red-500/10',    rate: '10%' },
  { icon: FileWarning, label: 'Corruption',        desc: 'Malformed / truncated JSON',        color: 'text-orange-400', bg: 'bg-orange-500/10', rate: '2%' },
  { icon: Timer,       label: 'Latency Spikes',    desc: '200–5 000 ms random delay',         color: 'text-amber-400',  bg: 'bg-amber-500/10',  rate: '~30%' },
];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};
const stagger = { animate: { transition: { staggerChildren: 0.05 } } };

/* ── Copy-to-clipboard widget ── */
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

/* ══════════════════════════════════════════════════════════════ */

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

      {/* ═══════════ Hero ═══════════ */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-14 pb-24 px-6 overflow-hidden">
        {/* ── Ambient background layers ── */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        {/* Primary glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[radial-gradient(ellipse_at_center,var(--color-primary)_0%,transparent_50%)] opacity-[0.12] pointer-events-none blur-2xl" />
        {/* Cyan accent glow */}
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle,#06b6d4_0%,transparent_55%)] opacity-[0.07] pointer-events-none blur-2xl" />
        {/* Warm accent glow */}
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,#f59e0b_0%,transparent_55%)] opacity-[0.04] pointer-events-none blur-3xl" />

        <motion.div className="relative z-10 text-center max-w-3xl mx-auto" initial="initial" animate="animate" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} transition={{ duration: 0.3 }} className="mb-4 mt-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
              <Sparkles size={12} />
              Open Source &middot; MIT License
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 variants={fadeUp} transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-[4.25rem] font-extrabold leading-[1.12] tracking-[-0.025em] mb-5"
          >
            <span className="text-foreground">From </span>
            <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">zero backend</span>
            <span className="text-foreground"> to</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent"> production chaos</span>
            <span className="text-foreground"> in one command.</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={fadeUp} transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto mb-7 text-base sm:text-lg leading-[1.75] text-muted-foreground"
          >
            A stateful REST API with JWT auth, full-text search, advanced filtering,
            multi-field sorting, pagination, and nested routes — auto-generated.
            Enable <strong className="text-foreground/90 font-semibold">Reality Mode</strong> to
            simulate latency, crashes, dropped connections, and corrupted responses.{' '}
            <strong className="text-foreground/90 font-semibold">Develop against production chaos. Ship confidently.</strong>
          </motion.p>

          {/* Copy command */}
          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="mb-6">
            <CopyCommand />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <Link to="/docs/getting-started"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 transition-all duration-200"
            >
              Get Started <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a href="https://github.com/madhavxchaturvedi/npm-phantomback" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-card/70 transition-all duration-200"
            >
              <Github size={15} /> GitHub
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div variants={fadeUp} transition={{ duration: 0.3 }} className="flex items-center justify-center gap-2.5 flex-wrap">
            {[
              { label: '40+ Field Types', icon: Database },
              { label: 'JWT Auth Built-in', icon: Shield },
              { label: 'Zero Config', icon: Zap },
              { label: 'Chaos Engineering', icon: FlameKindling },
            ].map(({ label, icon: TIcon }) => (
              <span key={label}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground/80 border border-border/50 bg-card/40 backdrop-blur-sm rounded-full px-3 py-1 hover:border-primary/30 hover:text-muted-foreground transition-colors duration-200"
              >
                <TIcon size={11} className="text-primary/60" />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/50"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] font-medium tracking-wide uppercase">Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════ Two Pillars ═══════════ */}

      {/* ── Pillar 1: Fake Backend ── */}
      <section className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-semibold text-primary mb-4">
              <Database size={13} />
              Fake Backend
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              A Complete REST API in
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent"> One Command</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Define resources with a simple schema and get full CRUD, auth, relations, search, filtering, sorting, pagination, and field selection — zero backend code required.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fakeBackendFeatures.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title}
                className="group rounded-2xl border border-border/60 bg-card/50 p-6 hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className={cn('flex items-center justify-center w-11 h-11 rounded-xl mb-4', bg)}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="font-semibold text-foreground text-[15px] mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ── Pillar 2: Reality Mode ── */}
      <section className="relative py-28 px-6 bg-card/30 overflow-hidden">
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

          {/* Scenario cards — ordered by priority (actual codebase order) */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-12">
            {chaosScenarios.map(({ icon: Icon, label, desc, color, bg, rate }) => (
              <div key={label} className="rounded-xl border border-border/60 bg-card/80 p-5 text-center hover:border-orange-500/30 transition-all">
                <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg mx-auto mb-3', bg)}>
                  <Icon size={18} className={color} />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{label}</h4>
                <p className="text-xs text-muted-foreground mb-2">{desc}</p>
                <span className="inline-block text-[10px] font-mono font-semibold text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-full">
                  {rate}
                </span>
              </div>
            ))}
          </div>

          {/* Two-column: CLI + Runtime API */}
          <div className="grid gap-6 lg:grid-cols-2 mb-10">
            <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Terminal size={15} className="text-orange-400" /> Enable with one flag
              </h3>
              <code className="block text-sm font-mono text-foreground/70 bg-surface2 px-4 py-3 rounded-xl border border-border/40">
                phantomback start --zero --chaos
              </code>
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/80 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Braces size={15} className="text-orange-400" /> Control at runtime
              </h3>
              <code className="block text-sm font-mono text-foreground/70 bg-surface2 px-4 py-3 rounded-xl border border-border/40">
                POST /api/_chaos/enable · /configure · /pause
              </code>
            </div>
          </div>

          <div className="text-center">
            <Link to="/docs/reality-mode" className="text-sm text-primary font-medium hover:underline">
              Read the Reality Mode docs &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ How It Works ═══════════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
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
              { num: '1', title: 'Install',            desc: 'Install globally or use npx — no config files needed',           code: 'npm install -g phantomback' },
              { num: '2', title: 'Start the Server',   desc: '5 resources, realistic data, auth, and full CRUD — instantly', code: 'phantomback start --zero' },
              { num: '3', title: 'Add Reality Mode',   desc: 'Inject real-world chaos to test error handling & resilience',  code: 'phantomback start --zero --chaos' },
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

          {/* Config preview */}
          <div className="mt-10 rounded-2xl border border-border/60 bg-card/80 p-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Or define your own resources:</h4>
            <pre className="text-[13px] font-mono text-foreground/70 bg-surface2 px-4 py-4 rounded-xl border border-border/40 overflow-x-auto leading-relaxed">
{`export default {
  resources: {
    posts: {
      seed: 50,
      fields: {
        title: 'sentence',
        body: 'paragraphs',
        userId: { type: 'relation', resource: 'users' },
      },
    },
  },
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to build resilient apps?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Instant fake backend. Real-world chaos testing. All in one tool.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/docs/getting-started"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
            >
              Read the Docs <ArrowRight size={16} />
            </Link>
            <Link to="/docs/playground"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all"
            >
              Try the Playground
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ Footer ═══════════ */}
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
