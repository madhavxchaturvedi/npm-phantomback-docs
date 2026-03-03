import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import NextPageLink from '@/components/docs/NextPageLink';

export default function CliReference() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Reference
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">CLI Reference</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Complete reference for the PhantomBack command-line interface.
      </p>

      <h2 id="start" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        phantomback start
      </h2>
      <p className="text-muted-foreground mb-4">Start the PhantomBack API server.</p>
      <CodeBlock language="bash" title="Usage" code={`phantomback start [options]`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Options</h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Flag</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Default</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--zero, -z', 'Start with zero-config defaults (5 resources, realistic data)', 'false'],
              ['--port, -p', 'Custom port number', '3777'],
              ['--config, -c', 'Path to config file', 'phantom.config.js'],
              ['--prefix', 'API route prefix', '/api'],
              ['--chaos', 'Enable Reality Mode (chaos engineering)', 'false'],
              ['--chaos-failure <rate>', 'Set failure probability (0-1)', '0.1'],
              ['--chaos-latency <range>', 'Set latency range in ms (e.g. 100,3000)', '200,5000'],
            ].map(([flag, desc, def], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{flag}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Examples</h3>
      <CodeBlock language="bash" title="Terminal" code={`# Zero-config mode
phantomback start --zero

# Custom port
phantomback start --zero --port 4000

# With config file
phantomback start --config ./my-config.js

# Custom prefix
phantomback start --zero --prefix /v1

# Combine options
phantomback start -z -p 8080 --prefix /api/v2

# Enable Reality Mode (chaos engineering)
phantomback start --zero --chaos

# Chaos with custom failure rate and latency
phantomback start --zero --chaos --chaos-failure 0.3 --chaos-latency 100,3000`} />

      <h2 id="init" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        phantomback init
      </h2>
      <p className="text-muted-foreground mb-4">
        Generate a starter <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code> in the current directory.
      </p>
      <CodeBlock language="bash" title="Usage" code={`phantomback init`} />
      <p className="text-muted-foreground mt-4">
        This creates a complete example config with users, posts, and comments to get you started quickly. Edit the file to match your project needs.
      </p>

      <h2 id="npx" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Using with npx
      </h2>
      <p className="text-muted-foreground mb-4">Run PhantomBack without installing globally:</p>
      <CodeBlock language="bash" title="Terminal" code={`# Start with zero-config
npx phantomback start --zero

# Generate config
npx phantomback init

# Custom port with npx
npx phantomback start --zero --port 5000`} />

      <h2 id="tips" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Tips
      </h2>
      <Callout type="tip">
        Use <code className="text-sm font-mono bg-muted px-1 py-0.5 rounded">--zero</code> mode during hackathons or initial prototyping, then switch to a config file when you need custom resources.
      </Callout>
      <Callout type="info">
        PhantomBack requires Node.js 18 or later. All data is stored in-memory and resets when the server restarts.
      </Callout>
      <Callout type="warning">
        PhantomBack is a development tool. Never use it as a production backend — data is not persisted and there is no real security.
      </Callout>

      <NextPageLink to="/docs/playground" label="Playground" />
    </article>
  );
}
