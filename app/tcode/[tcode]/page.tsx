import data from "@/data/tcodes.json";
import Link from "next/link";

export default async function TCodeDetailPage({
  params,
}: {
  params: Promise<{ tcode: string }>;
}) {
  // 🔥 Next.js 14 dynamic route signature
  const { tcode } = await params;

  const code = tcode.toUpperCase();
  const info = data.find((x) => x.tcode === code);

  if (!info) {
    return (
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg">
        <h1 className="text-2xl font-bold">TCode Not Found</h1>
        <p className="mt-2">
          The TCode <strong>{code}</strong> does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold">
        {info.tcode} — {info.title}
      </h1>

      <p className="mt-2 text-slate-700 text-lg">{info.description}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-600">Module</h3>
          <p className="text-lg font-medium">{info.module}</p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-600">S/4HANA Status</h3>
          <p className="text-lg font-medium">{info.s4hana_status}</p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-slate-600">Fiori App</h3>
          <p className="text-lg font-medium">{info.fiori_app}</p>
        </div>
      </div>

      {/* 🔥 FIX for server component → use <Link> instead of onClick */}
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-2 bg-indigo-600 text-white rounded-md"
      >
        ← Back
      </Link>
    </div>
  );
}
