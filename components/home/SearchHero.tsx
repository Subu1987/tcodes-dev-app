"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import data from "@/data/tcodes.json";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchHero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Fuzzy search engine
  const fuse = new Fuse(data, {
    keys: ["tcode", "title", "description", "module"],
    threshold: 0.3,
  });

  // Live search as user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const f = fuse.search(query).slice(0, 5).map((r) => r.item);
    setSuggestions(f);
  }, [query]);

  // Search submit handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${query}`);
  };

  return (
    <section className="bg-white p-8 rounded-xl shadow-sm relative">
      <h1 className="text-3xl font-extrabold">Search any SAP TCode</h1>
      <p className="text-slate-600 mt-2">Example: VA01, ME21N, FB50, MIGO</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mt-6 flex gap-0 relative">
        <Input
          placeholder="Search TCode or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded-r-none"
        />
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Dropdown suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 bg-white border shadow-md rounded-lg w-full max-w-md p-2">
          {suggestions.map((s) => (
            <Link
              key={s.tcode}
              href={`/tcode/${s.tcode.toLowerCase()}`}
              className="block p-2 hover:bg-slate-100 rounded-md"
            >
              <div className="font-semibold">{s.tcode} — {s.title}</div>
              <div className="text-sm text-slate-600">{s.module}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
