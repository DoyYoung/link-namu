"use client";

import { useState } from "react";
import { usePersistentState } from "@/lib/usePersistentState";
import IncomeTab from "./IncomeTab";
import HousingTab from "./HousingTab";
import LoanTab from "./LoanTab";

// 금액은 모두 만원 단위
export interface AssetState {
  income: number;
  fixedCost: number;
  saving: number;
  cash: number;
  jeonse: number;
  jeonseLoanRatio: number;
  jeonseLoanRate: number;
  wolseDeposit: number;
  rent: number;
  oppRate: number;
  conversion: number;
  annualIncome: number;
  existingRepay: number;
  assetValue: number;
  existingDebt: number;
  dsrLimit: number;
  ltv: number;
  stress: number;
  loanRate: number;
  loanYears: number;
  wantLoan: number;
}

const DEFAULTS: AssetState = {
  income: 350,
  fixedCost: 100,
  saving: 100,
  cash: 5000,
  jeonse: 30000,
  jeonseLoanRatio: 70,
  jeonseLoanRate: 4,
  wolseDeposit: 3000,
  rent: 90,
  oppRate: 3,
  conversion: 5.5,
  annualIncome: 4800,
  existingRepay: 0,
  assetValue: 50000,
  existingDebt: 0,
  dsrLimit: 40,
  ltv: 70,
  stress: 1.5,
  loanRate: 4,
  loanYears: 30,
  wantLoan: 0,
};

const TABS = [
  { id: "income", label: "수입·저축" },
  { id: "housing", label: "전세·월세" },
  { id: "loan", label: "대출·상환" },
] as const;

export default function AssetApp() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("income");
  const [s, setS] = usePersistentState<AssetState>("asset-state", DEFAULTS);
  const set = (patch: Partial<AssetState>) => setS((prev) => ({ ...prev, ...patch }));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-4 pt-6 pb-28">
      <header className="flex items-center justify-between pr-12">
        <h1 className="text-xl font-bold">자산관리</h1>
        <button
          type="button"
          onClick={() => confirm("입력값을 초기화할까요?") && setS(DEFAULTS)}
          className="text-sm text-zinc-500 underline"
        >
          초기화
        </button>
      </header>
      {tab === "income" && <IncomeTab s={s} set={set} />}
      {tab === "housing" && <HousingTab s={s} set={set} />}
      {tab === "loan" && <LoanTab s={s} set={set} />}

      <nav className="fixed inset-x-0 bottom-0 border-t border-black/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-white/10 dark:bg-neutral-900/95">
        <div className="mx-auto flex max-w-lg">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTab(t.id);
                window.scrollTo({ top: 0 });
              }}
              className={`h-14 flex-1 text-sm font-medium ${
                tab === t.id ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
