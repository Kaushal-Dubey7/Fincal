"use client";

import { useEffect, useMemo, useState } from "react";
import { SIPResult } from "@/types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  result: SIPResult;
}

function useAnimatedNumber(value: number, duration = 700) {
  const [animated, setAnimated] = useState(value);

  useEffect(() => {
    let frame: number;
    const start = animated;
    const delta = value - start;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setAnimated(start + delta * progress);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [animated, duration, value]);

  return animated;
}

export default function ResultsPanel({ result }: Props) {
  const { futureValue, totalInvested, totalReturns, monthlyInvestment, years, annualReturn } = result;

  const animatedFuture = useAnimatedNumber(futureValue);
  const animatedInvested = useAnimatedNumber(totalInvested);
  const animatedReturns = useAnimatedNumber(totalReturns);

  const summary = `With an illustrative monthly SIP of ₹${monthlyInvestment.toLocaleString()}, at an indicative annual return of ${annualReturn}%, over ${years} years, you can expect a future value of ₹${futureValue.toLocaleString()}`;

  const pieData = useMemo(
    () => [
      { name: "Invested", value: totalInvested },
      { name: "Returns", value: Math.max(totalReturns, 0) },
    ],
    [totalInvested, totalReturns]
  );

  const barData = useMemo(
    () => [
      { name: "Invested", amount: totalInvested },
      { name: "Returns", amount: Math.max(totalReturns, 0) },
      { name: "Future Value", amount: futureValue },
    ],
    [totalInvested, totalReturns, futureValue]
  );

  return (
    <section className="mt-6 rounded-lg border border-[#d8d8d8] bg-white p-4">
      <h2 className="text-xl font-semibold text-[#224c87]">Results (illustrative)</h2>
      <p className="mt-2" aria-live="polite">
        {summary}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-sm" role="region" aria-label="Summary metrics">
        <article className="rounded-lg border border-[#e0e0e0] p-3 bg-[#fcfcfc]">
          <h3 className="text-xs uppercase tracking-wide text-[#919090]">Estimated Future Value</h3>
          <p className="text-xl font-bold text-[#224c87]">₹{animatedFuture.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </article>
        <article className="rounded-lg border border-[#e0e0e0] p-3 bg-[#fcfcfc]">
          <h3 className="text-xs uppercase tracking-wide text-[#919090]">Total Invested</h3>
          <p className="text-xl font-bold text-[#224c87]">₹{animatedInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </article>
        <article className="rounded-lg border border-[#e0e0e0] p-3 bg-[#fcfcfc]">
          <h3 className="text-xs uppercase tracking-wide text-[#919090]">Estimated Returns</h3>
          <p className="text-xl font-bold text-[#224c87]">₹{animatedReturns.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
        </article>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:mt-4">
        <div className="w-full md:w-1/2 h-72 border border-[#e0e0e0] rounded-lg p-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={35} outerRadius={80} paddingAngle={3}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#224c87" : "#da3832"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="sr-only" aria-live="polite">Invested versus returns breakdown.</p>
        </div>

        <div className="w-full md:w-1/2 h-72 border border-[#e0e0e0] rounded-lg p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  typeof value === "number"
                    ? `₹${value.toLocaleString()}`
                    : value == null
                    ? ""
                    : `${value}`
                }
              />
              <Bar dataKey="amount">
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={index === 2 ? "#224c87" : index === 0 ? "#919090" : "#da3832"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="sr-only" aria-live="polite">Bar chart for invested, returns and total values.</p>
        </div>
      </div>

      <details className="mt-4 border-t border-[#e2e2e2] pt-3">
        <summary className="font-medium cursor-pointer">Yearly milestone breakdown</summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#f8f8f8]">
                <th className="p-2 border">Year</th>
                <th className="p-2 border">Invested</th>
                <th className="p-2 border">Estimated Value</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: years }, (_, i) => {
                const y = i + 1;
                const approxValue = (futureValue / years) * y;
                return (
                  <tr key={y} className={i % 2 === 0 ? "bg-white" : "bg-[#fdfdfd]"}>
                    <td className="p-2 border">{y}</td>
                    <td className="p-2 border">₹{(monthlyInvestment * 12 * y).toLocaleString()}</td>
                    <td className="p-2 border">₹{approxValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
