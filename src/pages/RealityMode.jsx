import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import EndpointCard from '@/components/docs/EndpointCard';
import NextPageLink from '@/components/docs/NextPageLink';

export default function RealityMode() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Feature
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Reality Mode</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        A chaos engineering simulation engine that injects controlled instability into your fake backend — helping you build resilient frontends that handle real-world failures gracefully.
      </p>

      <Callout type="info">
        Reality Mode works on top of your existing PhantomBack server. All your CRUD endpoints, auth, and data stay the same — chaos is injected transparently before responses are sent. Health check (<code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">/_health</code>) and chaos control endpoints (<code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">/_chaos</code>) are always exempt from chaos.
      </Callout>

      {/* ─── Why ─── */}
      <h2 id="why" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Why Reality Mode?
      </h2>
      <p className="text-muted-foreground mb-4">
        In production, APIs are unreliable — servers crash, networks lag, responses arrive corrupted. If your frontend only ever talks to a perfect fake backend, you'll never discover broken loading states, missing error handlers, or bad retry logic until users hit those bugs.
      </p>
      <p className="text-muted-foreground mb-4">
        Reality Mode lets you simulate these failures during development so you can:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1.5 mb-6 ml-2">
        <li>Test loading spinners and skeleton screens under real latency</li>
        <li>Verify error boundaries catch 500s, 502s, 503s, and 504s</li>
        <li>Ensure retry logic handles dropped connections</li>
        <li>Confirm JSON parsing doesn't crash on corrupted responses</li>
        <li>Validate timeout handling in your HTTP client</li>
      </ul>

      {/* ─── Quick Start ─── */}
      <h2 id="quick-start" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Quick Start
      </h2>
      <p className="text-muted-foreground mb-4">
        The fastest way to enable chaos — add the <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">--chaos</code> flag:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`# Zero-config with chaos
phantomback start --zero --chaos

# With a config file
phantomback start --chaos`} />
      <p className="text-muted-foreground mt-4 mb-4">
        That's it. Your server now randomly injects latency spikes, HTTP failures, dropped connections, corrupted responses, and timeouts.
      </p>

      {/* ─── Chaos Header ─── */}
      <h2 id="chaos-header" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Chaos Detection Header
      </h2>
      <p className="text-muted-foreground mb-4">
        When Reality Mode is active, every request gets a special response header:
      </p>
      <CodeBlock language="text" title="Response Header" code={`X-PhantomBack-Chaos: active`} />
      <p className="text-muted-foreground mt-4 mb-4">
        You can check this header in your frontend to detect when chaos is being injected, useful for debugging and logging.
      </p>

      {/* ─── Scenarios ─── */}
      <h2 id="scenarios" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Chaos Scenarios
      </h2>
      <p className="text-muted-foreground mb-4">
        Reality Mode ships with 5 built-in chaos scenarios. Each runs independently with its own trigger probability. Only one scenario fires per request — the engine evaluates them in strict priority order:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Priority</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Scenario</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">What It Does</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Default Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['1', '🔌 drop', 'Destroys the TCP socket — no response at all', '2%'],
              ['2', '⏳ timeout', 'Hangs the request for 30s (no response)', '3%'],
              ['3', '💥 failure', 'Returns random 5xx error (500, 502, 503, 504)', '10%'],
              ['4', '🧬 corruption', 'Sends back malformed/corrupted JSON', '2%'],
              ['5', '⏱ latency', 'Adds random delay (200–5 000 ms), then normal response', '~30%'],
            ].map(([priority, scenario, desc, rate], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4 text-muted-foreground font-mono">{priority}</td>
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{scenario}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning">
        Priority order matters! <strong>drop → timeout → failure → corruption → latency</strong>. The first scenario that triggers wins — the rest are skipped. Latency is the lowest priority because it adds delay but still lets the real response through.
      </Callout>

      <h3 id="corruption-types" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
        Corruption Types
      </h3>
      <p className="text-muted-foreground mb-4">
        When corruption triggers, one of 5 random corruption types is applied:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1.5 mb-6 ml-2">
        <li>Truncated JSON (response cut mid-string)</li>
        <li>Invalid JSON (JavaScript object syntax instead of JSON)</li>
        <li>Empty body with 200 status</li>
        <li>HTML instead of JSON (wrong Content-Type)</li>
        <li>Partial response with 206 status</li>
      </ul>

      {/* ─── Configuration ─── */}
      <h2 id="configuration" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Configuration
      </h2>
      <p className="text-muted-foreground mb-4">
        Add a <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">chaos</code> block to your config file for fine-grained control:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',

  chaos: {
    enabled: true,

    // Latency jitter range (ms) — applied on ~30% of requests
    latency: { min: 200, max: 5000 },

    // Probability of returning a random 5xx error (0-1)
    failureRate: 0.1,

    // HTTP error codes to randomly pick from
    errorCodes: [500, 502, 503, 504],

    // Probability of destroying the TCP connection
    connectionDropRate: 0.02,

    // Probability of sending malformed JSON
    corruptionRate: 0.02,

    // Probability of hanging the request forever (30s)
    timeoutRate: 0.03,

    // Which scenarios to enable (remove any to disable)
    scenarios: ['latency', 'failure', 'drop', 'corruption', 'timeout'],
  },

  resources: { ... },
};`} />

      <h3 id="config-options" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">
        All Options
      </h3>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Option</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Default</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['enabled', 'boolean', 'false', 'Master switch for chaos injection'],
              ['latency.min', 'number', '200', 'Minimum latency spike in ms'],
              ['latency.max', 'number', '5000', 'Maximum latency spike in ms'],
              ['failureRate', 'number', '0.1', 'Probability of 5xx errors (0-1)'],
              ['errorCodes', 'number[]', '[500,502,503,504]', 'HTTP error codes to randomly pick'],
              ['connectionDropRate', 'number', '0.02', 'Probability of TCP socket destruction'],
              ['corruptionRate', 'number', '0.02', 'Probability of corrupted response'],
              ['timeoutRate', 'number', '0.03', 'Probability of 30s hang'],
              ['scenarios', 'string[]', 'all 5', 'Which scenarios are active'],
            ].map(([option, type, def, desc], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{option}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{type}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{def}</td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── CLI Flags ─── */}
      <h2 id="cli" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        CLI Flags
      </h2>
      <p className="text-muted-foreground mb-4">
        Override chaos settings directly from the command line:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Flag</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Description</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Example</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['--chaos', 'Enable Reality Mode', 'phantomback start --zero --chaos'],
              ['--chaos-failure <rate>', 'Set failure probability (0-1)', '--chaos-failure 0.3'],
              ['--chaos-latency <range>', 'Set latency range in ms (min,max)', '--chaos-latency 100,3000'],
            ].map(([flag, desc, example], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{flag}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{desc}</td>
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono text-muted-foreground">{example}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock language="bash" title="Examples" code={`# Enable chaos with defaults
phantomback start --zero --chaos

# Aggressive failures (30% error rate)
phantomback start --zero --chaos --chaos-failure 0.3

# Custom latency range (100ms to 3s)
phantomback start --zero --chaos --chaos-latency 100,3000

# Combine everything
phantomback start --zero --chaos --chaos-failure 0.2 --chaos-latency 500,2000`} />

      {/* ─── Runtime Control ─── */}
      <h2 id="runtime-control" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Runtime Control API
      </h2>
      <p className="text-muted-foreground mb-4">
        Control Reality Mode without restarting your server. All chaos control endpoints use your configured prefix (default: <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">/api</code>):
      </p>

      <EndpointCard method="GET" path="/api/_chaos">
        Get current chaos state, configuration, and stats.
      </EndpointCard>
      <CodeBlock language="json" title="Response" code={`{
  "success": true,
  "message": "🔥 Reality Mode is ACTIVE — chaos is being injected!",
  "enabled": true,
  "paused": false,
  "active": true,
  "config": {
    "enabled": true,
    "latency": { "min": 200, "max": 5000 },
    "failureRate": 0.1,
    "errorCodes": [500, 502, 503, 504],
    "connectionDropRate": 0.02,
    "corruptionRate": 0.02,
    "timeoutRate": 0.03,
    "scenarios": ["latency", "failure", "drop", "corruption", "timeout"]
  },
  "stats": {
    "totalRequests": 42,
    "chaosApplied": 8,
    "latencySpikes": 5,
    "failures": 2,
    "drops": 0,
    "corruptions": 1,
    "timeouts": 0,
    "startedAt": "2024-12-15T10:30:00.000Z"
  }
}`} />

      <EndpointCard method="POST" path="/api/_chaos/enable">
        Enable Reality Mode at runtime.
      </EndpointCard>

      <EndpointCard method="POST" path="/api/_chaos/disable">
        Disable Reality Mode at runtime.
      </EndpointCard>

      <EndpointCard method="POST" path="/api/_chaos/pause">
        Temporarily pause chaos without disabling it.
      </EndpointCard>

      <EndpointCard method="POST" path="/api/_chaos/resume">
        Resume chaos after pausing.
      </EndpointCard>

      <EndpointCard method="POST" path="/api/_chaos/configure">
        Update chaos configuration at runtime. Send a JSON body with chaos config fields.
      </EndpointCard>
      <CodeBlock language="bash" title="Example — increase failure rate" code={`curl -X POST http://localhost:3777/api/_chaos/configure \\
  -H "Content-Type: application/json" \\
  -d '{"failureRate": 0.5, "latency": {"min": 1000, "max": 8000}}'`} />

      <EndpointCard method="POST" path="/api/_chaos/reset">
        Reset all chaos stats counters to zero.
      </EndpointCard>

      <Callout type="tip">
        Use the runtime API in test scripts to toggle chaos on/off between suites, or build a chaos dashboard that controls your dev server remotely.
      </Callout>

      {/* ─── Programmatic Usage ─── */}
      <h2 id="programmatic" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Programmatic Usage
      </h2>
      <p className="text-muted-foreground mb-4">
        When using PhantomBack as a library, access the chaos engine directly:
      </p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantom } from 'phantomback';

const server = await createPhantom({
  resources: { users: { seed: 20, fields: { name: 'name' } } },
  chaos: { enabled: true, failureRate: 0.2 },
});

// Access the chaos engine
const chaos = server.getChaos();

// Toggle at runtime
chaos.enable();
chaos.disable();
chaos.pause();
chaos.resume();

// Update config
chaos.configure({ failureRate: 0.5 });

// Check stats
console.log(chaos.getStatus());

// Reset counters
chaos.resetStats();`} />
      <Callout type="info">
        For the full library API — <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">createPhantom()</code>, <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">DataStore</code>, <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">ChaosEngine</code> methods — see the <a href="/docs/programmatic-api" className="text-primary hover:underline font-medium">Programmatic API</a> page.
      </Callout>

      {/* ─── Recipes ─── */}
      <h2 id="recipes" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Recipes
      </h2>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Loading States</h3>
      <p className="text-muted-foreground mb-4">
        High latency with no failures to test your loading spinners and skeleton screens:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start --zero --chaos --chaos-latency 2000,5000 --chaos-failure 0`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Error Handling</h3>
      <p className="text-muted-foreground mb-4">
        High failure rate with minimal latency to rapidly test error boundaries:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`chaos: {
  enabled: true,
  failureRate: 0.5,                 // 50% of requests fail
  latency: { min: 0, max: 100 },   // Minimal delay
  scenarios: ['failure'],           // Only failures, no drops/timeouts
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Simulate Network Outage</h3>
      <p className="text-muted-foreground mb-4">
        Drop most connections to simulate a flaky network:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`chaos: {
  enabled: true,
  connectionDropRate: 0.8,    // 80% of connections dropped
  scenarios: ['drop'],        // Only drops
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Gradually Increase Chaos</h3>
      <p className="text-muted-foreground mb-4">
        Start clean, then ramp up chaos at runtime for progressive testing:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`# Start with chaos disabled
phantomback start --zero

# In another terminal — enable chaos
curl -X POST http://localhost:3777/api/_chaos/enable

# Increase failure rate
curl -X POST http://localhost:3777/api/_chaos/configure \\
  -H "Content-Type: application/json" \\
  -d '{"failureRate": 0.3}'

# Check stats after testing
curl http://localhost:3777/api/_chaos

# Disable when done
curl -X POST http://localhost:3777/api/_chaos/disable`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Corruption Handling</h3>
      <p className="text-muted-foreground mb-4">
        High corruption rate to test JSON parsing robustness:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`chaos: {
  enabled: true,
  corruptionRate: 0.5,        // 50% of responses corrupted
  scenarios: ['corruption'],  // Only corruption
}`} />

      <Callout type="warning">
        Reality Mode is designed for development only. The chaos control endpoints have no authentication and should never be exposed in production.
      </Callout>

      <NextPageLink to="/docs/programmatic-api" label="Programmatic API" />
    </article>
  );
}
