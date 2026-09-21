"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "group toast bg-emerald-950 text-emerald-50 border-emerald-900 shadow-2xl rounded-2xl p-4 gap-3",
          description: "text-emerald-300/80 text-[11px] font-medium",
        },
      }}
    />
  )
}
