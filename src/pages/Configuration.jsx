import CodeBlock from '../components/CodeBlock';
import './DocPage.css';

export default function Configuration() {
  return (
    <article className="doc-page">
      <div className="doc-badge">Docs</div>
      <h1>Configuration</h1>
      <p className="doc-lead">
        Define your resources, schemas, and server settings with a simple config file.
      </p>

      <h2 id="config-file">Config File</h2>
      <p>
        PhantomBack looks for <code>phantom.config.js</code> (or <code>.mjs</code> / <code>.json</code>) in your project root.
        Generate a starter config with:
      </p>
      <CodeBlock language="bash" title="Terminal" code={`phantomback init`} />

      <h2 id="structure">Config Structure</h2>
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

      <h2 id="field-types">Field Types</h2>
      <p>PhantomBack supports 40+ built-in field types powered by Faker.js:</p>

      <h3>Personal</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>fullName</code></td><td>John Smith</td></tr>
          <tr><td><code>firstName</code></td><td>John</td></tr>
          <tr><td><code>lastName</code></td><td>Smith</td></tr>
          <tr><td><code>email</code></td><td>john@example.com</td></tr>
          <tr><td><code>username</code></td><td>john_smith42</td></tr>
          <tr><td><code>phone</code></td><td>+1-555-0123</td></tr>
          <tr><td><code>avatar</code></td><td>https://avatars.dicebear.com/...</td></tr>
        </tbody>
      </table>

      <h3>Text</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>sentence</code></td><td>The quick brown fox jumps.</td></tr>
          <tr><td><code>paragraph</code></td><td>A single paragraph…</td></tr>
          <tr><td><code>paragraphs</code></td><td>Multiple paragraphs…</td></tr>
          <tr><td><code>word</code></td><td>synergy</td></tr>
          <tr><td><code>slug</code></td><td>lorem-ipsum-dolor</td></tr>
          <tr><td><code>title</code></td><td>The Art of Programming</td></tr>
        </tbody>
      </table>

      <h3>Numbers & Values</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>number</code></td><td>42</td></tr>
          <tr><td><code>price</code></td><td>29.99</td></tr>
          <tr><td><code>rating</code></td><td>4.5</td></tr>
          <tr><td><code>boolean</code></td><td>true / false</td></tr>
          <tr><td><code>percentage</code></td><td>73</td></tr>
        </tbody>
      </table>

      <h3>Date & Time</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>date</code></td><td>2024-03-15</td></tr>
          <tr><td><code>datetime</code></td><td>2024-03-15T10:30:00Z</td></tr>
          <tr><td><code>pastDate</code></td><td>2023-08-20</td></tr>
          <tr><td><code>futureDate</code></td><td>2025-01-10</td></tr>
        </tbody>
      </table>

      <h3>Internet & Media</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>url</code></td><td>https://example.com/page</td></tr>
          <tr><td><code>image</code></td><td>https://picsum.photos/640/480</td></tr>
          <tr><td><code>ip</code></td><td>192.168.1.100</td></tr>
          <tr><td><code>color</code></td><td>#a78bfa</td></tr>
        </tbody>
      </table>

      <h3>Location</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>address</code></td><td>123 Main St, Springfield</td></tr>
          <tr><td><code>city</code></td><td>San Francisco</td></tr>
          <tr><td><code>country</code></td><td>United States</td></tr>
          <tr><td><code>latitude</code></td><td>37.7749</td></tr>
          <tr><td><code>longitude</code></td><td>-122.4194</td></tr>
          <tr><td><code>zipCode</code></td><td>94102</td></tr>
        </tbody>
      </table>

      <h3>Business</h3>
      <table className="doc-table">
        <thead><tr><th>Type</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>company</code></td><td>Acme Corp</td></tr>
          <tr><td><code>jobTitle</code></td><td>Software Engineer</td></tr>
          <tr><td><code>productName</code></td><td>Ergonomic Keyboard</td></tr>
          <tr><td><code>uuid</code></td><td>550e8400-e29b...</td></tr>
        </tbody>
      </table>

      <h2 id="special-types">Special Field Types</h2>

      <h3>Enum</h3>
      <p>Randomly pick from a list of values:</p>
      <CodeBlock language="javascript" code={`role: { type: 'enum', values: ['admin', 'editor', 'viewer'] }`} />

      <h3>Relation</h3>
      <p>Create a foreign key pointing to another resource:</p>
      <CodeBlock language="javascript" code={`userId: { type: 'relation', resource: 'users' }
// This also auto-generates: GET /api/users/:id/posts`} />

      <h3>Object</h3>
      <p>Nested object fields:</p>
      <CodeBlock language="javascript" code={`address: {
  type: 'object',
  properties: {
    street: 'address',
    city: 'city',
    zip: 'zipCode',
  },
}`} />

      <h3>Array</h3>
      <p>Generate arrays of values:</p>
      <CodeBlock language="javascript" code={`tags: {
  type: 'array',
  items: 'word',
  min: 1,
  max: 5,
}`} />

      <h2 id="validation">Validation Rules</h2>
      <p>Add validation to fields for POST/PUT/PATCH requests:</p>
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

      <h2 id="auth-config">Auth Configuration</h2>
      <p>
        Set <code>auth: true</code> on any resource to protect it. A user-type resource with
        <code>email</code> and <code>password</code> fields is required for registration and login.
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

      <h2 id="delay">Response Delay</h2>
      <p>Simulate network latency:</p>
      <CodeBlock language="javascript" code={`export default {
  delay: 500,              // Fixed 500ms delay
  // OR
  delay: [200, 800],       // Random between 200-800ms
  // OR
  delay: { min: 100, max: 1000 },

  resources: { ... },
};`} />

      <div className="doc-next">
        <p>Next up:</p>
        <a href="/docs/api-reference">API Reference →</a>
      </div>
    </article>
  );
}
