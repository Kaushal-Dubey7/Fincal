export interface SIPInputValues {
  monthlyInvestment: number;
  annualReturn: number;
  years: number;
}

export interface SIPResult {
  futureValue: number;
  totalInvested: number;
  totalReturns: number;
  monthlyInvestment: number;
  years: number;
  annualReturn: number;
}

export interface SWPInputValues {
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  months: number;
}

export interface SWPResult {
  balanceAfterMonths: number;
  monthsUntilDepletion: number | "not_depleted";
  initialCorpus: number;
  monthlyWithdrawal: number;
  annualReturn: number;
  months: number;
}
