import { Link } from 'react-router-dom';
import { Ghost, Zap, Shield, Database, Search, Terminal, Layers, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import './Home.css';

const features = [
  { icon: Zap, title: 'Zero Config', desc: 'Run one command and get a full REST API with realistic data. No setup needed.', color: 'var(--yellow)' },
  { icon: Database, title: 'Smart Data', desc: 'Auto-generates realistic data using 40+ field types — names, emails, prices & more.', color: 'var(--green)' },
  { icon: Shield, title: 'Built-in Auth', desc: 'JWT authentication with register, login, and protected routes out of the box.', color: 'var(--blue)' },
  { icon: Search, title: 'Full-text Search', desc: 'Search, filter, sort, and paginate across any resource with query params.', color: 'var(--cyan)' },
  { icon: Layers, title: 'Nested Routes', desc: 'Auto-detects relations and creates nested endpoints like /posts/1/comments.', color: 'var(--primary)' },
  { icon: Terminal, title: 'Powerful CLI', desc: 'Start servers, scaffold configs, customize ports and prefixes from the terminal.', color: 'var(--red)' },
];

function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const cmd = 'npx phantomback start --zero';
  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="cmd-box" onClick={handleCopy}>
      <code>$ {cmd}</code>
      <span className="cmd-copy">{copied ? <Check size={14} /> : <Copy size={14} />}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">
            <Ghost size={14} />
            Open Source &middot; MIT License
          </div>
          <h1 className="hero-title">
            Instant Fake Backend<br />
            <span className="gradient-text">for Frontend Developers</span>
          </h1>
          <p className="hero-desc">
            Generate a full REST API with realistic data, authentication, pagination,
            search, filtering & nested routes — in seconds. No database, no backend code.
          </p>
          <CopyCommand />
          <div className="hero-actions">
            <Link to="/docs/getting-started" className="btn-primary">
              Get Started <ArrowRight size={16} />
            </Link>
            <a href="https://github.com/maddydevgits/phantomback" target="_blank" rel="noreferrer" className="btn-outline">
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-desc">
          PhantomBack gives you a complete API backend without writing a single line of backend code.
        </p>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, desc, color }) => (
            <div className="feature-card" key={title}>
              <div className="feature-icon" style={{ color, background: `${color}15` }}>
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Demo */}
      <section className="demo-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <div>
              <h4>Install</h4>
              <code>npm install -g phantomback</code>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div>
              <h4>Start</h4>
              <code>phantomback start --zero</code>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div>
              <h4>Use</h4>
              <code>GET http://localhost:3777/api/users</code>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to build faster?</h2>
        <p>Stop waiting for the backend. Start building your frontend now.</p>
        <Link to="/docs/getting-started" className="btn-primary large">
          Read the Docs <ArrowRight size={16} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          Built by <strong>Madhav Chaturvedi</strong> &middot;
          <a href="https://github.com/maddydevgits/phantomback" target="_blank" rel="noreferrer"> GitHub</a> &middot;
          <a href="https://www.npmjs.com/package/phantomback" target="_blank" rel="noreferrer"> npm</a>
        </p>
      </footer>
    </div>
  );
}
