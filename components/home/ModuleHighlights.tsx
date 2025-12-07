import modules from "@/data/modules.json";
import Link from "next/link";

export default function ModuleHighlights() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">SAP Modules</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {modules.slice(0, 10).map((m) => (
          <Link
            key={m.code}
            href={`/module/${m.code.toLowerCase()}`}
            className="p-4 bg-card border rounded-lg hover:shadow transition flex flex-col"
          >
            <div className="font-semibold text-sm">{m.code}</div>
            <div className="text-xs text-muted-foreground mt-1">{m.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
