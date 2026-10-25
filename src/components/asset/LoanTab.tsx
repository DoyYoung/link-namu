"use client";

import Field, { Card, Stat } from "./Field";
import {
  REPAY_METHODS,
  calcRepayment,
  formatMoney,
  formatPercent,
  maxLoanByDsr,
  maxLoanByLtv,
} from "@/lib/finance";
import type { AssetState } from "./AssetApp";

type P = { s: AssetState; set: (patch: Partial<AssetState>) => void };

export default function LoanTab({ s, set }: P) {
  const byDsr = maxLoanByDsr({
    annualIncome: s.annualIncome,
    dsrLimit: s.dsrLimit,
    existingAnnualRepay: s.existingRepay,
    annualRate: s.loanRate + s.stress,
    years: s.loanYears,
  });
  const byLtv = maxLoanByLtv(s.assetValue, s.ltv, s.existingDebt);
  const possible = Math.min(byDsr, byLtv);
  const limiting = byDsr <= byLtv ? "DSR" : "LTV";

  const principal = s.wantLoan > 0 ? s.wantLoan : possible;
  const results = REPAY_METHODS.map((m) => ({
    ...m,
    r: calcRepayment(principal, s.loanRate, s.loanYears, m.value),
  }));
  const overLimit = s.wantLoan > possible;

  return (
    <>
      <Card title="대출 가능액 추정">
        <Field label="연 소득 (세전)" value={s.annualIncome} onChange={(annualIncome) => set({ annualIncome })} />
        <Field label="기존 대출 연간 원리금 상환액" value={s.existingRepay} onChange={(existingRepay) => set({ existingRepay })} />
        <Field label="담보 자산 가치 (집값 등)" value={s.assetValue} onChange={(assetValue) => set({ assetValue })} />
        <Field label="기존 대출 · 선순위 채권" value={s.existingDebt} onChange={(existingDebt) => set({ existingDebt })} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="DSR 한도" unit="%" value={s.dsrLimit} onChange={(dsrLimit) => set({ dsrLimit })} />
          <Field label="LTV 한도" unit="%" value={s.ltv} onChange={(ltv) => set({ ltv })} />
        </div>
        <Field label="스트레스 금리 가산" unit="%p" step={0.1} value={s.stress} onChange={(stress) => set({ stress })} hint="DSR 계산 시 금리에 더해 보수적으로 계산" />
      </Card>
      <Card title="상환 조건">
        <Field label="대출 금리 (연)" unit="%" step={0.1} value={s.loanRate} onChange={(loanRate) => set({ loanRate })} />
        <Field label="대출 기간" unit="년" value={s.loanYears} onChange={(loanYears) => set({ loanYears })} />
        <Field label="받고 싶은 대출금 (0이면 최대 가능액)" value={s.wantLoan} onChange={(wantLoan) => set({ wantLoan })} />
      </Card>
      <Card title="추정 한도">
        <Stat label="DSR 기준" value={formatMoney(byDsr)} />
        <Stat label="LTV 기준" value={formatMoney(byLtv)} />
        <Stat label="가능 대출액 (둘 중 작은 값)" value={formatMoney(possible)} sub={`${limiting} 기준으로 제한`} tone="good" />
        {overLimit && <p className="text-sm text-red-500">원하는 금액이 추정 한도를 넘습니다.</p>}
      </Card>
      <Card title={`상환액 비교 · ${formatMoney(principal)}`}>
        {results.map(({ value, label, r }) => (
          <div key={value} className="flex flex-col gap-1 rounded-xl bg-zinc-50 p-3 dark:bg-neutral-800">
            <div className="font-semibold">{label}</div>
            <Stat
              label="월 상환액"
              value={
                value === "equal-payment"
                  ? formatMoney(r.firstMonthly)
                  : `${formatMoney(r.firstMonthly)} → ${formatMoney(r.lastMonthly)}`
              }
              sub={value === "bullet" ? "마지막 달 원금 포함" : undefined}
            />
            <Stat label="총 이자" value={formatMoney(r.totalInterest)} />
            <Stat label="총 상환액" value={formatMoney(r.totalPaid)} />
          </div>
        ))}
        <p className="text-xs text-zinc-500">
          월 상환액이 월 수입의 {formatPercent(s.income > 0 ? (results[0].r.firstMonthly / s.income) * 100 : 0)}
          (원리금균등 기준). 규제 한도와 금리는 수시로 바뀌며, 실제 한도는 금융기관 심사로 정해집니다.
        </p>
      </Card>
    </>
  );
}
