import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import EndpointCard from '@/components/docs/EndpointCard';
import ParamTable from '@/components/docs/ParamTable';
import NextPageLink from '@/components/docs/NextPageLink';

export default function ApiReference() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Reference
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">API Reference</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Complete reference for all endpoints, query parameters, and response formats.
      </p>

      <h2 id="crud" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        CRUD Endpoints
      </h2>
      <p className="text-muted-foreground mb-4">Every resource automatically gets these endpoints:</p>

      <EndpointCard method="GET" path="/api/:resource">
        List all records with pagination, filtering, sorting, and search.
      </EndpointCard>
      <EndpointCard method="GET" path="/api/:resource/:id">
        Get a single record by ID.
      </EndpointCard>
      <EndpointCard method="POST" path="/api/:resource">
        Create a new record. Send JSON body.
      </EndpointCard>
      <EndpointCard method="PUT" path="/api/:resource/:id">
        Replace an entire record.
      </EndpointCard>
      <EndpointCard method="PATCH" path="/api/:resource/:id">
        Partially update a record.
      </EndpointCard>
      <EndpointCard method="DELETE" path="/api/:resource/:id">
        Delete a record.
      </EndpointCard>

      <h2 id="pagination" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Pagination
      </h2>
      <p className="text-muted-foreground mb-4">Control pagination with query parameters:</p>
      <ParamTable params={[
        { name: '?page=1', type: 'number', children: 'Page number (1-based). Default: 1' },
        { name: '?limit=10', type: 'number', children: 'Records per page. Default: 10. Max: 100' },
        { name: '?offset=20', type: 'number', children: 'Skip N records. Alternative to page-based pagination.' },
      ]} />
      <CodeBlock language="bash" title="Example" code={`curl "http://localhost:3777/api/posts?page=2&limit=5"`} />
      <CodeBlock language="json" title="Response" code={`{
  "data": [ ... ],
  "meta": {
    "total": 50,
    "page": 2,
    "limit": 5,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": true
  }
}`} />

      <h2 id="filtering" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Filtering
      </h2>
      <p className="text-muted-foreground mb-4">Filter records by field values:</p>
      <ParamTable params={[
        { name: '?field=value', children: 'Exact match' },
        { name: '?field_gte=10', children: 'Greater than or equal' },
        { name: '?field_lte=100', children: 'Less than or equal' },
        { name: '?field_gt=10', children: 'Greater than' },
        { name: '?field_lt=100', children: 'Less than' },
        { name: '?field_ne=value', children: 'Not equal' },
        { name: '?field_like=text', children: 'Contains substring (case-insensitive)' },
      ]} />
      <CodeBlock language="bash" title="Examples" code={`# Exact match
curl "http://localhost:3777/api/products?category=Electronics"

# Price range
curl "http://localhost:3777/api/products?price_gte=10&price_lte=50"

# Contains text
curl "http://localhost:3777/api/posts?title_like=javascript"`} />

      <h2 id="sorting" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Sorting
      </h2>
      <p className="text-muted-foreground mb-4">Sort results by one or more fields:</p>
      <ParamTable params={[
        { name: '?sort=field', children: 'Sort ascending' },
        { name: '?sort=-field', children: 'Sort descending (prefix with -)' },
        { name: '?sort=field1,-field2', children: 'Multi-field sort (comma-separated)' },
      ]} />
      <CodeBlock language="bash" title="Examples" code={`# Sort by price ascending
curl "http://localhost:3777/api/products?sort=price"

# Sort by rating descending, then name ascending
curl "http://localhost:3777/api/products?sort=-rating,name"`} />

      <h2 id="search" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Full-Text Search
      </h2>
      <p className="text-muted-foreground mb-4">Search across all string fields in a resource:</p>
      <ParamTable params={[
        { name: '?q=term', children: 'Searches all string fields for the term (case-insensitive)' },
      ]} />
      <CodeBlock language="bash" title="Example" code={`curl "http://localhost:3777/api/users?q=john"`} />

      <h2 id="auth-endpoints" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Authentication
      </h2>
      <p className="text-muted-foreground mb-4">
        When a resource has <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">auth: true</code>, these endpoints are added:
      </p>

      <EndpointCard method="POST" path="/api/auth/register">
        Register a new user. Send <code className="text-sm font-mono">{'{ email, password, ...fields }'}</code>
      </EndpointCard>
      <EndpointCard method="POST" path="/api/auth/login">
        Login with email & password. Returns JWT token.
      </EndpointCard>
      <EndpointCard method="GET" path="/api/auth/me">
        Get current user. Requires <code className="text-sm font-mono">Authorization: Bearer {'<token>'}</code>
      </EndpointCard>

      <CodeBlock language="javascript" title="Auth flow example" code={`// Register
const reg = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Madhav',
    email: 'madhav@example.com',
    password: 'secret123',
  }),
});
const { token } = await reg.json();

// Access protected resource
const users = await fetch('/api/users', {
  headers: { Authorization: \`Bearer \${token}\` },
});`} />

      <h2 id="nested-routes" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Nested Routes
      </h2>
      <p className="text-muted-foreground mb-4">
        When a resource has a <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">relation</code> field, PhantomBack auto-generates nested routes:
      </p>
      <EndpointCard method="GET" path="/api/:parent/:id/:children">
        Get all child records belonging to a parent.
      </EndpointCard>
      <CodeBlock language="bash" title="Example" code={`# Get all comments for post #3
curl "http://localhost:3777/api/posts/3/comments"

# Get all posts by user #5
curl "http://localhost:3777/api/users/5/posts"`} />

      <h2 id="health-check" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Health Check
      </h2>
      <EndpointCard method="GET" path="/health">
        Returns server status, uptime, and resource counts.
      </EndpointCard>
      <CodeBlock language="json" title="Response" code={`{
  "status": "ok",
  "uptime": 123.456,
  "resources": {
    "users": 25,
    "posts": 50,
    "comments": 100
  }
}`} />

      <h2 id="response-format" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Response Format
      </h2>
      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">List Response</h3>
      <CodeBlock language="json" code={`{
  "data": [ { "id": 1, "name": "..." }, ... ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Single Record</h3>
      <CodeBlock language="json" code={`{
  "data": { "id": 1, "name": "John", "email": "john@example.com" }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Error Response</h3>
      <CodeBlock language="json" code={`{
  "error": "Not found",
  "status": 404
}`} />

      <h2 id="chaos-endpoints" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Reality Mode Endpoints
      </h2>
      <p className="text-muted-foreground mb-4">
        Control chaos injection at runtime (available when Reality Mode is installed):
      </p>

      <EndpointCard method="GET" path="/_chaos/status">
        Get current chaos state, configuration, and stats.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/enable">
        Enable Reality Mode at runtime.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/disable">
        Disable Reality Mode.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/pause">
        Temporarily pause chaos without disabling.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/resume">
        Resume chaos after pausing.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/configure">
        Update chaos config at runtime. Send JSON body.
      </EndpointCard>
      <EndpointCard method="POST" path="/_chaos/reset">
        Reset chaos stats counters.
      </EndpointCard>

      <Callout type="info">
        See the full <a href="/docs/reality-mode" className="text-primary hover:underline font-medium">Reality Mode documentation</a> for detailed response formats, recipes, and programmatic usage.
      </Callout>

      <NextPageLink to="/docs/reality-mode" label="Reality Mode" />
    </article>
  );
}
