"use client";

import { useMemo, useState } from "react";
import { Montserrat } from "next/font/google";
import { calculateSWP } from "@/lib/calculations";
import { validateSWP } from "@/lib/validators";
import { SWPInputValues } from "@/types";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const defaultSwp: SWPInputValues = {
  initialCorpus: 2000000,
  monthlyWithdrawal: 50000,
  annualReturn: 6,
  months: 120,
};

export default function SWPCalculator() {
  const [inputs, setInputs] = useState(defaultSwp);
  const [showAssumptions, setShowAssumptions] = useState(true);

  const errors = useMemo(() => validateSWP(inputs), [inputs]);
  const isInvalid = Object.keys(errors).length > 0;
  const result = useMemo(() => calculateSWP(inputs), [inputs]);

  return (
    <main className={`${montserrat.className} bg-[#f5f7fa] min-h-screen p-4 sm:p-8`}>
      <article className="mx-auto max-w-6xl space-y-5">
        <header>
          <h1 className="text-3xl font-bold text-[#224c87]">SWP Calculator</h1>
          <p className="text-[#555] mt-1">Estimate corpus decay and balance based on monthly withdrawal and returns.</p>
        </header>

        <section className="rounded-lg border border-[#d8d8d8] bg-white p-4">
          <h2 className="text-xl font-semibold text-[#224c87]">Inputs</h2>
          <div className="grid gap-4 sm:grid-cols-2 mt-3">
            {[
              { name: "initialCorpus", label: "Initial corpus (₹)", min: 100000, max: 10000000, step: 10000 },
              { name: "monthlyWithdrawal", label: "Monthly withdrawal (₹)", min: 1000, max: 200000, step: 5000 },
              { name: "annualReturn", label: "Annual return (%)", min: 0, max: 30, step: 0.1 },
              { name: "months", label: "Duration (months)", min: 1, max: 600, step: 1 },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label htmlFor={field.name} className="text-sm font-medium text-[#333]">
                  {field.label} <span className="text-xs text-[#919090]">ⓘ</span>
                </label>
                <input
                  id={field.name}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={(inputs as any)[field.name]}
                  onChange={(e) => setInputs({ ...inputs, [field.name]: Number(e.target.value) })}
                  className="w-full"
                  aria-label={field.label}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={(inputs as any)[field.name]}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    onChange={(e) => setInputs({ ...inputs, [field.name]: Number(e.target.value) })}
                    className="border border-[#c0c0c0] rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-[#224c87]"
                  />
                  <span className="text-xs text-[#666]">{field.name === "annualReturn" ? "%" : ""}</span>
                </div>
                {errors[field.name as keyof SWPInputValues] && (
                  <p className="text-xs text-[#da3832]" role="alert">{errors[field.name as keyof SWPInputValues]}</p>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setInputs(defaultSwp)}
            className="mt-4 rounded-md border border-[#224c87] px-3 py-2 text-sm font-medium text-[#224c87] hover:bg-[#e6edfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224c87]"
          >
            Reset to defaults
          </button>
        </section>

        <section className="rounded-lg border border-[#d8d8d8] bg-white p-4" aria-live="polite">
          <h2 className="text-xl font-semibold text-[#224c87]">Results (indicative)</h2>
          {isInvalid ? (
            <p className="text-[#a10e0e]">Fix validation errors to display computed results.</p>
          ) : (
            <div className="mt-3 space-y-2 text-sm text-[#333]">
              <p>Balance after {result.months} months: ₹{result.balanceAfterMonths.toLocaleString()}</p>
              <p>
                Months until depletion: {result.monthsUntilDepletion === "not_depleted" ? "Not depleted under these assumptions" : `${result.monthsUntilDepletion} months`}
              </p>
              <p>
                Formula: FV = PV×(1+r)^n − W×(((1+r)^n−1)/r), where r = annual/12.
              </p>
            </div>
          )}
        </section>

        <section className="rounded-lg border border-[#d8d8d8] bg-white p-4">
          <h3 className="font-semibold text-[#224c87]">Disclaimer</h3>
          <p className="text-xs text-[#555] mt-1">
            This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns.
          </p>
        </section>
      </article>
    </main>
  );
}
