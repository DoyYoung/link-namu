"use client";

interface FieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  step?: number;
  hint?: string;
}

export default function Field({ label, value, onChange, unit = "만원", step = 1, hint }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 dark:border-white/10 dark:bg-neutral-800">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          onFocus={(e) => e.target.select()}
          className="h-12 min-w-0 flex-1 bg-transparent text-right text-lg outline-none"
        />
        <span className="shrink-0 text-sm text-zinc-500">{unit}</span>
      </div>
      {hint && <span className="text-xs text-zinc-500">{hint}</span>}
    </label>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm dark:bg-neutral-900">
      <h2 className="text-base font-bold">{title}</h2>
      {children}
    </section>
  );
}

export function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" | "warn" }) {
  const color =
    tone === "warn" ? "text-red-500" : tone === "good" ? "text-emerald-600 dark:text-emerald-400" : "";
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-sm text-zinc-500">{label}</span>
      <div className="text-right">
        <div className={`text-lg font-semibold ${color}`}>{value}</div>
        {sub && <div className="text-xs text-zinc-500">{sub}</div>}
      </div>
    </div>
  );
}

export function Bar({ percent, tone }: { percent: number; tone?: "good" | "warn" }) {
  const w = Math.min(100, Math.max(0, percent));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-neutral-700">
      <div
        className={`h-full rounded-full ${tone === "warn" ? "bg-red-500" : "bg-emerald-500"}`}
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
