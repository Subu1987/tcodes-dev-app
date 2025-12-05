import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t py-6 text-sm text-slate-600">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span>© {new Date().getFullYear()} SAP TCodes</span>

        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-indigo-600">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-indigo-600">
            Terms
          </Link>
          <Link href="/sitemap.xml" className="hover:text-indigo-600">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
