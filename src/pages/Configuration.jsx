import CodeBlock from '@/components/CodeBlock';
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
        Define your resources, schemas, and server settings with a simple config file.
      </p>

      <h2 id="config-file" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Config File
      </h2>
      <p className="text-muted-foreground mb-4">
        PhantomBack looks for <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">phantom.config.js</code> (or <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.mjs</code> / <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">.json</code>) in your project root. Generate a starter config with:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback init`} />

      <h2 id="structure" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Config Structure
      </h2>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  // Server settings
  port: 3777,           // Server port
  prefix: '/api',       // Route prefix

  // Resource definitions
  resources: {
    resourceName: {
      count: 25,          // Number of records to generate
      auth: false,        // Require JWT auth for this resource
      schema: { ... },    // Field definitions
    },
  },
};`} />

      <h2 id="field-types" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Field Types
      </h2>
      <p className="text-muted-foreground mb-4">PhantomBack supports 40+ built-in field types powered by Faker.js:</p>

      <h3 id="personal" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Personal</h3>
      <FieldTable fields={[
        ['fullName', 'John Smith'],
        ['firstName', 'John'],
        ['lastName', 'Smith'],
        ['email', 'john@example.com'],
        ['username', 'john_smith42'],
        ['phone', '+1-555-0123'],
        ['avatar', 'https://avatars.dicebear.com/...'],
      ]} />

      <h3 id="text" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Text</h3>
      <FieldTable fields={[
        ['sentence', 'The quick brown fox jumps.'],
        ['paragraph', 'A single paragraph…'],
        ['paragraphs', 'Multiple paragraphs…'],
        ['word', 'synergy'],
        ['slug', 'lorem-ipsum-dolor'],
        ['title', 'The Art of Programming'],
      ]} />

      <h3 id="numbers" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Numbers & Values</h3>
      <FieldTable fields={[
        ['number', '42'],
        ['price', '29.99'],
        ['rating', '4.5'],
        ['boolean', 'true / false'],
        ['percentage', '73'],
      ]} />

      <h3 id="dates" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Date & Time</h3>
      <FieldTable fields={[
        ['date', '2024-03-15'],
        ['datetime', '2024-03-15T10:30:00Z'],
        ['pastDate', '2023-08-20'],
        ['futureDate', '2025-01-10'],
      ]} />

      <h3 id="internet" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Internet & Media</h3>
      <FieldTable fields={[
        ['url', 'https://example.com/page'],
        ['image', 'https://picsum.photos/640/480'],
        ['ip', '192.168.1.100'],
        ['color', '#a78bfa'],
      ]} />

      <h3 id="location" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Location</h3>
      <FieldTable fields={[
        ['address', '123 Main St, Springfield'],
        ['city', 'San Francisco'],
        ['country', 'United States'],
        ['latitude', '37.7749'],
        ['longitude', '-122.4194'],
        ['zipCode', '94102'],
      ]} />

      <h3 id="business" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Business</h3>
      <FieldTable fields={[
        ['company', 'Acme Corp'],
        ['jobTitle', 'Software Engineer'],
        ['productName', 'Ergonomic Keyboard'],
        ['uuid', '550e8400-e29b...'],
      ]} />

      <h2 id="special-types" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Special Field Types
      </h2>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Enum</h3>
      <p className="text-muted-foreground mb-4">Randomly pick from a list of values:</p>
      <CodeBlock language="javascript" code={`role: { type: 'enum', values: ['admin', 'editor', 'viewer'] }`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Relation</h3>
      <p className="text-muted-foreground mb-4">Create a foreign key pointing to another resource:</p>
      <CodeBlock language="javascript" code={`userId: { type: 'relation', resource: 'users' }
// This also auto-generates: GET /api/users/:id/posts`} />

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Object</h3>
      <p className="text-muted-foreground mb-4">Nested object fields:</p>
      <CodeBlock language="javascript" code={`address: {
  type: 'object',
  properties: {
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
  min: 1,
  max: 5,
}`} />

      <h2 id="validation" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Validation Rules
      </h2>
      <p className="text-muted-foreground mb-4">Add validation to fields for POST/PUT/PATCH requests:</p>
      <CodeBlock language="javascript" code={`schema: {
  email: {
    type: 'email',
    required: true,      // Must be present
    unique: true,        // No duplicates
  },
  name: {
    type: 'fullName',
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

      <h2 id="auth-config" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Auth Configuration
      </h2>
      <p className="text-muted-foreground mb-4">
        Set <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">auth: true</code> on any resource to protect it. A user-type resource with{' '}
        <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">email</code> and{' '}
        <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">password</code> fields is required for registration and login.
      </p>
      <CodeBlock language="javascript" code={`resources: {
  users: {
    count: 20,
    auth: true,    // Protect this resource
    schema: {
      name: 'fullName',
      email: 'email',
      password: 'password',
    },
  },
  // Other resources remain open
  posts: {
    count: 50,
    schema: { title: 'sentence', body: 'paragraphs' },
  },
}`} />

      <h2 id="delay" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Response Delay
      </h2>
      <p className="text-muted-foreground mb-4">Simulate network latency:</p>
      <CodeBlock language="javascript" code={`export default {
  delay: 500,              // Fixed 500ms delay
  // OR
  delay: [200, 800],       // Random between 200-800ms
  // OR
  delay: { min: 100, max: 1000 },

  resources: { ... },
};`} />

      <NextPageLink to="/docs/api-reference" label="API Reference" />
    </article>
  );
}
