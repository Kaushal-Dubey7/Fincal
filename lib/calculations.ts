import { SIPInputValues, SIPResult, SWPInputValues, SWPResult } from "@/types";

export function calculateSIP(inputs: SIPInputValues): SIPResult {
  const { monthlyInvestment: P, annualReturn, years } = inputs;
  const r = annualReturn / 100 / 12;
  const n = Math.round(years * 12);

  let futureValue = 0;
  if (r === 0) {
    futureValue = P * n;
  } else {
    futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  const totalInvested = P * n;
  const totalReturns = futureValue - totalInvested;

  return {
    futureValue: Number(futureValue.toFixed(2)),
    totalInvested: Number(totalInvested.toFixed(2)),
    totalReturns: Number(totalReturns.toFixed(2)),
    monthlyInvestment: P,
    years,
    annualReturn,
  };
}

export function calculateSWP(inputs: SWPInputValues): SWPResult {
  const { initialCorpus: PV, monthlyWithdrawal: W, annualReturn, months } = inputs;
  const r = annualReturn / 100 / 12;
  const n = Math.round(months);

  let balanceAfterMonths: number;
  if (r === 0) {
    balanceAfterMonths = PV - W * n;
  } else {
    balanceAfterMonths = PV * Math.pow(1 + r, n) - W * ((Math.pow(1 + r, n) - 1) / r);
  }

  if (balanceAfterMonths < 0) {
    balanceAfterMonths = 0;
  }

  let monthsUntilDepletion: number | "not_depleted";
  if (W <= 0) {
    monthsUntilDepletion = "not_depleted";
  } else if (r === 0) {
    monthsUntilDepletion = PV / W;
  } else {
    const monthlyCost = PV * r;
    if (W <= monthlyCost) {
      monthsUntilDepletion = "not_depleted";
    } else {
      const factor = 1 / (1 - (PV * r) / W);
      const nDeplete = Math.log(factor) / Math.log(1 + r);
      monthsUntilDepletion = Math.max(0, Math.floor(nDeplete));
    }
  }

  return {
    balanceAfterMonths: Number(balanceAfterMonths.toFixed(2)),
    monthsUntilDepletion,
    initialCorpus: PV,
    monthlyWithdrawal: W,
    annualReturn,
    months: n,
  };
}

