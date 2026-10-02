export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="stat-block">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </div>
  );
}
