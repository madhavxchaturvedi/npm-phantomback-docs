import CodeBlock from '../components/CodeBlock';
import './DocPage.css';

export default function CliReference() {
  return (
    <article className="doc-page">
      <div className="doc-badge">Reference</div>
      <h1>CLI Reference</h1>
      <p className="doc-lead">
        Complete reference for the PhantomBack command-line interface.
      </p>

      <h2 id="start">phantomback start</h2>
      <p>Start the PhantomBack API server.</p>
      <CodeBlock language="bash" title="Usage" code={`phantomback start [options]`} />

      <h3>Options</h3>
      <table className="doc-table">
        <thead>
          <tr><th>Flag</th><th>Description</th><th>Default</th></tr>
        </thead>
        <tbody>
          <tr><td><code>--zero, -z</code></td><td>Start with zero-config defaults (5 resources, realistic data)</td><td>false</td></tr>
          <tr><td><code>--port, -p</code></td><td>Custom port number</td><td>3777</td></tr>
          <tr><td><code>--config, -c</code></td><td>Path to config file</td><td>phantom.config.js</td></tr>
          <tr><td><code>--prefix</code></td><td>API route prefix</td><td>/api</td></tr>
        </tbody>
      </table>

      <h3>Examples</h3>
      <CodeBlock language="bash" title="Terminal" code={`# Zero-config mode
phantomback start --zero

# Custom port
phantomback start --zero --port 4000

# With config file
phantomback start --config ./my-config.js

# Custom prefix
phantomback start --zero --prefix /v1

# Combine options
phantomback start -z -p 8080 --prefix /api/v2`} />

      <h2 id="init">phantomback init</h2>
      <p>Generate a starter <code>phantom.config.js</code> in the current directory.</p>
      <CodeBlock language="bash" title="Usage" code={`phantomback init`} />
      <p>
        This creates a complete example config with users, posts, and comments
        to get you started quickly. Edit the file to match your project needs.
      </p>

      <h2 id="npx">Using with npx</h2>
      <p>Run PhantomBack without installing globally:</p>
      <CodeBlock language="bash" title="Terminal" code={`# Start with zero-config
npx phantomback start --zero

# Generate config
npx phantomback init

# Custom port with npx
npx phantomback start --zero --port 5000`} />

      <h2 id="programmatic">Programmatic API</h2>
      <p>Import and use PhantomBack in your Node.js scripts:</p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantom, createPhantomZero } from 'phantomback';

// Quick start — zero config
const server = await createPhantomZero();

// Full control
const server = await createPhantom({
  port: 4000,
  prefix: '/api/v2',
  resources: {
    products: {
      count: 100,
      schema: {
        name: 'productName',
        price: 'price',
      },
    },
  },
});

// Available on the server object:
server.app;       // Express app instance
server.store;     // DataStore (Map-based in-memory DB)
server.stop();    // Shut down the server
server.reset();   // Reset all data to initial seed
server.getStore(); // Get raw store data as JSON`} />

      <h2 id="tips">Tips</h2>
      <div className="callout tip">
        <strong>Tip:</strong> Use <code>--zero</code> mode during hackathons or initial prototyping,
        then switch to a config file when you need custom resources.
      </div>
      <div className="callout info">
        <strong>Note:</strong> PhantomBack requires Node.js 18 or later. All data is stored in-memory
        and resets when the server restarts.
      </div>
      <div className="callout warning">
        <strong>Warning:</strong> PhantomBack is a development tool. Never use it as a production backend —
        data is not persisted and there is no real security.
      </div>

      <div className="doc-next">
        <p>Back to:</p>
        <a href="/">← Home</a>
      </div>
    </article>
  );
}
