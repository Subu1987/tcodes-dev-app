import SearchHero from "@/components/home/SearchHero";
import ModuleHighlights from "@/components/home/ModuleHighlights";
import TopTcodesGrid from "@/components/home/TopTcodesGrid";

export default function HomePage() {
  return (
    <div className="space-y-10">
      
      {/* Hero Section */}
      <SearchHero />

      {/* Featured Modules (compact clean boxes) */}
      <ModuleHighlights />

      {/* Trending TCodes */}
      <TopTcodesGrid />

    </div>
  );
}
