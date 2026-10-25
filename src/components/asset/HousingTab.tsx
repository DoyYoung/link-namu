"use client";

import Field, { Bar, Card, Stat } from "./Field";
import { conversionRate, formatMoney, formatPercent, jeonseToMonthly } from "@/lib/finance";
import type { AssetState } from "./AssetApp";

type P = { s: AssetState; set: (patch: Partial<AssetState>) => void };

export default function HousingTab({ s, set }: P) {
  // 전세: 대출 이자 + 자기자금 기회비용
  const jeonseLoan = Math.min(s.jeonse, (s.jeonse * s.jeonseLoanRatio) / 100);
  const jeonseOwn = s.jeonse - jeonseLoan;
  const jeonseCost = (jeonseLoan * s.jeonseLoanRate) / 1200 + (jeonseOwn * s.oppRate) / 1200;

  // 월세: 월세 + 보증금 기회비용
  const wolseCost = s.rent + (s.wolseDeposit * s.oppRate) / 1200;

  const rate = conversionRate(s.jeonse, s.wolseDeposit, s.rent);
  const fairRent = jeonseToMonthly(Math.max(0, s.jeonse - s.wolseDeposit), s.conversion);

  const jeonseRatio = s.income > 0 ? (jeonseCost / s.income) * 100 : 0;
  const wolseRatio = s.income > 0 ? (wolseCost / s.income) * 100 : 0;
  const cheaper = jeonseCost <= wolseCost ? "전세" : "월세";

  return (
    <>
      <Card title="전세">
        <Field label="전세 보증금" value={s.jeonse} onChange={(jeonse) => set({ jeonse })} />
        <Field label="전세대출 비율" unit="%" value={s.jeonseLoanRatio} onChange={(jeonseLoanRatio) => set({ jeonseLoanRatio })} />
        <Field label="전세대출 금리 (연)" unit="%" step={0.1} value={s.jeonseLoanRate} onChange={(jeonseLoanRate) => set({ jeonseLoanRate })} />
      </Card>
      <Card title="월세">
        <Field label="월세 보증금" value={s.wolseDeposit} onChange={(wolseDeposit) => set({ wolseDeposit })} />
        <Field label="월세" value={s.rent} onChange={(rent) => set({ rent })} />
      </Card>
      <Card title="기준값">
        <Field label="자기자금 기회비용 (예금금리, 연)" unit="%" step={0.1} value={s.oppRate} onChange={(oppRate) => set({ oppRate })} hint="묶인 보증금을 예금에 뒀다면 받았을 이자" />
        <Field label="법정 전월세 전환율 (연)" unit="%" step={0.1} value={s.conversion} onChange={(conversion) => set({ conversion })} hint="기준금리 + 가산율로 해마다 바뀌니 직접 확인해 입력하세요" />
      </Card>
      <Card title="비교 결과">
        <Stat label="전세 월 부담" value={formatMoney(jeonseCost)} sub={`대출 이자 + 자기자금 ${formatMoney(jeonseOwn)} 기회비용`} />
        <Bar percent={jeonseRatio * 2} tone={jeonseRatio > 30 ? "warn" : undefined} />
        <Stat label="수입 대비 전세 부담" value={formatPercent(jeonseRatio)} />
        <Stat label="월세 월 부담" value={formatMoney(wolseCost)} sub="월세 + 보증금 기회비용" />
        <Bar percent={wolseRatio * 2} tone={wolseRatio > 30 ? "warn" : undefined} />
        <Stat label="수입 대비 월세 부담" value={formatPercent(wolseRatio)} />
        <hr className="border-black/10 dark:border-white/10" />
        <Stat label="더 저렴한 쪽" value={cheaper} tone="good" sub={`월 ${formatMoney(Math.abs(jeonseCost - wolseCost))} 차이`} />
        <Stat label="입력한 월세의 전환율" value={formatPercent(rate, 2)} sub={`법정 ${formatPercent(s.conversion)} 기준 적정 월세 ${formatMoney(fairRent)}`} />
        <p className="text-xs text-zinc-500">수입 대비 주거비는 보통 30% 이하를 권장합니다.</p>
      </Card>
    </>
  );
}
