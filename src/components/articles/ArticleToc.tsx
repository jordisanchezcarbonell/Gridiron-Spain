export function ArticleToc({ items, title }: { items: Array<{ id: string; text: string }>; title: string }) {
  if (items.length === 0) return null;
  return <nav className="card mb-10 p-5" aria-label={title}><p className="kicker mb-3">{title}</p><ol className="space-y-2 text-sm">{items.map((item) => <li key={item.id}><a className="text-paper-2 hover:text-gold" href={`#${item.id}`}>{item.text}</a></li>)}</ol></nav>;
}
