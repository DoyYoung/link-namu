"use client";

import Field, { Bar, Card, Stat } from "./Field";
import { formatMoney, formatPercent } from "@/lib/finance";
import type { AssetState } from "./AssetApp";

type P = { s: AssetState; set: (patch: Partial<AssetState>) => void };

export default function IncomeTab({ s, set }: P) {
  const left = s.income - s.fixedCost - s.saving;
  const savingRate = s.income > 0 ? (s.saving / s.income) * 100 : 0;
  const fixedRate = s.income > 0 ? (s.fixedCost / s.income) * 100 : 0;
  const yearSaving = s.saving * 12;

  return (
    <>
      <Card title="월 수입 · 지출 · 저축">
        <Field label="월 수입 (세후)" value={s.income} onChange={(income) => set({ income })} />
        <Field label="월 고정지출 (주거비 제외)" value={s.fixedCost} onChange={(fixedCost) => set({ fixedCost })} />
        <Field label="월 저축 · 투자" value={s.saving} onChange={(saving) => set({ saving })} />
        <Field label="현재 보유 자산 (예금 등)" value={s.cash} onChange={(cash) => set({ cash })} />
      </Card>
      <Card title="결과">
        <Stat label="저축률" value={formatPercent(savingRate)} tone={savingRate >= 20 ? "good" : undefined} />
        <Bar percent={savingRate} />
        <Stat label="고정지출 비율" value={formatPercent(fixedRate)} />
        <Bar percent={fixedRate} tone={fixedRate > 50 ? "warn" : undefined} />
        <Stat
          label="주거비 쓸 수 있는 돈"
          value={formatMoney(left)}
          sub="수입 − 고정지출 − 저축"
          tone={left < 0 ? "warn" : undefined}
        />
        <Stat label="1년 저축액" value={formatMoney(yearSaving)} />
        <Stat label="5년 후 예상 자산" value={formatMoney(s.cash + yearSaving * 5)} sub="이자 미반영" />
      </Card>
    </>
  );
}
