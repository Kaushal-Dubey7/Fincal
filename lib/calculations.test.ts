import { calculateSIP, calculateSWP } from "./calculations";

describe("calculateSIP", () => {
  it("calculates correct FV for 12% annual return over 10 years", () => {
    const result = calculateSIP({ monthlyInvestment: 10000, annualReturn: 12, years: 10 });
    expect(result.totalInvested).toBe(10000 * 120);
    expect(result.futureValue).toBeCloseTo(10000 * ((Math.pow(1 + 0.12 / 12, 120) - 1) / (0.12 / 12)) * (1 + 0.12 / 12), 2);
    expect(result.totalReturns).toBeCloseTo(result.futureValue - result.totalInvested, 2);
  });

  it("handles zero return rate without division by zero", () => {
    const result = calculateSIP({ monthlyInvestment: 5000, annualReturn: 0, years: 5 });
    expect(result.totalInvested).toBe(5000 * 60);
    expect(result.futureValue).toBe(5000 * 60);
    expect(result.totalReturns).toBe(0);
  });
});

describe("calculateSWP", () => {
  it("calculates balance after months for non-zero return", () => {
    const result = calculateSWP({ initialCorpus: 1000000, monthlyWithdrawal: 20000, annualReturn: 6, months: 120 });
    expect(result.balanceAfterMonths).toBeGreaterThanOrEqual(0);
    expect(result.monthsUntilDepletion).toBeGreaterThan(0);
  });

  it("marks not_depleted when withdrawal is less than income from returns", () => {
    const result = calculateSWP({ initialCorpus: 1000000, monthlyWithdrawal: 1000, annualReturn: 12, months: 120 });
    expect(result.monthsUntilDepletion).toBe("not_depleted");
  });
});
