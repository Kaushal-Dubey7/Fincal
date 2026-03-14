import { SIPInputValues, SWPInputValues } from "@/types";

export function validateSIP(inputs: SIPInputValues) {
  const errors: Partial<Record<keyof SIPInputValues, string>> = {};

  if (inputs.monthlyInvestment <= 0) {
    errors.monthlyInvestment = "Monthly investment must be greater than 0.";
  }
  if (inputs.annualReturn < 0 || inputs.annualReturn > 30) {
    errors.annualReturn = "Annual return rate should be between 0 and 30%.";
  }
  if (inputs.years <= 0 || inputs.years > 50) {
    errors.years = "Duration should be between 1 and 50 years.";
  }

  return errors;
}

export function validateSWP(inputs: SWPInputValues) {
  const errors: Partial<Record<keyof SWPInputValues, string>> = {};

  if (inputs.initialCorpus <= 0) {
    errors.initialCorpus = "Initial corpus must be greater than 0.";
  }
  if (inputs.monthlyWithdrawal <= 0) {
    errors.monthlyWithdrawal = "Monthly withdrawal must be greater than 0.";
  }
  if (inputs.annualReturn < 0 || inputs.annualReturn > 30) {
    errors.annualReturn = "Annual return rate should be between 0 and 30%.";
  }
  if (inputs.months <= 0 || inputs.months > 600) {
    errors.months = "Duration should be between 1 and 600 months.";
  }

  return errors;
}
