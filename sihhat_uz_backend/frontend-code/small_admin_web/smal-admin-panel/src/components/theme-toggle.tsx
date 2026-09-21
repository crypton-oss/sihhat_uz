"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center gap-0.5 p-1 rounded-full bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 shadow-inner">
      <button
        onClick={() => setTheme("light")}
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-all duration-200",
          theme === "light"
            ? "bg-white shadow-md text-orange-500 scale-110"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        )}
        title="Ochiq mavzu"
      >
        <Sun className="size-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-all duration-200",
          theme === "dark"
            ? "bg-black shadow-md shadow-white/5 text-blue-400 scale-110 ring-1 ring-white/10"
            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        )}
        title="To'q mavzu"
      >
        <Moon className="size-4" />
      </button>
    </div>
  )
}
