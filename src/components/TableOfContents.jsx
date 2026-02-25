import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('article h2[id], article h3[id]');
      const items = Array.from(elements).map((el) => ({
        id: el.id,
        text: el.textContent,
        level: el.tagName === 'H3' ? 3 : 2,
      }));
      setHeadings(items);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      {headings.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
          }}
          className={cn(
            'block text-[13px] py-1 transition-colors leading-snug',
            level === 3 ? 'pl-4' : 'pl-0',
            activeId === id
              ? 'text-primary font-medium'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
