import CodeBlock from '@/components/CodeBlock';
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

      <h2 id="installation" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Installation
      </h2>
      <p className="text-muted-foreground mb-4">Install PhantomBack globally to use the CLI anywhere:</p>
      <CodeBlock language="bash" title="Terminal" code={`npm install -g phantomback`} />
      <p className="text-muted-foreground mb-4 mt-4">Or use it directly with npx (no install needed):</p>
      <CodeBlock language="bash" title="Terminal" code={`npx phantomback start --zero`} />

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
      count: 20,
      auth: true,
      schema: {
        name: 'fullName',
        email: 'email',
        avatar: 'avatar',
        role: { type: 'enum', values: ['admin', 'user'] },
      },
    },
    posts: {
      count: 50,
      schema: {
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

      <h2 id="your-first-request" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Your First Request
      </h2>
      <p className="text-muted-foreground mb-4">Once the server is running, make requests with curl, fetch, or any HTTP client:</p>
      <CodeBlock language="bash" title="Get all users" code={`curl http://localhost:3777/api/users`} />
      <CodeBlock language="javascript" title="Using fetch" code={`const res = await fetch('http://localhost:3777/api/posts?page=1&limit=5');
const data = await res.json();

console.log(data.data);   // Array of posts
console.log(data.meta);   // { total, page, totalPages, ... }`} />

      <h2 id="programmatic" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Programmatic Usage
      </h2>
      <p className="text-muted-foreground mb-4">Use PhantomBack as a library in your Node.js project:</p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantom, createPhantomZero } from 'phantomback';

// Zero-config
const server = await createPhantomZero();

// Or with custom config
const server = await createPhantom({
  port: 4000,
  resources: {
    products: {
      count: 50,
      schema: {
        name: 'productName',
        price: 'price',
        category: { type: 'enum', values: ['Electronics', 'Books', 'Clothing'] },
      },
    },
  },
});

// server.app    → Express instance
// server.store  → DataStore instance
// server.stop() → Shut down`} />

      <NextPageLink to="/docs/configuration" label="Configuration Guide" />
    </article>
  );
}
