type Props = {
  title: string;
  text: string;
  pendingLabel?: string;
  pending?: string[];
};

/** Honest "still researching" block used wherever content is not yet verified. */
export function Placeholder({ title, text, pendingLabel, pending }: Props) {
  return (
    <aside
      className="card my-8 border-dashed border-line-strong bg-ink-2 p-6"
      role="note"
    >
      <p className="kicker mb-2 text-muted">{title}</p>
      <p className="text-base text-paper-2">{text}</p>
      {pending && pending.length > 0 && (
        <div className="mt-4">
          {pendingLabel && <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-2">{pendingLabel}</p>}
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
            {pending.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
