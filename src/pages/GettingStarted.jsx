import CodeBlock from '../components/CodeBlock';
import './DocPage.css';

export default function GettingStarted() {
  return (
    <article className="doc-page">
      <div className="doc-badge">Docs</div>
      <h1>Getting Started</h1>
      <p className="doc-lead">
        Get a fully functional REST API running in under 30 seconds — no database, no backend code required.
      </p>

      <h2 id="installation">Installation</h2>
      <p>Install PhantomBack globally to use the CLI anywhere:</p>
      <CodeBlock language="bash" title="Terminal" code={`npm install -g phantomback`} />
      <p>Or use it directly with npx (no install needed):</p>
      <CodeBlock language="bash" title="Terminal" code={`npx phantomback start --zero`} />

      <h2 id="zero-config">Zero-Config Mode</h2>
      <p>
        The fastest way to start. Use the <code>--zero</code> flag to instantly get a full API
        with 5 pre-configured resources and realistic data:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start --zero`} />
      <p>This gives you:</p>
      <table className="doc-table">
        <thead>
          <tr><th>Resource</th><th>Records</th><th>Auth</th></tr>
        </thead>
        <tbody>
          <tr><td>👤 Users</td><td>25</td><td>✅ Protected</td></tr>
          <tr><td>📝 Posts</td><td>50</td><td>No</td></tr>
          <tr><td>💬 Comments</td><td>100</td><td>No</td></tr>
          <tr><td>📦 Products</td><td>30</td><td>No</td></tr>
          <tr><td>✅ Todos</td><td>40</td><td>No</td></tr>
        </tbody>
      </table>

      <h2 id="custom-config">Custom Configuration</h2>
      <p>
        For full control, create a config file. Scaffold one with the <code>init</code> command:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback init`} />
      <p>
        This creates <code>phantom.config.js</code> with an example blog setup. Edit it to match your needs:
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
      <p>Then start the server:</p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start`} />

      <h2 id="your-first-request">Your First Request</h2>
      <p>Once the server is running, make requests with curl, fetch, or any HTTP client:</p>
      <CodeBlock language="bash" title="Get all users" code={`curl http://localhost:3777/api/users`} />
      <CodeBlock language="javascript" title="Using fetch" code={`const res = await fetch('http://localhost:3777/api/posts?page=1&limit=5');
const data = await res.json();

console.log(data.data);   // Array of posts
console.log(data.meta);   // { total, page, totalPages, ... }`} />

      <h2 id="programmatic">Programmatic Usage</h2>
      <p>Use PhantomBack as a library in your Node.js project:</p>
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

      <div className="doc-next">
        <p>Next up:</p>
        <a href="/docs/configuration">Configuration Guide →</a>
      </div>
    </article>
  );
}
