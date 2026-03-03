import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import ParamTable from '@/components/docs/ParamTable';
import NextPageLink from '@/components/docs/NextPageLink';

export default function ProgrammaticApi() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Reference
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Programmatic API</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Use PhantomBack as a library in your Node.js projects — full control over the server, data store, and chaos engine.
      </p>

      {/* ─── Overview ─── */}
      <h2 id="overview" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground mb-4">
        PhantomBack exports everything you need to integrate a fake backend into your test suites, scripts, or dev tooling:
      </p>
      <CodeBlock language="javascript" title="All exports" code={`import {
  createPhantom,         // Create server with custom config
  createPhantomZero,     // Create server with zero-config defaults
  createServer,          // Low-level server factory
  parseConfig,           // Config file parser
  DEFAULT_RESOURCES,     // Zero-config resource definitions
  DataStore,             // In-memory data store class
  ChaosEngine,           // Chaos/Reality Mode engine class
  chaosMiddleware,       // Express middleware for chaos injection
  createChaosRoutes,     // Factory for chaos control endpoints
  logger,                // Built-in logger utility
} from 'phantomback';`} />

      {/* ─── createPhantom ─── */}
      <h2 id="create-phantom" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        createPhantom(config)
      </h2>
      <p className="text-muted-foreground mb-4">
        Create a fully configured PhantomBack server with custom resources, auth, chaos, and all features:
      </p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantom } from 'phantomback';

const server = await createPhantom({
  port: 4000,
  prefix: '/api',
  latency: 200,                   // Global response delay (ms)
  resources: {
    users: {
      seed: 25,
      auth: true,
      fields: {
        name: 'name',
        email: 'email',
        avatar: 'avatar',
      },
    },
    posts: {
      seed: 50,
      fields: {
        title: 'sentence',
        body: 'paragraphs',
        published: 'boolean',
        userId: { type: 'relation', resource: 'users' },
      },
    },
  },
  chaos: {
    enabled: true,
    failureRate: 0.1,
    latency: { min: 200, max: 5000 },
  },
});

console.log('Server running on port 4000');`} />

      {/* ─── createPhantomZero ─── */}
      <h2 id="create-phantom-zero" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        createPhantomZero(port?)
      </h2>
      <p className="text-muted-foreground mb-4">
        Quick-start a server with 5 built-in resources (users, posts, comments, products, todos) and realistic seed data:
      </p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantomZero } from 'phantomback';

// Default port 3777
const server = await createPhantomZero();

// Custom port
const server = await createPhantomZero(5000);`} />

      {/* ─── Server Return Object ─── */}
      <h2 id="server-object" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Server Return Object
      </h2>
      <p className="text-muted-foreground mb-4">
        Both <code>createPhantom()</code> and <code>createPhantomZero()</code> return a server object with these properties and methods:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Property / Method</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['server.app', 'Express', 'The Express application instance — add custom middleware or routes'],
              ['server.server', 'http.Server', 'The underlying Node.js HTTP server instance'],
              ['server.store', 'DataStore', 'The in-memory data store holding all seeded records'],
              ['server.chaos', 'ChaosEngine', 'The Reality Mode chaos engine instance (always present)'],
              ['server.stop()', 'Function', 'Gracefully shut down the server'],
              ['server.reset()', 'Function', 'Reset all data back to the initial seed state'],
              ['server.getStore()', 'Function', 'Get the raw store data as a JSON-serializable object'],
              ['server.getChaos()', 'Function', 'Get the current chaos engine status and stats'],
            ].map(([prop, type, desc], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{prop}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{type}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CodeBlock language="javascript" title="Using the server object" code={`const server = await createPhantom({ /* config */ });

// Access Express app — add custom routes
server.app.get('/custom', (req, res) => {
  res.json({ message: 'Custom endpoint!' });
});

// Access the data store
const allUsers = server.store.findAll('users');
console.log(\`\${allUsers.length} users in store\`);

// Check chaos status
const chaosStatus = server.getChaos();
console.log(chaosStatus);

// Toggle chaos at runtime
server.chaos.enable();
server.chaos.configure({ failureRate: 0.5 });

// Reset all data to initial seed
server.reset();

// Get serializable snapshot of all data
const snapshot = server.getStore();
console.log(JSON.stringify(snapshot));

// Shut down
await server.stop();`} />

      {/* ─── DataStore ─── */}
      <h2 id="data-store" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        DataStore
      </h2>
      <p className="text-muted-foreground mb-4">
        The <code>DataStore</code> class is an in-memory database backed by nested <code>Map</code> structures.
        It powers all CRUD operations and can be used directly for custom logic:
      </p>

      <h3 id="datastore-methods" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Methods Reference</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Returns</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['findAll(resource)', 'Array', 'Get all records for a resource'],
              ['findById(resource, id)', 'Object|null', 'Get a single record by ID'],
              ['findWhere(resource, query)', 'Array', 'Find records matching query criteria'],
              ['create(resource, data)', 'Object', 'Create a new record (auto-generates ID, timestamps)'],
              ['createMany(resource, items)', 'Array', 'Bulk create multiple records'],
              ['update(resource, id, data)', 'Object|null', 'Full replace of a record (PUT semantics)'],
              ['patch(resource, id, data)', 'Object|null', 'Partial update of a record (PATCH semantics)'],
              ['delete(resource, id)', 'boolean', 'Delete a record by ID'],
              ['count(resource)', 'number', 'Get record count for a resource'],
              ['clear(resource)', 'void', 'Remove all records from a resource'],
              ['reset()', 'void', 'Reset all resources to empty state'],
              ['toJSON()', 'Object', 'Serialize entire store to a plain JSON object'],
              ['fromJSON(data)', 'void', 'Import data from a JSON object (restore a snapshot)'],
            ].map(([method, returns, desc], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{method}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{returns}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock language="javascript" title="DataStore usage examples" code={`const server = await createPhantom({ /* config */ });
const store = server.store;

// Query all users
const users = store.findAll('users');

// Find a specific user
const user = store.findById('users', '1');

// Find users matching criteria
const admins = store.findWhere('users', { role: 'admin' });

// Create a new record
const newPost = store.create('posts', {
  title: 'Hello World',
  body: 'My first post',
  userId: '1',
});

// Bulk create
store.createMany('todos', [
  { title: 'Task 1', completed: false },
  { title: 'Task 2', completed: true },
]);

// Update (full replace)
store.update('posts', newPost.id, {
  title: 'Updated Title',
  body: 'Updated body',
});

// Patch (partial update)
store.patch('posts', newPost.id, { title: 'Patched Title' });

// Delete
store.delete('posts', newPost.id);

// Count records
console.log(store.count('users'));  // e.g., 25

// Snapshot & Restore
const snapshot = store.toJSON();
// ... do something destructive ...
store.fromJSON(snapshot);  // Restore to previous state`} />

      <Callout type="tip" title="Test Snapshots">
        Use <code>toJSON()</code> and <code>fromJSON()</code> to snapshot and restore data between tests — ensuring each test starts with a clean state.
      </Callout>

      {/* ─── ChaosEngine ─── */}
      <h2 id="chaos-engine" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        ChaosEngine
      </h2>
      <p className="text-muted-foreground mb-4">
        The <code>ChaosEngine</code> class manages all Reality Mode behavior. Access it via <code>server.chaos</code> or import and instantiate directly:
      </p>

      <h3 id="chaos-methods" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Methods Reference</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Method</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['enable()', 'Enable chaos injection globally'],
              ['disable()', 'Disable chaos injection globally'],
              ['pause()', 'Temporarily pause chaos without disabling (preserves config)'],
              ['resume()', 'Resume chaos after pausing'],
              ['configure(newConfig)', 'Merge new config options into the current chaos config'],
              ['getStatus()', 'Get current enabled/paused/active state, config, and stats'],
              ['resetStats()', 'Reset all stats counters to zero (totalRequests, chaosApplied, etc.)'],
              ['isScenarioEnabled(name)', 'Check if a specific scenario is active (returns boolean)'],
              ['shouldTrigger(rate)', 'Roll against a probability (returns boolean) — used internally'],
              ['getJitter()', 'Get a random delay value within the configured latency range'],
              ['getRandomErrorCode()', 'Get a random error code from the configured errorCodes array'],
            ].map(([method, desc], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{method}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock language="javascript" title="ChaosEngine usage" code={`const server = await createPhantom({
  resources: { /* ... */ },
  chaos: { enabled: false },  // Start with chaos off
});

const chaos = server.chaos;

// Enable chaos
chaos.enable();

// Configure at runtime
chaos.configure({
  failureRate: 0.3,
  latency: { min: 500, max: 3000 },
  scenarios: ['failure', 'latency'],  // Only these two
});

// Check status
const status = chaos.getStatus();
console.log(status);
// {
//   enabled: true,
//   paused: false,
//   active: true,
//   config: { ... },
//   stats: { totalRequests: 0, chaosApplied: 0, ... }
// }

// Pause during specific tests
chaos.pause();
// ... run tests that need stable responses ...
chaos.resume();

// Check if specific scenario is active
if (chaos.isScenarioEnabled('drop')) {
  console.log('Connection drops are enabled');
}

// Reset stats after a test run
chaos.resetStats();

// Disable completely
chaos.disable();`} />

      <h3 id="chaos-stats" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Stats Object</h3>
      <p className="text-muted-foreground mb-4">
        The <code>getStatus()</code> method returns stats tracking all chaos activity:
      </p>
      <ParamTable params={[
        { name: 'totalRequests', type: 'number', children: 'Total requests processed by the chaos middleware' },
        { name: 'chaosApplied', type: 'number', children: 'Requests where any chaos scenario was triggered' },
        { name: 'latencySpikes', type: 'number', children: 'Requests with added latency delay' },
        { name: 'failures', type: 'number', children: 'Requests that received a random 5xx error' },
        { name: 'drops', type: 'number', children: 'Requests where the connection was destroyed' },
        { name: 'corruptions', type: 'number', children: 'Requests that received malformed JSON' },
        { name: 'timeouts', type: 'number', children: 'Requests that were held indefinitely (no response)' },
        { name: 'startedAt', type: 'string', children: 'ISO timestamp of when stats tracking began' },
      ]} />

      {/* ─── Named Exports ─── */}
      <h2 id="named-exports" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        All Named Exports
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Export</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['createPhantom', 'async function', 'Create a server with custom config object'],
              ['createPhantomZero', 'async function', 'Create a zero-config server (5 built-in resources)'],
              ['createServer', 'async function', 'Low-level server factory — used by the above two'],
              ['parseConfig', 'function', 'Parse and validate a config object (merges with defaults)'],
              ['DEFAULT_RESOURCES', 'Object', 'The 5 built-in resource definitions used by zero-config mode'],
              ['DataStore', 'Class', 'In-memory data store class (Map-based CRUD)'],
              ['ChaosEngine', 'Class', 'Chaos engineering engine class'],
              ['chaosMiddleware', 'function', 'Express middleware factory for chaos injection'],
              ['createChaosRoutes', 'function', 'Factory for the 7 chaos control API endpoints'],
              ['logger', 'Object', 'Built-in logger with colored, structured output'],
            ].map(([name, type, desc], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{name}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{type}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── Integration Example ─── */}
      <h2 id="integration" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Integration Examples
      </h2>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Setup with Vitest</h3>
      <CodeBlock language="javascript" title="test/setup.js" code={`import { createPhantom } from 'phantomback';

let server;

export async function setup() {
  server = await createPhantom({
    port: 0,  // Random available port
    resources: {
      users: {
        seed: 10,
        fields: { name: 'name', email: 'email' },
      },
    },
  });
  return server;
}

export async function teardown() {
  await server.stop();
}

export function resetData() {
  server.reset();
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Custom Express Middleware</h3>
      <CodeBlock language="javascript" title="Adding custom middleware" code={`import { createPhantom } from 'phantomback';

const server = await createPhantom({
  port: 4000,
  resources: {
    products: { seed: 30, fields: { name: 'product', price: 'price' } },
  },
});

// Add request logging
server.app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});

// Add a custom endpoint
server.app.get('/api/stats', (req, res) => {
  res.json({
    products: server.store.count('products'),
    chaos: server.getChaos(),
  });
});`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Chaos in Integration Tests</h3>
      <CodeBlock language="javascript" title="Testing resilience" code={`import { createPhantom } from 'phantomback';

const server = await createPhantom({
  port: 4000,
  resources: {
    todos: { seed: 20, fields: { title: 'sentence', done: 'boolean' } },
  },
  chaos: { enabled: false },
});

// Stable test — chaos off
const res1 = await fetch('http://localhost:4000/api/todos');
console.assert(res1.ok, 'Should succeed without chaos');

// Enable chaos for resilience test
server.chaos.enable();
server.chaos.configure({ failureRate: 1.0 }); // Force failures

const res2 = await fetch('http://localhost:4000/api/todos');
console.assert(!res2.ok, 'Should fail with 100% failure rate');

// Check stats
const { stats } = server.chaos.getStatus();
console.log(\`\${stats.failures} failures triggered\`);

// Clean up
server.chaos.disable();
await server.stop();`} />

      <Callout type="info" title="Express Compatible">
        Since <code>server.app</code> is a standard Express instance, you can use any Express-compatible middleware, plugin, or pattern alongside PhantomBack.
      </Callout>

      <div className="flex flex-col sm:flex-row gap-3 mt-12">
        <NextPageLink to="/docs/examples" label="Real-World Examples" />
      </div>
    </article>
  );
}
