"use client";

import { useState } from "react";
import data from "@/data/tcodes.json";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { moduleColors } from "@/lib/moduleColors";

export default function TCodeList() {
  const [visibleCount, setVisibleCount] = useState(9);

  const loadMore = () => setVisibleCount((prev) => prev + 9);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Top SAP TCodes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.slice(0, visibleCount).map((tc) => (
          <motion.div
            key={tc.tcode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer relative"
            onClick={() =>
              (window.location.href = `/tcode/${tc.tcode.toLowerCase()}`)
            }
          >
            <Card className="p-5 shadow-sm hover:shadow-md transition shadow-slate-200">
              {/* MODULE BADGE */}
              <span
                className={`text-xs px-2 py-1 rounded border ${moduleColors[tc.module] || moduleColors["OTHER"]}
                    absolute right-3 top-3`}
              >
                {tc.module}
              </span>

              {/* TCODE TITLE */}
              <h3 className="text-xl font-semibold text-slate-800">
                {tc.tcode} — {tc.title}
              </h3>

              {/* SHORT DESCRIPTION */}
              <p className="text-slate-600 text-sm mt-2">
                {tc.description}
              </p>

              {/* HOVER PREVIEW */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute hidden group-hover:block top-full left-0 mt-2 bg-white shadow-xl p-4 rounded-lg w-72 z-50 border border-slate-100"
              >
                <h4 className="text-lg font-semibold">{tc.tcode}</h4>
                <p className="text-sm mt-1">{tc.description}</p>

                <div className="mt-2 text-xs text-slate-500">
                  <p>Fiori App: {tc.fiori_app}</p>
                  <p>S/4 Status: {tc.s4hana_status}</p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < data.length && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
