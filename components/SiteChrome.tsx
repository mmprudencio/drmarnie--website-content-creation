import Link from "next/link";

const NAV = [
  { href: "/book", label: "The Book" },
  { href: "/workbook", label: "Workbook" },
  { href: "/feedback", label: "Questions & Stories" },
  { href: "/next", label: "Next Book" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-sm font-bold tracking-tight text-emerald-900">
          Money Skills, Strong Minds<span className="align-super text-[0.6em]">™</span>
        </Link>
        <nav className="hidden gap-5 text-sm text-stone-600 sm:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-stone-500">
        <p className="font-semibold text-stone-700">
          Money Skills, Strong Minds<span className="align-super text-[0.6em]">™</span>
        </p>
        <p className="mt-1 max-w-xl">
          By Dr. Mary Ann &ldquo;Marnie&rdquo; Moya-Prudencio, MD. Neurodevelopmental Pediatrician
          and Child Financial Literacy Advocate.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
          <Link href="/admin" className="text-stone-400 hover:text-stone-600">
            Admin
          </Link>
        </div>
        <p className="mt-6 text-xs text-stone-400">
          © {new Date().getFullYear()} Dr. Mary Ann Moya-Prudencio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
