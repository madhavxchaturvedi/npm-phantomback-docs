import CodeBlock, { CodeTabs } from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import EndpointCard from '@/components/docs/EndpointCard';
import ParamTable from '@/components/docs/ParamTable';
import NextPageLink from '@/components/docs/NextPageLink';

export default function Authentication() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Feature
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Authentication</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Built-in JWT authentication with register, login, and protected routes — ready out of the box with zero backend code.
      </p>

      {/* ─── Overview ─── */}
      <h2 id="overview" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Overview
      </h2>
      <p className="text-muted-foreground mb-4">
        PhantomBack includes a complete JWT authentication system. When you mark a resource with{' '}
        <code>auth: true</code>, it automatically:
      </p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1.5 mb-6 ml-2">
        <li>Creates <code>/auth/register</code>, <code>/auth/login</code>, and <code>/auth/me</code> endpoints</li>
        <li>Protects that resource's CRUD endpoints with JWT token verification</li>
        <li>Hashes passwords and issues signed tokens on registration and login</li>
        <li>Returns the authenticated user's profile on <code>/auth/me</code></li>
      </ul>

      {/* ─── Setup ─── */}
      <h2 id="setup" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Setup
      </h2>
      <p className="text-muted-foreground mb-4">
        Add <code>auth: true</code> to any resource that should be protected. The resource needs an{' '}
        <code>email</code> field for authentication to work:
      </p>
      <CodeBlock language="javascript" title="phantom.config.js" code={`export default {
  port: 3777,
  prefix: '/api',
  resources: {
    users: {
      seed: 20,
      auth: true,           // ← Enables JWT auth for this resource
      fields: {
        name: 'name',
        email: 'email',     // ← Required for auth
        avatar: 'avatar',
        role: { type: 'enum', values: ['admin', 'user'] },
      },
    },
    // Non-protected resources remain fully open
    posts: {
      seed: 50,
      fields: {
        title: 'sentence',
        body: 'paragraphs',
        userId: { type: 'relation', resource: 'users' },
      },
    },
  },
};`} />

      <Callout type="tip" title="Zero-Config Auth">
        In zero-config mode (<code>--zero</code>), the <code>users</code> resource is automatically protected with auth enabled.
      </Callout>

      {/* ─── Endpoints ─── */}
      <h2 id="endpoints" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Auth Endpoints
      </h2>

      <h3 id="register" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Register</h3>
      <EndpointCard method="POST" path="/api/auth/register">
        Create a new user account. Send JSON body with <code>email</code>, <code>password</code>, and any additional fields defined in your schema.
      </EndpointCard>
      <CodeTabs tabs={[
        {
          label: 'curl',
          language: 'bash',
          code: `curl -X POST http://localhost:3777/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Madhav Chaturvedi",
    "email": "madhav@example.com",
    "password": "secret123"
  }'`,
        },
        {
          label: 'fetch',
          language: 'javascript',
          code: `const res = await fetch('http://localhost:3777/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Madhav Chaturvedi',
    email: 'madhav@example.com',
    password: 'secret123',
  }),
});
const data = await res.json();
console.log(data.token); // JWT token`,
        },
      ]} />
      <CodeBlock language="json" title="Success Response" code={`{
  "success": true,
  "data": {
    "user": {
      "id": "abc123",
      "name": "Madhav Chaturvedi",
      "email": "madhav@example.com",
      "avatar": "https://avatars.dicebear.com/..."
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}`} />

      <h3 id="login" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Login</h3>
      <EndpointCard method="POST" path="/api/auth/login">
        Authenticate with email and password. Returns a JWT token.
      </EndpointCard>
      <CodeTabs tabs={[
        {
          label: 'curl',
          language: 'bash',
          code: `curl -X POST http://localhost:3777/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "madhav@example.com", "password": "secret123"}'`,
        },
        {
          label: 'fetch',
          language: 'javascript',
          code: `const res = await fetch('http://localhost:3777/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'madhav@example.com',
    password: 'secret123',
  }),
});
const { data } = await res.json();
const token = data.token;`,
        },
      ]} />
      <CodeBlock language="json" title="Success Response" code={`{
  "success": true,
  "data": {
    "user": {
      "id": "abc123",
      "name": "Madhav Chaturvedi",
      "email": "madhav@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}`} />

      <CodeBlock language="json" title="Error Response — Invalid Credentials" code={`{
  "success": false,
  "error": {
    "status": 401,
    "message": "Invalid email or password"
  }
}`} />

      <h3 id="me" className="text-lg font-semibold text-foreground mt-8 mb-3 scroll-mt-20">Get Current User</h3>
      <EndpointCard method="GET" path="/api/auth/me">
        Get the authenticated user's profile. Requires a valid JWT token in the Authorization header.
      </EndpointCard>
      <CodeTabs tabs={[
        {
          label: 'curl',
          language: 'bash',
          code: `curl http://localhost:3777/api/auth/me \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."`,
        },
        {
          label: 'fetch',
          language: 'javascript',
          code: `const res = await fetch('http://localhost:3777/api/auth/me', {
  headers: {
    Authorization: \`Bearer \${token}\`,
  },
});
const { data } = await res.json();
console.log(data); // User profile object`,
        },
      ]} />
      <CodeBlock language="json" title="Success Response" code={`{
  "success": true,
  "data": {
    "id": "abc123",
    "name": "Madhav Chaturvedi",
    "email": "madhav@example.com",
    "avatar": "https://avatars.dicebear.com/...",
    "role": "admin"
  }
}`} />

      {/* ─── Protected Routes ─── */}
      <h2 id="protected-routes" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Protected Routes
      </h2>
      <p className="text-muted-foreground mb-4">
        When <code>auth: true</code> is set on a resource, all CRUD endpoints for that resource require a valid JWT token.
        Requests without a token (or with an expired/invalid token) receive a <code>401 Unauthorized</code> response:
      </p>
      <CodeBlock language="json" title="401 Response" code={`{
  "success": false,
  "error": {
    "status": 401,
    "message": "Authorization token required"
  }
}`} />
      <p className="text-muted-foreground mb-4 mt-4">
        To access protected endpoints, include the token in the <code>Authorization</code> header:
      </p>
      <CodeBlock language="bash" title="Accessing protected resources" code={`# This will return 401 — no token
curl http://localhost:3777/api/users

# This works — token provided
curl http://localhost:3777/api/users \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

# All CRUD operations require the token
curl -X POST http://localhost:3777/api/users \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \\
  -H "Content-Type: application/json" \\
  -d '{"name": "New User", "email": "new@example.com"}'`} />

      <Callout type="info" title="Selective Protection">
        Only resources with <code>auth: true</code> are protected. Other resources remain fully open with no authentication required.
        You can protect multiple resources by setting <code>auth: true</code> on each.
      </Callout>

      {/* ─── Full Flow Example ─── */}
      <h2 id="full-flow" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Complete Auth Flow
      </h2>
      <p className="text-muted-foreground mb-4">
        Here's a complete example showing registration, login, and accessing protected resources:
      </p>
      <CodeBlock language="javascript" title="Complete auth flow" code={`// 1. Register a new user
const registerRes = await fetch('http://localhost:3777/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Madhav Chaturvedi',
    email: 'madhav@example.com',
    password: 'secret123',
  }),
});
const { data: regData } = await registerRes.json();
const token = regData.token;

// 2. Use the token to access protected resources
const usersRes = await fetch('http://localhost:3777/api/users', {
  headers: { Authorization: \`Bearer \${token}\` },
});
const { data: users, meta } = await usersRes.json();
console.log(users);  // Array of users
console.log(meta);   // { total, page, limit, totalPages, hasNext, hasPrev }

// 3. Get current authenticated user
const meRes = await fetch('http://localhost:3777/api/auth/me', {
  headers: { Authorization: \`Bearer \${token}\` },
});
const { data: me } = await meRes.json();
console.log(me.name);  // "Madhav Chaturvedi"

// 4. Non-protected resources don't need a token
const postsRes = await fetch('http://localhost:3777/api/posts');
const { data: posts } = await postsRes.json();
console.log(posts);  // Works without auth`} />

      {/* ─── Error Responses ─── */}
      <h2 id="error-responses" className="text-xl font-semibold text-foreground mt-10 mb-4 scroll-mt-20">
        Error Responses
      </h2>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">When</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Message</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['400', 'Missing email or password in register/login', 'Email and password are required'],
              ['401', 'No token provided for protected resource', 'Authorization token required'],
              ['401', 'Invalid or expired token', 'Invalid or expired token'],
              ['401', 'Wrong email or password on login', 'Invalid email or password'],
              ['409', 'Email already exists on register', 'Email already registered'],
            ].map(([status, when, message], i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-2.5 px-4">
                  <code className="text-sm font-mono bg-destructive/10 text-destructive px-1.5 py-0.5 rounded">{status}</code>
                </td>
                <td className="py-2.5 px-4 text-muted-foreground">{when}</td>
                <td className="py-2.5 px-4 text-muted-foreground font-mono text-xs">{message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Development Only">
        PhantomBack's auth is designed for frontend prototyping. Tokens use a simple secret, passwords are
        hashed in-memory, and everything resets on server restart. Never use this as real authentication.
      </Callout>

      <div className="flex flex-col sm:flex-row gap-3 mt-12">
        <NextPageLink to="/docs/reality-mode" label="Reality Mode" />
      </div>
    </article>
  );
}
