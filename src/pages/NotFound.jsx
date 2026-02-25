import { Link } from 'react-router-dom';
import { Ghost, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <Ghost size={72} className="text-muted-foreground/30 mb-6" />
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        This page has vanished into the phantom zone.
      </p>
      <Link
        to="/docs/getting-started"
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110 transition-all"
      >
        <ArrowLeft size={16} />
        Back to Docs
      </Link>
    </div>
  );
}
