import tcodes from "@/data/tcodes.json";
import Link from "next/link";

export default function TopTcodesGrid() {
  const top = tcodes.slice(0, 12);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Popular TCodes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((tc) => (
          <Link
            key={tc.tcode}
            href={`/tcode/${tc.tcode.toLowerCase()}`}
            className="p-4 bg-card border rounded-lg hover:shadow transition flex flex-col"
          >
            <div className="font-semibold text-sm">{tc.tcode}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {tc.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
