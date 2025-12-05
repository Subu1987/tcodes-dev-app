import modules from "@/data/modules.json";
import Link from "next/link";

export default function ModuleListPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">SAP Modules</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <Link
            key={m.code}
            href={`/module/${m.code.toLowerCase()}`}
            className="p-5 bg-white border shadow-sm rounded-lg hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold">{m.name}</h2>
            <p className="text-slate-600 mt-2 text-sm">{m.description}</p>

            <div className="mt-3 text-xs inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              {m.process}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
