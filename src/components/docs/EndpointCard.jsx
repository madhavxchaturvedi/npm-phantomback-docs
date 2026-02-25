import { cn } from '@/lib/utils';

const methodStyles = {
  GET: 'bg-method-get/10 text-method-get border-method-get/20',
  POST: 'bg-method-post/10 text-method-post border-method-post/20',
  PUT: 'bg-method-put/10 text-method-put border-method-put/20',
  PATCH: 'bg-method-patch/10 text-method-patch border-method-patch/20',
  DELETE: 'bg-method-delete/10 text-method-delete border-method-delete/20',
};

const methodBadge = {
  GET: 'bg-method-get text-white',
  POST: 'bg-method-post text-white',
  PUT: 'bg-method-put text-white',
  PATCH: 'bg-method-patch text-white',
  DELETE: 'bg-method-delete text-white',
};

export default function EndpointCard({ method, path, children }) {
  return (
    <div className={cn('my-3 rounded-lg border p-4', methodStyles[method])}>
      <div className="flex items-center gap-3 mb-2">
        <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold uppercase', methodBadge[method])}>
          {method}
        </span>
        <code className="text-sm font-mono font-medium text-foreground">{path}</code>
      </div>
      {children && <p className="text-sm text-muted-foreground">{children}</p>}
    </div>
  );
}
