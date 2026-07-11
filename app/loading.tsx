export default function Loading() {
  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto h-10 w-2/3 animate-pulse rounded bg-stone-200" />
        <div className="mx-auto mt-4 h-4 w-1/2 animate-pulse rounded bg-stone-200" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg border border-stone-200 bg-stone-100" />
          ))}
        </div>
      </div>
    </main>
  );
}
