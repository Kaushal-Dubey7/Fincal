"use client";

import { SIPInputValues } from "@/types";

interface Props {
  inputs: SIPInputValues;
  onChange: (values: SIPInputValues) => void;
  errors: Partial<Record<keyof SIPInputValues, string>>;
}

const fieldConfig = [
  {
    key: "monthlyInvestment" as const,
    label: "Monthly investment (₹)",
    min: 500,
    max: 500000,
    step: 100,
    info: "Monthly installment into SIP scheme.",
  },
  {
    key: "annualReturn" as const,
    label: "Annual return (%)",
    min: 0,
    max: 30,
    step: 0.1,
    info: "Hypothetical annualized return, not guaranteed.",
  },
  {
    key: "years" as const,
    label: "Duration (years)",
    min: 1,
    max: 50,
    step: 1,
    info: "Investment horizon for SIP.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function InputPanel({ inputs, onChange, errors }: Props) {
  const updateField = (key: keyof SIPInputValues, raw: number) => {
    const field = fieldConfig.find((item) => item.key === key);
    if (!field) return;
    const value = clamp(raw, field.min, field.max);
    onChange({ ...inputs, [key]: value });
  };

  return (
    <section className="rounded-lg border border-[#d8d8d8] bg-white p-4" aria-labelledby="input-panel-heading">
      <h2 id="input-panel-heading" className="text-xl font-semibold text-[#224c87]">
        Inputs (adjust to explore) [live recalculation]
      </h2>
      <p className="text-sm mt-1 text-[#666]">Dual input mode: slider + number field for each parameter.</p>
      <div className="mt-4 space-y-4">
        {fieldConfig.map((field) => (
          <div key={field.key} className="grid gap-2">
            <label className="font-medium text-sm text-[#333]" htmlFor={field.key}>
              {field.label}
              <span className="ml-1 text-[#919090]" role="tooltip" aria-label={field.info}>ⓘ</span>
            </label>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="range"
                id={`${field.key}-slider`}
                value={inputs[field.key]}
                min={field.min}
                max={field.max}
                step={field.step}
                onChange={(e) => updateField(field.key, Number(e.target.value))}
                className="w-full md:w-2/3"
                aria-label={field.label}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  id={field.key}
                  value={inputs[field.key]}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  onChange={(e) => updateField(field.key, Number(e.target.value))}
                  className="w-28 border border-[#c0c0c0] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#224c87]"
                  aria-describedby={`${field.key}-error`}
                />
                <span className="text-xs text-[#666]">{field.key === "years" ? "yrs" : field.key === "annualReturn" ? "%" : "₹"}</span>
              </div>
            </div>
            {errors[field.key] && (
              <p id={`${field.key}-error`} className="text-xs text-[#da3832]" role="alert">
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
