"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const generateChartData = () => {
  const data = []
  const today = new Date()
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    data.push({
      date: date.toISOString().split("T")[0],
      desktop: 0,
      mobile: 0,
    })
  }
  return data
}

const chartData = generateChartData()

const chartConfig = {
  views: {
    label: "Ko'rishlar soni",
  },
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("mobile")

  const total = React.useMemo(
    () => ({
      desktop: 0,
      mobile: 0,
    }),
    []
  )

  return (
    <Card className="ring-0 border-0 shadow-none bg-transparent overflow-visible rounded-none">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b border-border/40 p-0 sm:flex-row px-6 pb-4">
        <div className="flex flex-1 flex-col justify-center gap-1 py-5 sm:py-6">
          <CardTitle className="text-xl font-bold dark:text-slate-100">Sanatoriya statistikasi</CardTitle>
          <CardDescription className="dark:text-slate-400">
            So'nggi 3 oy ichidagi umumiy tashrif buyuruvchilar soni
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l border-border/40 data-[active=true]:bg-muted/30 dark:data-[active=true]:bg-slate-800/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground font-medium dark:text-slate-500">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl dark:text-slate-100">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={40}
              fontSize={11}
              fontWeight={500}
              stroke="currentColor"
              className="text-slate-400 dark:text-slate-600"
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("uz-UZ", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[180px] rounded-xl border-border/50 shadow-2xl dark:bg-slate-900"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("uz-UZ", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar
                dataKey={activeChart}
                fill={chartConfig[activeChart].color}
                radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
