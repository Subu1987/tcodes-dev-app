"use client";

import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import data from "@/data/tcodes.json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const fuse = new Fuse(data, {
    keys: ["tcode", "title", "description", "module"],
    threshold: 0.3,
  });

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const result = fuse.search(query).slice(0, 6).map((r) => r.item);
    setSuggestions(result);
  }, [query]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  };

  return (
    <section className="p-10 bg-gradient-to-br from-[#0F2B5B] to-[#1F4D8C] text-white rounded-xl shadow-md border relative">
      {/* Title */}
      <h1 className="text-3xl font-semibold tracking-tight">
        Discover SAP TCodes Instantly
      </h1>

      <p className="text-white/80 text-sm mt-2 max-w-lg">
        Search through SAP modules, transactions, Fiori mappings, and S/4HANA
        equivalents. Faster than SAP Help Portal.
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mt-6 flex gap-0 relative max-w-lg"
      >
        <Input
          placeholder="Search TCode, module, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-r-none h-11 text-sm 
                     bg-white/90 text-black shadow-sm 
                     border border-white/40 
                     focus:border-white focus:ring-white"
        />

        <Button className="rounded-l-none h-11 px-5 bg-[#1A73E8] hover:bg-[#135DC0] text-white">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Suggestion Dropdown */}
      {suggestions.length > 0 && (
        <div
          className="absolute top-[100%] left-0 mt-2 w-full max-w-lg
                     bg-white text-black border border-gray-200 
                     rounded-lg shadow-xl p-2 z-50"
        >
          {suggestions.map((s) => (
            <Link
              key={s.tcode}
              href={`/tcode/${s.tcode.toLowerCase()}`}
              className="block p-3 hover:bg-gray-100 rounded-md transition"
            >
              <div className="font-medium text-sm">
                {s.tcode} — {s.title}
              </div>
              <div className="text-[11px] text-gray-500">{s.module}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
