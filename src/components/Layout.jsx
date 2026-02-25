import { NavLink, Outlet, Link } from 'react-router-dom';
import { Ghost, BookOpen, Settings, Code2, Layers, Terminal, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Layout.css';

const navItems = [
  { to: '/docs/getting-started', label: 'Getting Started', icon: BookOpen },
  { to: '/docs/configuration', label: 'Configuration', icon: Settings },
  { to: '/docs/api-reference', label: 'API Reference', icon: Code2 },
  { to: '/docs/examples', label: 'Examples', icon: Layers },
  { to: '/docs/cli', label: 'CLI Reference', icon: Terminal },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/" className="topbar-brand">
            <Ghost size={22} className="brand-icon" />
            <span>PhantomBack</span>
          </Link>
        </div>
        <div className="topbar-right">
          <span className="version-badge">v1.0.0</span>
          <a href="https://github.com/maddydevgits/phantomback" target="_blank" rel="noreferrer" className="gh-link">
            <Github size={20} />
          </a>
          <a href="https://www.npmjs.com/package/phantomback" target="_blank" rel="noreferrer" className="npm-link">
            npm
          </a>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <span className="sidebar-label">Documentation</span>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="content">
        <div className="content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
