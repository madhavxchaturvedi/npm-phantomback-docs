import CodeBlock, { CodeTabs } from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import NextPageLink from '@/components/docs/NextPageLink';

export default function GettingStarted() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Docs
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Getting Started</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Get a fully functional REST API running in under 30 seconds — no database, no backend code required.
      </p>

      {/* ── Installation ── */}
      <h2 id="installation" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Installation
      </h2>
      <p className="text-muted-foreground mb-4">Install PhantomBack globally to use the CLI anywhere:</p>
      <CodeTabs tabs={[
        { label: 'npm', language: 'bash', code: 'npm install -g phantomback' },
        { label: 'yarn', language: 'bash', code: 'yarn global add phantomback' },
        { label: 'pnpm', language: 'bash', code: 'pnpm add -g phantomback' },
        { label: 'npx', language: 'bash', code: 'npx phantomback start --zero' },
      ]} />
      <Callout type="tip">
        Using <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">npx</code> requires no global install — it downloads and runs PhantomBack in a single command.
      </Callout>

      {/* ── Zero-Config Mode ── */}
      <h2 id="zero-config" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Zero-Config Mode
      </h2>
      <p className="text-muted-foreground mb-4">
        The fastest way to start. Use the <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">--zero</code> flag to instantly get a full API
        with 5 pre-configured resources and realistic data:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start --zero`} />
      <p className="text-muted-foreground mb-4 mt-4">This gives you:</p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Resource</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Records</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Auth</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['👤 Users', '25', '✅ Protected'],
              ['📝 Posts', '50', 'No'],
              ['💬 Comments', '100', 'No'],
              ['📦 Products', '30', 'No'],
              ['✅ Todos', '40', 'No'],
            ].map(([resource, records, auth], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 text-foreground">{resource}</td>
                <td className="py-3 px-4 text-muted-foreground">{records}</td>
                <td className="py-3 px-4 text-muted-foreground">{auth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Callout type="info">
        All five resources are immediately available with full CRUD, pagination, search, filtering, and sorting.
        The <strong>users</strong> resource also includes JWT authentication endpoints.
      </Callout>

      {/* ── Custom Configuration ── */}
      <h2 id="custom-config" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Custom Configuration
      </h2>
      <p className="text-muted-foreground mb-4">
        For full control, create a config file. Scaffold one with the <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">init</code> command:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback init`} />
      <p className="text-muted-foreground mb-4 mt-4">
        This creates <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code> with an example blog setup. Edit it to match your needs:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      seed: 20,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
        role: { type: 'enum', values: ['admin', 'user'] },
      },
    },
    posts: {
      seed: 50,
      fields: {
        title: 'sentence',
        body: 'paragraphs',
        userId: { type: 'relation', resource: 'users' },
        published: 'boolean',
      },
    },
  },
};`} />
      <p className="text-muted-foreground mb-4 mt-4">Then start the server:</p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start`} />

      {/* ── Your First Request ── */}
      <h2 id="your-first-request" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Your First Request
      </h2>
      <p className="text-muted-foreground mb-4">Once the server is running, make requests with curl, fetch, or any HTTP client:</p>
      <CodeTabs tabs={[
        { label: 'curl', language: 'bash', code: 'curl http://localhost:3777/api/users' },
        { label: 'fetch', language: 'javascript', code: `const res = await fetch('http://localhost:3777/api/posts?page=1&limit=5');
const data = await res.json();

// data.success → true
// data.data    → Array of posts
// data.meta    → { total, page, totalPages, ... }` },
      ]} />

      <h3 id="response-format" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
        Response Format
      </h3>
      <p className="text-muted-foreground mb-4">
        All responses are wrapped in a consistent envelope:
      </p>
      <CodeBlock language="json" title="GET /api/posts?page=1&limit=2" code={`{
  "success": true,
  "data": [
    { "id": 1, "title": "...", "body": "...", "userId": 3, "published": true },
    { "id": 2, "title": "...", "body": "...", "userId": 1, "published": false }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 2,
    "totalPages": 25
  }
}`} />

      {/* ── Reality Mode ── */}
      <h2 id="reality-mode" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Reality Mode (Chaos Testing)
      </h2>
      <p className="text-muted-foreground mb-4">
        Add the <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">--chaos</code> flag to inject real-world instability — latency spikes, random HTTP failures, dropped connections, and more:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start --zero --chaos`} />
      <Callout type="tip">
        Reality Mode helps you build resilient frontends by simulating production failures during development. See the <a href="/docs/reality-mode" className="text-primary hover:underline font-medium">Reality Mode docs</a> for full configuration options.
      </Callout>

      {/* ── What's Next ── */}
      <h2 id="whats-next" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        What's Next?
      </h2>
      <ul className="space-y-2 text-muted-foreground mb-8">
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">→</span>
          <span><a href="/docs/configuration" className="text-primary font-medium hover:underline">Configuration</a> — all config keys, 40+ field types, latency & chaos options</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">→</span>
          <span><a href="/docs/api-reference" className="text-primary font-medium hover:underline">API Reference</a> — CRUD, pagination, filtering, sorting, search, field selection</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">→</span>
          <span><a href="/docs/authentication" className="text-primary font-medium hover:underline">Authentication</a> — JWT auth with register, login & protected routes</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary mt-1">→</span>
          <span><a href="/docs/programmatic-api" className="text-primary font-medium hover:underline">Programmatic API</a> — use PhantomBack as a library in tests or custom servers</span>
        </li>
      </ul>

      <NextPageLink to="/docs/configuration" label="Configuration Guide" />
    </article>
  );
}
