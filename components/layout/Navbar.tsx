import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
        >
          TCodes.dev
        </Link>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/module" className="hover:text-primary transition">
            Modules
          </Link>
          <Link href="/search" className="hover:text-primary transition">
            Search
          </Link>
          <Link href="/contribute" className="hover:text-primary transition">
            Contribute
          </Link>
        </nav>
      </div>
    </header>
  );
}
