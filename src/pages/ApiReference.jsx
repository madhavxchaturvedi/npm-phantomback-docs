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

      {/* ── Info Endpoint ── */}
      <h2 id="info" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Info Endpoint
      </h2>
      <EndpointCard method="GET" path="/api">
        Returns a list of all available routes and resources.
      </EndpointCard>
      <CodeBlock language="json" title="Response" code={`{
  "success": true,
  "message": "👻 PhantomBack API is running!",
  "endpoints": {
    "users": {
      "list": "GET /api/users",
      "getOne": "GET /api/users/:id",
      "create": "POST /api/users",
      "update": "PUT /api/users/:id",
      "patch": "PATCH /api/users/:id",
      "delete": "DELETE /api/users/:id",
      "nested": ["GET /api/users/:id/posts"]
    }
  }
}`} />

      {/* ── Health Check ── */}
      <h2 id="health-check" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Health Check
      </h2>
      <EndpointCard method="GET" path="/api/_health">
        Returns server status and uptime. Uses your configured prefix.
      </EndpointCard>
      <CodeBlock language="json" title="Response" code={`{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-12-15T10:30:00.000Z"
}`} />

      {/* ── CRUD ── */}
      <h2 id="crud" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        CRUD Endpoints
      </h2>
      <p className="text-muted-foreground mb-4">Every resource automatically gets these endpoints:</p>

      <EndpointCard method="GET" path="/api/:resource">
        List all records with pagination, filtering, sorting, search, and field selection.
      </EndpointCard>
      <EndpointCard method="GET" path="/api/:resource/:id">
        Get a single record by ID.
      </EndpointCard>
      <EndpointCard method="POST" path="/api/:resource">
        Create a new record. Send JSON body. Validates required/unique fields.
      </EndpointCard>
      <EndpointCard method="PUT" path="/api/:resource/:id">
        Replace an entire record. Validates all required fields.
      </EndpointCard>
      <EndpointCard method="PATCH" path="/api/:resource/:id">
        Partially update a record. Only validates provided fields.
      </EndpointCard>
      <EndpointCard method="DELETE" path="/api/:resource/:id">
        Delete a record.
      </EndpointCard>

      {/* ── Pagination ── */}
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
  "success": true,
  "meta": {
    "total": 50,
    "page": 2,
    "limit": 5,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": true
  },
  "data": [ ... ]
}`} />

      {/* ── Filtering ── */}
      <h2 id="filtering" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Filtering
      </h2>
      <p className="text-muted-foreground mb-4">Filter records by field values using 7 operators:</p>
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

# Contains text (case-insensitive)
curl "http://localhost:3777/api/posts?title_like=javascript"

# Not equal
curl "http://localhost:3777/api/users?role_ne=admin"`} />

      {/* ── Sorting ── */}
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

      {/* ── Search ── */}
      <h2 id="search" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Full-Text Search
      </h2>
      <p className="text-muted-foreground mb-4">Search across all string fields in a resource. Three aliases are supported:</p>
      <ParamTable params={[
        { name: '?q=term', children: 'Primary search param (case-insensitive, all string fields)' },
        { name: '?_q=term', children: 'Alias for ?q' },
        { name: '?search=term', children: 'Alias for ?q' },
      ]} />
      <CodeBlock language="bash" title="Example" code={`curl "http://localhost:3777/api/users?q=john"`} />

      {/* ── Field Selection ── */}
      <h2 id="field-selection" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Field Selection
      </h2>
      <p className="text-muted-foreground mb-4">Return only specific fields to reduce payload size. Three aliases are supported:</p>
      <ParamTable params={[
        { name: '?fields=a,b', children: 'Comma-separated field names (id is always included)' },
        { name: '?_fields=a,b', children: 'Alias for ?fields' },
        { name: '?select=a,b', children: 'Alias for ?fields' },
      ]} />
      <CodeBlock language="bash" title="Example" code={`curl "http://localhost:3777/api/users?fields=name,email"

# Response:
# [{ "id": 1, "name": "John", "email": "john@example.com" }, ...]`} />
      <Callout type="info">
        The <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">id</code> field is always included in field selection results, even if not explicitly requested.
      </Callout>

      {/* ── Combining Params ── */}
      <h2 id="combining" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Combining Query Params
      </h2>
      <p className="text-muted-foreground mb-4">All query params can be combined freely:</p>
      <CodeBlock language="bash" title="Combined example" code={`# Search for "keyboard" products, price range, sorted, page 1, specific fields
curl "http://localhost:3777/api/products?q=keyboard&price_gte=20&price_lte=200&sort=-rating&page=1&limit=5&fields=name,price,rating"`} />

      {/* ── Nested Routes ── */}
      <h2 id="nested-routes" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Nested Routes
      </h2>
      <p className="text-muted-foreground mb-4">
        When a resource has a <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">relation</code> field, PhantomBack auto-generates nested routes.
        Nested routes support the same query params (search, filter, sort, pagination) as regular routes.
      </p>
      <EndpointCard method="GET" path="/api/:parent/:id/:children">
        Get all child records belonging to a parent.
      </EndpointCard>
      <CodeBlock language="bash" title="Example" code={`# Get all comments for post #3
curl "http://localhost:3777/api/posts/3/comments"

# Get all posts by user #5, sorted by views
curl "http://localhost:3777/api/users/5/posts?sort=-views"

# Search within a user's posts
curl "http://localhost:3777/api/users/5/posts?q=javascript"`} />

      {/* ── Response Format ── */}
      <h2 id="response-format" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Response Format
      </h2>
      <p className="text-muted-foreground mb-4">All responses are wrapped in a consistent envelope with a <code className="text-sm font-mono bg-muted text-cyan px-1.5 py-0.5 rounded">success</code> flag:</p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">List (paginated)</h3>
      <CodeBlock language="json" code={`{
  "success": true,
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "data": [
    { "id": 1, "name": "..." },
    { "id": 2, "name": "..." }
  ]
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Single Record (GET / POST / PUT / PATCH)</h3>
      <CodeBlock language="json" code={`{
  "success": true,
  "data": { "id": 1, "name": "John", "email": "john@example.com" }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Delete</h3>
      <CodeBlock language="json" code={`{
  "success": true,
  "data": { "message": "users deleted successfully", "id": "1" }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Error Response</h3>
      <CodeBlock language="json" code={`{
  "success": false,
  "error": {
    "status": 404,
    "message": "users with id \\"999\\" not found"
  }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Validation Error</h3>
      <CodeBlock language="json" code={`{
  "success": false,
  "error": {
    "status": 400,
    "message": "Validation failed",
    "details": [
      "Field \\"email\\" is required",
      "Field \\"name\\" is required"
    ]
  }
}`} />

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">404 (Route Not Found)</h3>
      <CodeBlock language="json" code={`{
  "success": false,
  "error": {
    "status": 404,
    "message": "Route not found. Check your API prefix and resource names."
  }
}`} />

      <Callout type="tip">
        Authentication and Reality Mode have their own dedicated pages. See <a href="/docs/authentication" className="text-primary hover:underline font-medium">Authentication</a> and <a href="/docs/reality-mode" className="text-primary hover:underline font-medium">Reality Mode</a> for their respective APIs.
      </Callout>

      <NextPageLink to="/docs/authentication" label="Authentication" />
    </article>
  );
}
