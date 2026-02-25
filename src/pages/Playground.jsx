import { useState, useCallback } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import CodeBlock from '@/components/CodeBlock';
import Callout from '@/components/docs/Callout';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const defaultConfig = `{
  "port": 3000,
  "resources": {
    "posts": {
      "count": 5,
      "fields": {
        "title": "sentence",
        "body": "paragraph",
        "author": "fullName",
        "published": "boolean",
        "views": "number",
        "createdAt": "pastDate"
      }
    }
  }
}`;

const examples = [
  {
    name: 'Blog API',
    config: defaultConfig,
  },
  {
    name: 'E-Commerce',
    config: `{
  "port": 3000,
  "resources": {
    "products": {
      "count": 10,
      "fields": {
        "name": "productName",
        "price": "price",
        "description": "paragraph",
        "category": { "type": "enum", "values": ["Electronics", "Clothing", "Books", "Home"] },
        "inStock": "boolean",
        "rating": "float",
        "image": "imageUrl"
      }
    }
  }
}`,
  },
  {
    name: 'Auth API',
    config: `{
  "port": 3000,
  "auth": true,
  "resources": {
    "todos": {
      "count": 8,
      "fields": {
        "title": "sentence",
        "completed": "boolean",
        "priority": { "type": "enum", "values": ["low", "medium", "high"] },
        "dueDate": "futureDate"
      }
    }
  }
}`,
  },
];

function generateFakeData(config) {
  try {
    const parsed = JSON.parse(config);
    const result = {};

    if (!parsed.resources) {
      return { error: 'Config must include a "resources" object.' };
    }

    for (const [name, res] of Object.entries(parsed.resources)) {
      const count = res.count || 3;
      const items = [];
      for (let i = 1; i <= Math.min(count, 5); i++) {
        const item = { id: i };
        if (res.fields) {
          for (const [field, type] of Object.entries(res.fields)) {
            item[field] = generateFieldValue(field, type, i);
          }
        }
        items.push(item);
      }
      result[name] = items;
    }

    return {
      summary: {
        port: parsed.port || 3000,
        auth: !!parsed.auth,
        resources: Object.keys(parsed.resources),
      },
      preview: result,
    };
  } catch (e) {
    return { error: `Invalid JSON: ${e.message}` };
  }
}

function generateFieldValue(field, type, i) {
  const typeStr = typeof type === 'string' ? type : type?.type;

  if (typeof type === 'object' && type?.type === 'enum') {
    const vals = type.values || [];
    return vals[i % vals.length] || 'unknown';
  }

  const generators = {
    sentence: () => ['The quick brown fox jumps', 'A tale of two cities begins', 'Lorem ipsum dolor sit amet', 'Exploring new frontiers today', 'Building modern applications fast'][i % 5],
    paragraph: () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    fullName: () => ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson'][i % 5],
    firstName: () => ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'][i % 5],
    lastName: () => ['Johnson', 'Smith', 'Brown', 'Prince', 'Wilson'][i % 5],
    email: () => `user${i}@example.com`,
    boolean: () => i % 2 === 0,
    number: () => Math.floor(Math.random() * 1000),
    float: () => +(Math.random() * 5).toFixed(1),
    price: () => `$${(Math.random() * 100).toFixed(2)}`,
    productName: () => ['Widget Pro', 'Gadget X', 'Super Gizmo', 'MegaTool', 'TurboThing'][i % 5],
    imageUrl: () => `https://picsum.photos/seed/${i}/200/200`,
    pastDate: () => `2024-${String(i).padStart(2, '0')}-15T10:00:00Z`,
    futureDate: () => `2026-${String(i).padStart(2, '0')}-15T10:00:00Z`,
    uuid: () => `550e8400-e29b-41d4-a716-44665544000${i}`,
    url: () => `https://example.com/page/${i}`,
    word: () => ['alpha', 'bravo', 'charlie', 'delta', 'echo'][i % 5],
  };

  return (generators[typeStr] || generators.sentence)();
}

export default function Playground() {
  const { theme } = useTheme();
  const [config, setConfig] = useState(defaultConfig);
  const [output, setOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  const runPreview = useCallback(() => {
    const result = generateFakeData(config);
    setOutput(result);
  }, [config]);

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    setOutput(null);
  }, []);

  const copyConfig = useCallback(() => {
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [config]);

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Interactive
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Playground</h1>
      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Write a PhantomBack config and preview the generated API response — right in your browser.
      </p>

      <Callout type="info">
        This is a client-side simulation. The actual PhantomBack server uses Faker.js for much richer data generation. This playground previews your config structure and endpoints.
      </Callout>

      {/* Example presets */}
      <div className="flex flex-wrap gap-2 mb-6 mt-6">
        {examples.map((ex) => (
          <button
            key={ex.name}
            onClick={() => { setConfig(ex.config); setOutput(null); }}
            className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
          >
            {ex.name}
          </button>
        ))}
      </div>

      {/* Editor + Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Editor */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Config Editor</span>
            <div className="flex items-center gap-1">
              <button
                onClick={copyConfig}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={resetConfig}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            </div>
          </div>
          <div className="p-0">
            <CodeEditor
              value={config}
              language="json"
              onChange={(e) => setConfig(e.target.value)}
              padding={16}
              data-color-mode={isDark ? 'dark' : 'light'}
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                fontSize: 13,
                lineHeight: 1.6,
                backgroundColor: 'transparent',
                minHeight: 360,
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preview</span>
          </div>
          <div className="p-4 min-h-[360px]">
            {output ? (
              output.error ? (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive text-sm">
                  {output.error}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      Port: {output.summary.port}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${output.summary.auth ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      Auth: {output.summary.auth ? 'On' : 'Off'}
                    </span>
                    {output.summary.resources.map((r) => (
                      <span key={r} className="rounded-full bg-info/10 px-2.5 py-0.5 text-xs font-medium text-info">
                        /{r}
                      </span>
                    ))}
                  </div>

                  {/* Endpoints list */}
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated Endpoints</p>
                    {output.summary.resources.map((r) => (
                      <div key={r} className="space-y-1 text-xs font-mono">
                        <div><span className="text-success font-bold">GET</span> <span className="text-foreground/80">/{r}</span></div>
                        <div><span className="text-success font-bold">GET</span> <span className="text-foreground/80">/{r}/:id</span></div>
                        <div><span className="text-info font-bold">POST</span> <span className="text-foreground/80">/{r}</span></div>
                        <div><span className="text-warning font-bold">PUT</span> <span className="text-foreground/80">/{r}/:id</span></div>
                        <div><span className="text-warning font-bold">PATCH</span> <span className="text-foreground/80">/{r}/:id</span></div>
                        <div><span className="text-destructive font-bold">DELETE</span> <span className="text-foreground/80">/{r}/:id</span></div>
                      </div>
                    ))}
                  </div>

                  {/* Sample data */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sample Response</p>
                    <CodeBlock language="json" code={JSON.stringify(output.preview, null, 2)} />
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-muted-foreground gap-3">
                <Play size={32} className="opacity-30" />
                <p className="text-sm">Click <strong>Run Preview</strong> to see the output</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Run button */}
      <button
        onClick={runPreview}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:brightness-110 transition-all cursor-pointer"
      >
        <Play size={16} />
        Run Preview
      </button>
    </article>
  );
}
