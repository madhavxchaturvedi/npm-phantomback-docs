export default function ParamTable({ params }) {
  return (
    <div className="my-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {params.map(({ name, type, children }) => (
        <div key={name} className="rounded-lg border border-border bg-card p-3">
          <div className="flex items-center justify-between mb-1">
            <code className="text-sm font-mono font-medium text-primary">{name}</code>
            {type && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {type}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>
        </div>
      ))}
    </div>
  );
}
