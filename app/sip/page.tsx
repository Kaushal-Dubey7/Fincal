"use client";

import { useMemo, useState } from "react";
import { Montserrat } from "next/font/google";
import InputPanel from "@/components/Calculator/InputPanel";
import ResultsPanel from "@/components/Calculator/ResultsPanel";
import AssumptionsPanel from "@/components/Calculator/AssumptionsPanel";
import Disclaimer from "@/components/Calculator/Disclaimer";
import { calculateSIP } from "@/lib/calculations";
import { validateSIP } from "@/lib/validators";
import { SIPInputValues } from "@/types";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const defaultValues: SIPInputValues = {
  monthlyInvestment: 5000,
  annualReturn: 12,
  years: 10,
};

export default function SIPCalculator() {
  const [inputs, setInputs] = useState<SIPInputValues>(defaultValues);
  const [showAssumptions, setShowAssumptions] = useState(true);

  const errors = useMemo(() => validateSIP(inputs), [inputs]);

  const isInvalid = Object.keys(errors).length > 0;

  const result = useMemo(() => calculateSIP(inputs), [inputs]);

  const compareScenario = useMemo(() => {
    const alternate = calculateSIP({ ...inputs, monthlyInvestment: inputs.monthlyInvestment * 1.2 });
    return { alternate };
  }, [inputs]);

  return (
    <main className={`${montserrat.className} min-h-screen bg-[#f5f7fa] text-[#1b1b1b] p-4 sm:p-8`}>
      <article className="mx-auto max-w-6xl">
        <header className="mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#224c87]">SIP Calculator</h1>
          <p className="mt-2 text-base text-[#4f4f4f] max-w-3xl">
            Estimate your illustrative future value with monthly SIP contributions. Interactive and accessible for first-time and advanced planners.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4">
            <InputPanel inputs={inputs} onChange={setInputs} errors={errors} />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setInputs(defaultValues)}
                className="rounded-md border border-[#224c87] bg-white px-4 py-2 text-sm font-medium text-[#224c87] hover:bg-[#e6edfc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#224c87]"
              >
                Reset to defaults
              </button>
            </div>

            {isInvalid && (
              <div className="p-3 border border-[#da3832] bg-[#fff1f1] rounded" role="alert">
                <p className="text-sm text-[#a10e0e]">Please fix input errors to see reliable results.</p>
              </div>
            )}

            <AssumptionsPanel inputs={inputs} expanded={showAssumptions} onToggle={() => setShowAssumptions((v) => !v)} />

            <div className="mt-4 p-4 border border-[#e1e1e1] rounded bg-white">
              <h2 className="font-semibold text-[#224c87]">What-if comparison</h2>
              <p className="text-sm text-[#555] mt-1">Illustrative benchmark: 20% higher SIP, same return assumptions.</p>
              <ul className="mt-2 text-sm list-disc list-inside leading-relaxed">
                <li>Total Future Value: ₹{compareScenario.alternate.futureValue.toLocaleString()}</li>
                <li>Total Invested: ₹{compareScenario.alternate.totalInvested.toLocaleString()}</li>
                <li>Estimated Returns: ₹{compareScenario.alternate.totalReturns.toLocaleString()}</li>
              </ul>
            </div>

            <Disclaimer />
          </div>

          <div>
            <ResultsPanel result={result} />
          </div>
        </div>
      </article>
    </main>
  );
}
