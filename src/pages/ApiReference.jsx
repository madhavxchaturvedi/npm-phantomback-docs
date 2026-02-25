import CodeBlock from '../components/CodeBlock';
import './DocPage.css';

export default function ApiReference() {
  return (
    <article className="doc-page">
      <div className="doc-badge">Reference</div>
      <h1>API Reference</h1>
      <p className="doc-lead">
        Complete reference for all endpoints, query parameters, and response formats.
      </p>

      <h2 id="crud">CRUD Endpoints</h2>
      <p>Every resource automatically gets these endpoints:</p>

      <div className="endpoint">
        <span className="endpoint-method get">GET</span>
        <span className="endpoint-path">/api/:resource</span>
        <p>List all records with pagination, filtering, sorting, and search.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method get">GET</span>
        <span className="endpoint-path">/api/:resource/:id</span>
        <p>Get a single record by ID.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method post">POST</span>
        <span className="endpoint-path">/api/:resource</span>
        <p>Create a new record. Send JSON body.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method put">PUT</span>
        <span className="endpoint-path">/api/:resource/:id</span>
        <p>Replace an entire record.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method patch">PATCH</span>
        <span className="endpoint-path">/api/:resource/:id</span>
        <p>Partially update a record.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method delete">DELETE</span>
        <span className="endpoint-path">/api/:resource/:id</span>
        <p>Delete a record.</p>
      </div>

      <h2 id="pagination">Pagination</h2>
      <p>Control pagination with query parameters:</p>
      <div className="param-grid">
        <div className="param-card">
          <span className="param-name">?page=1</span>
          <span className="param-type">number</span>
          <p>Page number (1-based). Default: 1</p>
        </div>
        <div className="param-card">
          <span className="param-name">?limit=10</span>
          <span className="param-type">number</span>
          <p>Records per page. Default: 10. Max: 100</p>
        </div>
        <div className="param-card">
          <span className="param-name">?offset=20</span>
          <span className="param-type">number</span>
          <p>Skip N records. Alternative to page-based pagination.</p>
        </div>
      </div>
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

      <h2 id="filtering">Filtering</h2>
      <p>Filter records by field values:</p>
      <div className="param-grid">
        <div className="param-card">
          <span className="param-name">?field=value</span>
          <p>Exact match</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_gte=10</span>
          <p>Greater than or equal</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_lte=100</span>
          <p>Less than or equal</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_gt=10</span>
          <p>Greater than</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_lt=100</span>
          <p>Less than</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_ne=value</span>
          <p>Not equal</p>
        </div>
        <div className="param-card">
          <span className="param-name">?field_like=text</span>
          <p>Contains substring (case-insensitive)</p>
        </div>
      </div>
      <CodeBlock language="bash" title="Examples" code={`# Exact match
curl "http://localhost:3777/api/products?category=Electronics"

# Price range
curl "http://localhost:3777/api/products?price_gte=10&price_lte=50"

# Contains text
curl "http://localhost:3777/api/posts?title_like=javascript"`} />

      <h2 id="sorting">Sorting</h2>
      <p>Sort results by one or more fields:</p>
      <div className="param-grid">
        <div className="param-card">
          <span className="param-name">?sort=field</span>
          <p>Sort ascending</p>
        </div>
        <div className="param-card">
          <span className="param-name">?sort=-field</span>
          <p>Sort descending (prefix with -)</p>
        </div>
        <div className="param-card">
          <span className="param-name">?sort=field1,-field2</span>
          <p>Multi-field sort (comma-separated)</p>
        </div>
      </div>
      <CodeBlock language="bash" title="Examples" code={`# Sort by price ascending
curl "http://localhost:3777/api/products?sort=price"

# Sort by rating descending, then name ascending
curl "http://localhost:3777/api/products?sort=-rating,name"`} />

      <h2 id="search">Full-Text Search</h2>
      <p>Search across all string fields in a resource:</p>
      <div className="param-grid">
        <div className="param-card">
          <span className="param-name">?q=term</span>
          <p>Searches all string fields for the term (case-insensitive)</p>
        </div>
      </div>
      <CodeBlock language="bash" title="Example" code={`curl "http://localhost:3777/api/users?q=john"`} />

      <h2 id="auth-endpoints">Authentication</h2>
      <p>When a resource has <code>auth: true</code>, these endpoints are added:</p>

      <div className="endpoint">
        <span className="endpoint-method post">POST</span>
        <span className="endpoint-path">/api/auth/register</span>
        <p>Register a new user. Send <code>{"{ email, password, ...fields }"}</code></p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method post">POST</span>
        <span className="endpoint-path">/api/auth/login</span>
        <p>Login with email & password. Returns JWT token.</p>
      </div>

      <div className="endpoint">
        <span className="endpoint-method get">GET</span>
        <span className="endpoint-path">/api/auth/me</span>
        <p>Get current user. Requires <code>Authorization: Bearer &lt;token&gt;</code></p>
      </div>

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

      <h2 id="nested-routes">Nested Routes</h2>
      <p>
        When a resource has a <code>relation</code> field, PhantomBack auto-generates
        nested routes:
      </p>
      <div className="endpoint">
        <span className="endpoint-method get">GET</span>
        <span className="endpoint-path">/api/:parent/:id/:children</span>
        <p>Get all child records belonging to a parent.</p>
      </div>
      <CodeBlock language="bash" title="Example" code={`# Get all comments for post #3
curl "http://localhost:3777/api/posts/3/comments"

# Get all posts by user #5
curl "http://localhost:3777/api/users/5/posts"`} />

      <h2 id="health-check">Health Check</h2>
      <div className="endpoint">
        <span className="endpoint-method get">GET</span>
        <span className="endpoint-path">/health</span>
        <p>Returns server status, uptime, and resource counts.</p>
      </div>
      <CodeBlock language="json" title="Response" code={`{
  "status": "ok",
  "uptime": 123.456,
  "resources": {
    "users": 25,
    "posts": 50,
    "comments": 100
  }
}`} />

      <h2 id="response-format">Response Format</h2>
      <h3>List Response</h3>
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

      <h3>Single Record</h3>
      <CodeBlock language="json" code={`{
  "data": { "id": 1, "name": "John", "email": "john@example.com" }
}`} />

      <h3>Error Response</h3>
      <CodeBlock language="json" code={`{
  "error": "Not found",
  "status": 404
}`} />

      <div className="doc-next">
        <p>Next up:</p>
        <a href="/docs/examples">Real-World Examples →</a>
      </div>
    </article>
  );
}
