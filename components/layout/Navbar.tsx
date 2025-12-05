import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          TCodes.dev
        </Link>

        <nav className="flex items-center gap-6 text-sm text-slate-700">
          <Link href="/module" className="hover:text-indigo-600">
            Modules
          </Link>
          <Link href="/search" className="hover:text-indigo-600">
            Search
          </Link>
          <Link href="/contribute" className="hover:text-indigo-600">
            Contribute
          </Link>
        </nav>
      </div>
    </header>
  );
}
