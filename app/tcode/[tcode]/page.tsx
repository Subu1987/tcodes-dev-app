import tcodes from "@/data/tcodes.json";
import Link from "next/link";

export default async function TcodeDetailPage({
  params,
}: {
  params: Promise<{ tcode: string }>;
}) {
  const { tcode } = await params;
  const code = tcode.toUpperCase();

  // Find matching TCode
  const data = tcodes.find((t) => t.tcode === code);

  if (!data) {
    return (
      <div className="p-6 bg-red-50 border border-red-300 rounded-lg">
        <h1 className="text-2xl font-bold text-red-600">TCode Not Found</h1>
        <p className="mt-2">No TCode found named {code}</p>
        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          ← Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight">
        {data.tcode} — {data.title}
      </h1>

      {/* Process & Module Badges */}
      <div className="flex flex-wrap gap-3">
        <span className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 border border-blue-300">
          Module: {data.module}
        </span>

        {data.process && (
          <span className="px-3 py-1 text-sm rounded-md bg-indigo-100 text-indigo-700 border border-indigo-300">
            {data.process}
          </span>
        )}

        {data.frequency && (
          <span
            className={`px-3 py-1 text-sm rounded-md border ${
              data.frequency === "very high"
                ? "bg-green-100 text-green-700"
                : data.frequency === "high"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Usage: {data.frequency}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-700 text-lg">{data.description}</p>

      {/* Purpose */}
      {data.purpose && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Purpose</h2>
          <p className="text-slate-700">{data.purpose}</p>
        </div>
      )}

      {/* Usage Steps */}
      {data.usage_steps && data.usage_steps.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">How to Use</h2>

          <ul className="list-disc ml-6 text-slate-700 space-y-1">
            {data.usage_steps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Fiori App */}
      {data.fiori_app && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Fiori App</h2>
          <p className="font-mono bg-slate-100 inline-block px-2 py-1 rounded">
            {data.fiori_app}
          </p>
        </div>
      )}

      {/* S/4HANA Status */}
      {data.s4hana_replacement && (
        <div>
          <h2 className="text-xl font-semibold mb-2">S/4HANA Status</h2>
          <p className="text-slate-700">{data.s4hana_replacement}</p>
        </div>
      )}

      {/* Related TCodes */}
      {data.related_tcodes && data.related_tcodes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3">Related TCodes</h2>

          <div className="flex flex-wrap gap-3">
            {data.related_tcodes.map((r: string) => (
              <Link
                key={r}
                href={`/tcode/${r.toLowerCase()}`}
                className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition border text-sm"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="pt-6">
        <Link
          href="/search"
          className="text-indigo-600 hover:underline text-sm"
        >
          ← Back to Search
        </Link>
      </div>
    </div>
  );
}
