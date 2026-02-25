import { cn } from '@/lib/utils';

const changelog = [
  {
    version: '1.0.0',
    date: '2025-01-15',
    changes: [
      { type: 'added', text: 'Zero-config mode with --zero flag (5 resources, realistic data)' },
      { type: 'added', text: '40+ built-in field types powered by Faker.js' },
      { type: 'added', text: 'Full CRUD REST API auto-generation' },
      { type: 'added', text: 'JWT authentication with register, login, and protected routes' },
      { type: 'added', text: 'Pagination with page, limit, and offset parameters' },
      { type: 'added', text: 'Filtering with 7 operators (eq, gte, lte, gt, lt, ne, like)' },
      { type: 'added', text: 'Multi-field sorting (ascending and descending)' },
      { type: 'added', text: 'Full-text search across all string fields' },
      { type: 'added', text: 'Relation fields with auto-generated nested routes' },
      { type: 'added', text: 'Special field types: enum, object, array, relation' },
      { type: 'added', text: 'Validation rules for POST/PUT/PATCH requests' },
      { type: 'added', text: 'Response delay simulation (fixed, random, range)' },
      { type: 'added', text: 'CLI with start and init commands' },
      { type: 'added', text: 'Programmatic API: createPhantom and createPhantomZero' },
      { type: 'added', text: 'Health check endpoint at /health' },
      { type: 'added', text: 'Custom port, prefix, and config file options' },
    ],
  },
];

const typeStyles = {
  added: 'bg-success/10 text-success border-success/20',
  changed: 'bg-info/10 text-info border-info/20',
  fixed: 'bg-warning/10 text-warning border-warning/20',
  removed: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function Changelog() {
  return (
    <article>
      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
        Updates
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Changelog</h1>
      <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
        Version history and updates for PhantomBack.
      </p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border hidden sm:block" />

        {changelog.map((release) => (
          <div key={release.version} className="relative mb-12">
            {/* Version header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border-2 border-primary shrink-0">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <h2 id={`v${release.version}`} className="text-xl font-bold text-foreground scroll-mt-20">
                  v{release.version}
                </h2>
                <p className="text-sm text-muted-foreground">{release.date}</p>
              </div>
            </div>

            {/* Changes */}
            <div className="sm:ml-12 space-y-2">
              {release.changes.map((change, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 hover:bg-accent/50 transition-colors"
                >
                  <span className={cn(
                    'inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border shrink-0 mt-0.5',
                    typeStyles[change.type]
                  )}>
                    {change.type}
                  </span>
                  <p className="text-sm text-foreground/90 leading-relaxed">{change.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
