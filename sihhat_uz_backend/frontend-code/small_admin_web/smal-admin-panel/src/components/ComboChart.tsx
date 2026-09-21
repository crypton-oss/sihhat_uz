"use client"

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

interface ComboChartProps {
  data: any[]
  index: string
  barSeries: {
    categories: string[]
    colors?: string[]
  }
  lineSeries?: {
    categories: string[]
    colors?: string[]
  }
  className?: string
}

export function ComboChart({
  data,
  index,
  barSeries,
  className,
}: ComboChartProps) {
  return (
    <div className={cn("w-full h-80", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            bottom: 0,
            left: -40,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
          <XAxis
            dataKey={index}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={11}
            fontWeight={500}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-600"
          />
          <YAxis
            hide={true}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800 shadow-xl rounded-xl">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{label}</p>
                    <div className="space-y-1">
                        {payload.map((entry: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className="size-1.5 rounded-full"
                                        style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{entry.name}</span>
                                </div>
                                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{entry.value.toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-50 dark:border-slate-800">
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Mijozlar</span>
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">0</span>
                        </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey={barSeries.categories[0]}
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
            barSize={40}
            name="Tushumlar"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
