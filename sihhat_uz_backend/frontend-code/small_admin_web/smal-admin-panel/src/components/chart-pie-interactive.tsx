"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const desktopData = [
  { month: "iyul", desktop: 0, fill: "var(--color-iyul)" },
  { month: "avgust", desktop: 0, fill: "var(--color-avgust)" },
  { month: "sentabr", desktop: 1, fill: "var(--color-sentabr)" },
]

const chartConfig = {
  visitors: {
    label: "Mijozlar",
  },
  iyul: {
    label: "Iyul",
    color: "#3b82f6",
  },
  avgust: {
    label: "Avgust",
    color: "#2563eb",
  },
  sentabr: {
    label: "Sentabr",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const [activeMonth, setActiveMonth] = React.useState(desktopData[2].month)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => desktopData.map((item) => item.month), [])

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        )
      }

      return <Sector {...props} outerRadius={outerRadius} />
    },
    [activeIndex]
  )

  return (
    <Card data-chart={id} className="flex flex-col border-0 shadow-sm ring-1 ring-slate-200/60 dark:ring-white/10 h-full bg-white dark:bg-black">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0 bg-transparent">
        <div className="grid gap-1 text-left">
          <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">Mijozlar ulushi</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">Oylar kesimi</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-8 w-[110px] rounded-lg pl-2.5 font-medium border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 dark:bg-black"
            aria-label="Oyni tanlang"
          >
            <SelectValue placeholder="Oy" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl border-slate-200 dark:border-white/10 dark:bg-black">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]
              if (!config) return null
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex focus:bg-slate-100 dark:focus:bg-white/5"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-900 dark:text-slate-300">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-6 pt-4 bg-transparent">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[220px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="dark:bg-black dark:border-white/10" />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              shape={renderPieShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-blue-600 dark:fill-blue-400 text-3xl font-black"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-blue-400 dark:fill-blue-500 text-[10px] font-bold uppercase tracking-wider"
                        >
                          Mijozlar
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
