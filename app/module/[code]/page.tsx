import modules from "@/data/modules.json";
import tcodes from "@/data/tcodes.json";
import Link from "next/link";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const moduleCode = code.toUpperCase();

  const moduleInfo = modules.find((m) => m.code === moduleCode);

  if (!moduleInfo) {
    return (
      <div className="p-6 bg-red-50 border border-red-300 rounded-lg">
        <h1 className="text-2xl font-bold text-red-600">Module Not Found</h1>
        <p className="mt-2">No module found with code: {moduleCode}</p>
        <Link
          href="/module"
          className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          ← Back to Modules
        </Link>
      </div>
    );
  }

  const moduleTCodes = tcodes.filter((t) => t.module === moduleCode);

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold">{moduleInfo.name}</h1>
      <p className="mt-2 text-lg text-slate-700">{moduleInfo.description}</p>

      <div className="mt-4 inline-block bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-full border border-indigo-300">
        {moduleInfo.process}
      </div>

      <h2 className="text-2xl font-semibold mt-10">Top TCodes</h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {moduleTCodes.slice(0, 9).map((tc) => (
          <Link
            key={tc.tcode}
            href={`/tcode/${tc.tcode.toLowerCase()}`}
            className="block p-5 border rounded-lg shadow-sm hover:shadow-md transition bg-slate-50"
          >
            <h3 className="text-xl font-semibold">
              {tc.tcode} — {tc.title}
            </h3>
            <p className="text-slate-600 text-sm mt-1">{tc.description}</p>
          </Link>
        ))}
      </div>

      {moduleTCodes.length > 9 && (
        <Link
          href={`/search?q=${moduleCode}`}
          className="inline-block mt-8 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          View All TCodes →
        </Link>
      )}
    </div>
  );
}
