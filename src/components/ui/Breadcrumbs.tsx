import Link from "next/link";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items, label = "Breadcrumb" }: { items: Crumb[]; label?: string }) {
  return (
    <nav aria-label={label} className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-gold">
                  {item.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-muted" : ""}>
                  {item.name}
                </span>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
