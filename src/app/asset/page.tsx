import type { Metadata } from "next";
import AssetApp from "@/components/asset/AssetApp";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "자산관리",
  description: "수입·저축, 전세/월세 비교, 대출 상환 계산",
};

export default function AssetPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <ThemeToggle />
      <AssetApp />
    </div>
  );
}
