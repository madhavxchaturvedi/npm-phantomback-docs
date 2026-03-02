import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import EndpointCard from '@/components/docs/EndpointCard';
import ParamTable from '@/components/docs/ParamTable';
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
        Reality Mode works on top of your existing PhantomBack server. All your CRUD endpoints, auth, and data stay the same — chaos is injected transparently before responses are sent.
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
        That's it. Your server now randomly injects latency spikes, HTTP failures, dropped connections, corrupted responses, and timeouts into every request.
      </p>

      {/* ─── Scenarios ─── */}
      <h2 id="scenarios" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Chaos Scenarios
      </h2>
      <p className="text-muted-foreground mb-4">
        Reality Mode ships with 5 built-in chaos scenarios. Each runs independently with its own trigger probability:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Scenario</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">What It Does</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Default Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['⏱ latency', 'Adds random delay (200–5000ms) before responding', '100% when active'],
              ['💥 failure', 'Returns random 5xx error (500, 502, 503, 504)', '10%'],
              ['🔌 drop', 'Destroys the TCP socket — no response at all', '2%'],
              ['🧬 corruption', 'Sends back malformed/corrupted JSON', '2%'],
              ['⏳ timeout', 'Hangs the request forever (no response)', '3%'],
            ].map(([scenario, desc, rate], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
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

      <Callout type="tip">
        Only one chaos scenario fires per request. The engine evaluates them in order: failure → drop → corruption → timeout → latency. The first one that triggers wins.
      </Callout>

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

  // Reality Mode configuration
  chaos: {
    enabled: true,

    // Latency jitter range (milliseconds)
    latency: { min: 200, max: 5000 },

    // Probability of returning a random 5xx error (0-1)
    failureRate: 0.1,

    // HTTP error codes to randomly pick from
    errorCodes: [500, 502, 503, 504],

    // Probability of destroying the connection
    connectionDropRate: 0.02,

    // Probability of sending malformed JSON
    corruptionRate: 0.02,

    // Probability of hanging the request forever
    timeoutRate: 0.03,

    // Which scenarios to enable (remove any to disable)
    scenarios: ['latency', 'failure', 'drop', 'corruption', 'timeout'],
  },

  resources: {
    // ... your resources
  },
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
              ['errorCodes', 'number[]', '[500,502,503,504]', 'HTTP error codes to randomly pick from'],
              ['connectionDropRate', 'number', '0.02', 'Probability of dropping connection'],
              ['corruptionRate', 'number', '0.02', 'Probability of corrupted response'],
              ['timeoutRate', 'number', '0.03', 'Probability of request timeout'],
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
        Control Reality Mode without restarting your server. These endpoints are always available, even when chaos is disabled:
      </p>

      <EndpointCard method="GET" path="/_chaos/status">
        Get current chaos state, configuration, and stats.
      </EndpointCard>
      <CodeBlock language="json" title="Response" code={`{
  "realityMode": {
    "enabled": true,
    "paused": false,
    "active": true,
    "config": {
      "latency": { "min": 200, "max": 5000 },
      "failureRate": 0.1,
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
      "timeouts": 0
    }
  }
}`} />

      <EndpointCard method="POST" path="/_chaos/enable">
        Enable Reality Mode at runtime.
      </EndpointCard>

      <EndpointCard method="POST" path="/_chaos/disable">
        Disable Reality Mode at runtime.
      </EndpointCard>

      <EndpointCard method="POST" path="/_chaos/pause">
        Temporarily pause chaos without disabling it.
      </EndpointCard>

      <EndpointCard method="POST" path="/_chaos/resume">
        Resume chaos after pausing.
      </EndpointCard>

      <EndpointCard method="POST" path="/_chaos/configure">
        Update chaos configuration at runtime. Send a JSON body with any config fields.
      </EndpointCard>
      <CodeBlock language="bash" title="Example — increase failure rate" code={`curl -X POST http://localhost:3777/_chaos/configure \\
  -H "Content-Type: application/json" \\
  -d '{"failureRate": 0.5, "latency": {"min": 1000, "max": 8000}}'`} />

      <EndpointCard method="POST" path="/_chaos/reset">
        Reset all chaos stats counters to zero.
      </EndpointCard>

      <Callout type="tip">
        Use the runtime API in your test scripts to toggle chaos on/off between test suites, or build a chaos dashboard that controls your dev server remotely.
      </Callout>

      {/* ─── Programmatic Usage ─── */}
      <h2 id="programmatic" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Programmatic Usage
      </h2>
      <p className="text-muted-foreground mb-4">
        When using PhantomBack as a library, access the chaos engine directly:
      </p>
      <CodeBlock language="javascript" title="server.js" code={`import { createPhantom, ChaosEngine } from 'phantomback';

const server = await createPhantom({
  resources: { users: { count: 20, schema: { name: 'fullName' } } },
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

      {/* ─── Recipes ─── */}
      <h2 id="recipes" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Recipes
      </h2>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Loading States</h3>
      <p className="text-muted-foreground mb-4">
        Add high latency with no failures to test your loading spinners and skeleton screens:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback start --zero --chaos --chaos-latency 2000,5000 --chaos-failure 0`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Test Error Handling</h3>
      <p className="text-muted-foreground mb-4">
        High failure rate with minimal latency to rapidly test error boundaries:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`chaos: {
  enabled: true,
  failureRate: 0.5,           // 50% of requests fail
  latency: { min: 0, max: 100 },  // Minimal delay
  scenarios: ['failure'],      // Only failures, no drops/timeouts
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Simulate Network Outage</h3>
      <p className="text-muted-foreground mb-4">
        Drop most connections to simulate a flaky network:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`chaos: {
  enabled: true,
  connectionDropRate: 0.8,     // 80% of connections dropped
  scenarios: ['drop'],          // Only drops
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Gradually Increase Chaos</h3>
      <p className="text-muted-foreground mb-4">
        Start clean, then ramp up chaos at runtime for progressive testing:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`# Start with chaos disabled
phantomback start --zero

# In another terminal — enable chaos
curl -X POST http://localhost:3777/_chaos/enable

# Increase failure rate
curl -X POST http://localhost:3777/_chaos/configure \\
  -H "Content-Type: application/json" \\
  -d '{"failureRate": 0.3}'

# Check stats after testing
curl http://localhost:3777/_chaos/status

# Disable when done
curl -X POST http://localhost:3777/_chaos/disable`} />

      <Callout type="warning">
        Reality Mode is designed for development only. The chaos control endpoints have no authentication and should never be exposed in production environments.
      </Callout>

      <NextPageLink to="/docs/examples" label="Real-World Examples" />
    </article>
  );
}
