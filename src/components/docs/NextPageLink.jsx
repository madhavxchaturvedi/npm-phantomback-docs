import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NextPageLink({ to, label, direction = 'next' }) {
  const isNext = direction === 'next';
  return (
    <div className={cn('mt-12 pt-6 border-t border-border', isNext ? 'text-right' : 'text-left')}>
      <p className="text-xs text-muted-foreground mb-1">{isNext ? 'Next' : 'Previous'}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {!isNext && <ArrowLeft size={14} />}
        {label}
        {isNext && <ArrowRight size={14} />}
      </Link>
    </div>
  );
}
