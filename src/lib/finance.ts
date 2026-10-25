// 금액 단위는 모두 "만원", 금리는 연 %.

export type RepayMethod = "equal-payment" | "equal-principal" | "bullet";

export const REPAY_METHODS: { value: RepayMethod; label: string }[] = [
  { value: "equal-payment", label: "원리금균등" },
  { value: "equal-principal", label: "원금균등" },
  { value: "bullet", label: "만기일시" },
];

export interface RepayResult {
  firstMonthly: number;
  lastMonthly: number;
  totalInterest: number;
  totalPaid: number;
}

export function calcRepayment(
  principal: number,
  annualRate: number,
  years: number,
  method: RepayMethod,
): RepayResult {
  const n = Math.round(years * 12);
  const r = annualRate / 1200;
  if (principal <= 0 || n <= 0) {
    return { firstMonthly: 0, lastMonthly: 0, totalInterest: 0, totalPaid: 0 };
  }

  let firstMonthly: number;
  let lastMonthly: number;
  let totalInterest: number;

  if (method === "equal-payment") {
    firstMonthly = lastMonthly = equalPayment(principal, r, n);
    totalInterest = firstMonthly * n - principal;
  } else if (method === "equal-principal") {
    const p = principal / n;
    firstMonthly = p + principal * r;
    lastMonthly = p + p * r;
    totalInterest = (principal * r * (n + 1)) / 2;
  } else {
    firstMonthly = lastMonthly = principal * r;
    totalInterest = principal * r * n;
  }

  return {
    firstMonthly,
    lastMonthly: method === "bullet" ? lastMonthly + principal : lastMonthly,
    totalInterest,
    totalPaid: principal + totalInterest,
  };
}

function equalPayment(principal: number, r: number, n: number) {
  return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** DSR 한도 안에서 가능한 최대 대출금 (원리금균등, 스트레스 금리 가산 반영). */
export function maxLoanByDsr(opts: {
  annualIncome: number;
  dsrLimit: number; // %
  existingAnnualRepay: number;
  annualRate: number;
  years: number;
}): number {
  const allowedAnnual = Math.max(
    0,
    (opts.annualIncome * opts.dsrLimit) / 100 - opts.existingAnnualRepay,
  );
  const n = Math.round(opts.years * 12);
  const r = opts.annualRate / 1200;
  if (n <= 0) return 0;
  const monthly = allowedAnnual / 12;
  return r === 0 ? monthly * n : (monthly * (1 - Math.pow(1 + r, -n))) / r;
}

/** LTV 한도 안에서 가능한 최대 대출금. */
export function maxLoanByLtv(assetValue: number, ltv: number, existingDebt: number) {
  return Math.max(0, (assetValue * ltv) / 100 - existingDebt);
}

/** 전월세 전환율(%) = 월세×12 / (전세보증금 − 월세보증금) */
export function conversionRate(jeonse: number, wolseDeposit: number, monthlyRent: number) {
  const gap = jeonse - wolseDeposit;
  return gap > 0 ? ((monthlyRent * 12) / gap) * 100 : 0;
}

/** 월세 보증금 차액을 월세로 환산 */
export function jeonseToMonthly(gap: number, rate: number) {
  return (gap * rate) / 1200;
}

/** 만원 → "1억 2,000만원" */
export function formatMoney(value: number): string {
  const v = Math.round(value);
  const sign = v < 0 ? "-" : "";
  const abs = Math.abs(v);
  const eok = Math.floor(abs / 10000);
  const man = abs % 10000;
  if (eok === 0) return `${sign}${man.toLocaleString("ko-KR")}만원`;
  if (man === 0) return `${sign}${eok.toLocaleString("ko-KR")}억원`;
  return `${sign}${eok.toLocaleString("ko-KR")}억 ${man.toLocaleString("ko-KR")}만원`;
}

export function formatPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}
