"use client"

import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { cn } from "@/lib/utils"

interface AreaChartProps {
  data: any[]
  index: string
  categories: string[]
  valueFormatter?: (value: number) => string
  yAxisTickFormatter?: (value: number) => string
  className?: string
  xAxisLabel?: string
  yAxisLabel?: string
  onValueChange?: (v: any) => void
  fill?: "solid" | "gradient"
}

export function AreaChart({
  data,
  index,
  categories,
  valueFormatter,
  yAxisTickFormatter,
  className,
  fill = "gradient",
}: AreaChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            left: -10,
            right: 10,
            top: 10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            fontSize={11}
            fontWeight={500}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-600"
            tickFormatter={yAxisTickFormatter || valueFormatter}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white dark:bg-slate-900 p-3 border border-slate-100 dark:border-slate-800 shadow-xl rounded-xl">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {valueFormatter ? valueFormatter(payload[0].value as number) : payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey={categories[0]}
            stroke="#3b82f6"
            strokeWidth={3}
            fill={fill === "gradient" ? "url(#colorValue)" : "#3b82f6"}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
