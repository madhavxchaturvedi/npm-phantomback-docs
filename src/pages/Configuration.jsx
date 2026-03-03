import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import NextPageLink from '@/components/docs/NextPageLink';

function FieldTable({ fields }) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Example</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(([type, example], i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
              <td className="py-2.5 px-4">
                <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">{type}</code>
              </td>
              <td className="py-2.5 px-4 text-muted-foreground">{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Configuration() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Docs
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Configuration</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Define your resources, field schemas, and server settings with a simple config file.
      </p>

      {/* ── Config File ── */}
      <h2 id="config-file" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Config File
      </h2>
      <p className="text-muted-foreground mb-4">
        PhantomBack looks for <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code> (or <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.mjs</code> / <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.json</code>) in your project root. Supported file names:
      </p>
      <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
        <li><code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code></li>
        <li><code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.mjs</code></li>
        <li><code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.json</code></li>
        <li><code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.phantomrc.json</code></li>
        <li><code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.phantomrc.js</code></li>
      </ul>
      <p className="text-muted-foreground mb-4">Generate a starter config:</p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback init`} />

      {/* ── Config Structure ── */}
      <h2 id="structure" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Config Structure
      </h2>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  // Server
  port: 3777,             // Server port (default: 3777)
  prefix: '/api',         // Route prefix (default: '/api')
  latency: 0,             // Global response delay in ms

  // Resources
  resources: {
    resourceName: {
      seed: 25,             // Number of records to generate
      auth: false,          // Require JWT auth for this resource
      fields: { ... },      // Field definitions
    },
  },

  // Chaos (Reality Mode)
  chaos: {
    enabled: false,         // Master switch
    // ... see chaos section below
  },
};`} />

      <Callout type="info">
        Config keys: use <strong>seed</strong> (not count) for record count, <strong>fields</strong> (not schema) for field definitions, and <strong>latency</strong> (not delay) for response delays.
      </Callout>

      {/* ── Field Types ── */}
      <h2 id="field-types" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Field Types
      </h2>
      <p className="text-muted-foreground mb-4">PhantomBack supports 40+ built-in field types powered by Faker.js. Use them as strings or objects with options:</p>
      <CodeBlock language="javascript" code={`fields: {
  // String shorthand
  name: 'name',
  email: 'email',

  // Object with options
  age: { type: 'number', min: 18, max: 65 },
  role: { type: 'enum', values: ['admin', 'user'] },
}`} />

      <h3 id="people" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">People</h3>
      <FieldTable fields={[
        ['name', 'John Smith'],
        ['firstName', 'John'],
        ['lastName', 'Smith'],
        ['username', 'john_smith42'],
        ['email', 'john@example.com'],
        ['avatar', 'https://avatars.dicebear.com/...'],
        ['bio', 'Short biography text'],
        ['jobTitle', 'Software Engineer'],
        ['phone', '+1-555-0123'],
      ]} />

      <h3 id="text" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Text</h3>
      <FieldTable fields={[
        ['word', 'synergy'],
        ['sentence', 'The quick brown fox jumps.'],
        ['paragraph', 'A single paragraph…'],
        ['paragraphs', 'Multiple paragraphs (default 3)'],
        ['slug', 'lorem-ipsum-dolor'],
        ['title', 'The Art of Programming'],
        ['description', '2–4 sentences of descriptive text'],
        ['text', 'Extended lorem text block'],
      ]} />

      <h3 id="numbers" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Numbers</h3>
      <FieldTable fields={[
        ['number', '42 (configurable min/max)'],
        ['float', '3.14 (configurable min/max/precision)'],
        ['price', '$29.99'],
        ['rating', '4.5 (1.0–5.0)'],
      ]} />
      <CodeBlock language="javascript" title="Number options" code={`age: { type: 'number', min: 18, max: 65 },
score: { type: 'float', min: 0, max: 100, precision: 2 },`} />

      <h3 id="boolean" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Boolean</h3>
      <FieldTable fields={[
        ['boolean', 'true / false'],
      ]} />

      <h3 id="dates" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Dates</h3>
      <FieldTable fields={[
        ['date', '2024-03-15T10:30:00.000Z (recent, within 1 year)'],
        ['pastDate', '2023-08-20T...Z'],
        ['futureDate', '2025-01-10T...Z'],
        ['birthdate', '1990-05-12 (date only)'],
      ]} />

      <h3 id="internet" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Internet & Media</h3>
      <FieldTable fields={[
        ['url', 'https://example.com/page'],
        ['image', 'https://picsum.photos/640/480'],
        ['ip', '192.168.1.100'],
        ['color', 'violet (human-readable name)'],
        ['hex', '#a78bfa (hex RGB code)'],
      ]} />

      <h3 id="location" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Location</h3>
      <FieldTable fields={[
        ['address', '123 Main St, Springfield'],
        ['city', 'San Francisco'],
        ['country', 'United States'],
        ['zipCode', '94102'],
        ['latitude', '37.7749'],
        ['longitude', '-122.4194'],
      ]} />

      <h3 id="commerce" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Commerce</h3>
      <FieldTable fields={[
        ['product', 'Ergonomic Keyboard'],
        ['company', 'Acme Corp'],
        ['department', 'Electronics'],
        ['category', 'Electronics (alias for department)'],
      ]} />

      <h3 id="ids" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">IDs</h3>
      <FieldTable fields={[
        ['uuid', '550e8400-e29b-41d4-a716-...'],
        ['id', 'Auto-incrementing integer'],
      ]} />

      {/* ── Special Types ── */}
      <h2 id="special-types" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Special Field Types
      </h2>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Enum</h3>
      <p className="text-muted-foreground mb-4">Randomly pick from a list of values:</p>
      <CodeBlock language="javascript" code={`role: { type: 'enum', values: ['admin', 'editor', 'viewer'] }`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Relation</h3>
      <p className="text-muted-foreground mb-4">Create a foreign key pointing to another resource. This also auto-generates nested routes:</p>
      <CodeBlock language="javascript" code={`userId: { type: 'relation', resource: 'users' }
// Auto-generates:  GET /api/users/:id/posts`} />
      <Callout type="tip">
        Resources with relations are seeded after their dependencies, so foreign keys always point to valid records.
      </Callout>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Object</h3>
      <p className="text-muted-foreground mb-4">Nested object fields:</p>
      <CodeBlock language="javascript" code={`address: {
  type: 'object',
  fields: {
    street: 'address',
    city: 'city',
    zip: 'zipCode',
  },
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Array</h3>
      <p className="text-muted-foreground mb-4">Generate arrays of values:</p>
      <CodeBlock language="javascript" code={`tags: {
  type: 'array',
  items: 'word',
  count: 3,      // fixed count, or omit for random 1-5
}`} />

      {/* ── Validation ── */}
      <h2 id="validation" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Validation Rules
      </h2>
      <p className="text-muted-foreground mb-4">Add validation to fields for POST/PUT/PATCH requests:</p>
      <CodeBlock language="javascript" code={`fields: {
  email: {
    type: 'email',
    required: true,      // Must be present
    unique: true,        // No duplicates
  },
  name: {
    type: 'name',
    required: true,
  },
  age: {
    type: 'number',
    min: 0,              // Minimum value
    max: 150,            // Maximum value
  },
  role: {
    type: 'enum',
    values: ['admin', 'user'],
  },
}`} />

      {/* ── Auth Config ── */}
      <h2 id="auth-config" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Auth Configuration
      </h2>
      <p className="text-muted-foreground mb-4">
        Set <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">auth: true</code> on any resource to protect it.
        A resource with <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">email</code> and{' '}
        <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">password</code> fields is auto-detected as the auth resource.
      </p>
      <CodeBlock language="javascript" code={`resources: {
  users: {
    seed: 20,
    auth: true,
    fields: {
      name: 'name',
      email: 'email',       // Required for auth
      password: 'password', // Auto-excluded from responses
    },
  },
  posts: {
    seed: 50,
    fields: { title: 'sentence', body: 'paragraphs' },
  },
}`} />
      <p className="text-muted-foreground mt-4 mb-4">
        The auth system also accepts top-level config for JWT:
      </p>
      <CodeBlock language="javascript" code={`auth: {
  secret: 'my-custom-secret',  // JWT signing secret
  expiresIn: '24h',            // Token expiration
},`} />
      <Callout type="tip">
        See the full <a href="/docs/authentication" className="text-primary hover:underline font-medium">Authentication docs</a> for register/login endpoints, protected routes, and token usage.
      </Callout>

      {/* ── Latency ── */}
      <h2 id="latency" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Response Latency
      </h2>
      <p className="text-muted-foreground mb-4">
        Simulate network latency on all responses. Accepts a fixed number, an array range, or a min/max object:
      </p>
      <CodeBlock language="javascript" code={`export default {
  latency: 500,                 // Fixed 500ms delay
  // OR
  latency: [200, 800],          // Random between 200-800ms
  // OR
  latency: { min: 100, max: 1000 },

  resources: { ... },
};`} />
      <Callout type="info">
        This is <strong>separate</strong> from Reality Mode's chaos latency. Global latency applies to every request deterministically.
        Chaos latency is random and only triggers on ~30% of requests.
      </Callout>

      {/* ── Chaos Config ── */}
      <h2 id="chaos" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Chaos / Reality Mode
      </h2>
      <p className="text-muted-foreground mb-4">
        Inject controlled instability to test frontend resilience. Add a <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">chaos</code> block to your config:
      </p>
      <CodeBlock language="javascript" code={`export default {
  chaos: {
    enabled: true,                        // Master switch
    latency: { min: 200, max: 5000 },     // Jitter range (ms)
    failureRate: 0.1,                     // 10% chance of 5xx error
    errorCodes: [500, 502, 503, 504],     // Possible error codes
    connectionDropRate: 0.02,             // 2% TCP socket drop
    corruptionRate: 0.02,                 // 2% malformed JSON
    timeoutRate: 0.03,                    // 3% request hangs forever
    scenarios: ['latency', 'failure', 'drop', 'corruption', 'timeout'],
  },

  resources: { ... },
};`} />
      <Callout type="info">
        See the full <a href="/docs/reality-mode" className="text-primary hover:underline font-medium">Reality Mode documentation</a> for scenario priority order, runtime control API, and recipes.
      </Callout>

      {/* ── Full Example ── */}
      <h2 id="full-example" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Full Example
      </h2>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 4000,
  prefix: '/api',
  latency: [100, 300],

  resources: {
    users: {
      seed: 30,
      auth: true,
      fields: {
        name: { type: 'name', required: true },
        email: { type: 'email', unique: true },
        username: 'username',
        avatar: 'avatar',
        role: { type: 'enum', values: ['admin', 'user', 'moderator'] },
        isActive: 'boolean',
      },
    },
    posts: {
      seed: 100,
      fields: {
        title: { type: 'title', required: true },
        body: { type: 'paragraphs', count: 3 },
        slug: 'slug',
        image: 'image',
        published: 'boolean',
        views: { type: 'number', min: 0, max: 10000 },
        userId: { type: 'relation', resource: 'users' },
      },
    },
    comments: {
      seed: 200,
      fields: {
        body: { type: 'paragraph', required: true },
        rating: 'rating',
        userId: { type: 'relation', resource: 'users' },
        postId: { type: 'relation', resource: 'posts' },
      },
    },
  },

  chaos: {
    enabled: false,
    failureRate: 0.05,
    connectionDropRate: 0.01,
  },
};`} />

      <NextPageLink to="/docs/api-reference" label="API Reference" />
    </article>
  );
}
