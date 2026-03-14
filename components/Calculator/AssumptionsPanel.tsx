import { SIPInputValues } from "@/types";

interface Props {
  inputs: SIPInputValues;
  expanded: boolean;
  onToggle: () => void;
}

export default function AssumptionsPanel({ inputs, expanded, onToggle }: Props) {
  return (
    <section className="mt-4 p-4 border border-[#d8d8d8] rounded-lg bg-white" aria-labelledby="assumptions-heading">
      <div className="flex justify-between items-center">
        <h2 id="assumptions-heading" className="text-lg font-semibold text-[#224c87]">
          Assumptions
        </h2>
        <button
          type="button"
          className="text-sm px-3 py-1 border border-[#919090] rounded-md hover:bg-[#f0f0f0]"
          onClick={onToggle}
          aria-expanded={expanded}
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </div>
      {expanded && (
        <div className="mt-3 text-sm text-[#333] space-y-2">
          <p>
            Monthly investment, annual return, and duration can be adjusted above. Return is treated as a geometric compound return.
          </p>
          <p>
            Annual return assumption is illustrative and not a guaranteed return. Inflation is not directly included in SIP formula, so expected purchasing power remains an assumption.
          </p>
          <ul className="list-disc list-inside">
            <li>Monthly Investment: ₹{inputs.monthlyInvestment.toLocaleString()}</li>
            <li>Annual Return: {inputs.annualReturn}%</li>
            <li>Duration: {inputs.years} years</li>
          </ul>
        </div>
      )}
    </section>
  );
}
