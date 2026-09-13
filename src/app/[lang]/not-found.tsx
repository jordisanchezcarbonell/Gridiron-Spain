import Link from "next/link";

/** Locale is not reliably available in not-found; keep it bilingual and short. */
export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <p className="kicker mb-4">404</p>
      <h1 className="display display-md">Página no encontrada</h1>
      <p className="mt-4 text-muted">Page not found. Puede que el enlace haya cambiado o que la página aún no exista.</p>
      <div className="mt-8 flex justify-center gap-4 font-display text-lg font-bold uppercase tracking-[0.08em]">
        <Link href="/es" className="text-gold hover:text-gold-2">
          Inicio
        </Link>
        <Link href="/en" className="text-gold hover:text-gold-2">
          Home
        </Link>
      </div>
    </div>
  );
}
