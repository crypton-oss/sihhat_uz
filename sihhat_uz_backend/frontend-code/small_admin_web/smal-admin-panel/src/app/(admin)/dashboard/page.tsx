import { ChartBarInteractive } from "@/components/chart-bar-interactive";
import { RecentPayments } from "@/components/recent-payments";

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col gap-8 pb-10 px-0">
      <div className="px-6">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Dashboard</h2>
      </div>

      {/* Grafik bo'limi */}
      <section className="space-y-4">
        <ChartBarInteractive />
      </section>

      {/* So'nggi to'lovlar bo'limi */}
      <section className="space-y-4 px-6">
        <RecentPayments />
      </section>
    </div>
  );
}
