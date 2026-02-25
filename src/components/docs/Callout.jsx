import { Info, Lightbulb, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const variants = {
  tip: {
    icon: Lightbulb,
    border: 'border-success/30',
    bg: 'bg-success/5',
    iconColor: 'text-success',
    title: 'Tip',
  },
  info: {
    icon: Info,
    border: 'border-info/30',
    bg: 'bg-info/5',
    iconColor: 'text-info',
    title: 'Note',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-warning/30',
    bg: 'bg-warning/5',
    iconColor: 'text-warning',
    title: 'Warning',
  },
  danger: {
    icon: AlertCircle,
    border: 'border-destructive/30',
    bg: 'bg-destructive/5',
    iconColor: 'text-destructive',
    title: 'Danger',
  },
};

export default function Callout({ type = 'info', title, children }) {
  const v = variants[type] || variants.info;
  const Icon = v.icon;

  return (
    <div className={cn('my-4 flex gap-3 rounded-lg border-l-4 p-4', v.border, v.bg)}>
      <Icon size={18} className={cn('shrink-0 mt-0.5', v.iconColor)} />
      <div className="text-sm leading-relaxed">
        <p className={cn('font-semibold mb-1', v.iconColor)}>{title || v.title}</p>
        <div className="text-foreground/80">{children}</div>
      </div>
    </div>
  );
}
