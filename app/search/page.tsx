"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import data from "@/data/tcodes.json";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<any[]>([]);

  // Fuse.js configuration
  const fuse = new Fuse(data, {
    keys: [
      "tcode",
      "title",
      "description",
      "module"
    ],
    threshold: 0.3,        // lower = stricter matching
    distance: 50,          // typo tolerance
    includeScore: true,    // include score for ranking
  });

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fuseResults = fuse.search(query);

    // Convert Fuse.js results into your TCode objects
    const mapped = fuseResults
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .map((r) => r.item);

    setResults(mapped);
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search TCodes</h1>

      {/* Search Box */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search TCode, name, module..."
        className="w-full p-3 border rounded-lg mb-6"
      />

      {/* No Results */}
      {query && results.length === 0 && (
        <p className="text-slate-500 text-lg">No results found.</p>
      )}

      {/* Search Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((tc) => (
          <Link
            key={tc.tcode}
            href={`/tcode/${tc.tcode.toLowerCase()}`}
            className="p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-bold">{tc.tcode} — {tc.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{tc.description}</p>
            <span className="inline-block mt-3 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
              {tc.module}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
