"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function AttachmentGroup({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("flex flex-wrap gap-3", className)}>{children}</div>
}

export function Attachment({
  children,
  className,
  state = "idle",
  orientation = "horizontal"
}: {
  children: React.ReactNode,
  className?: string,
  state?: "idle" | "uploading",
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black transition-all",
      orientation === "vertical" ? "flex-col items-start w-40" : "w-full",
      state === "uploading" && "opacity-70 border-dashed border-primary",
      className
    )}>
      {children}
    </div>
  )
}

export function AttachmentMedia({
  children,
  variant = "icon"
}: {
  children: React.ReactNode,
  variant?: "icon" | "image"
}) {
  return (
    <div className={cn(
      "flex items-center justify-center shrink-0 rounded-lg overflow-hidden bg-slate-50 dark:bg-white/[0.03]",
      variant === "icon" ? "size-10 text-slate-400" : "w-full aspect-video"
    )}>
      {children}
    </div>
  )
}

export function AttachmentContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 min-w-0">{children}</div>
}

export function AttachmentTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{children}</p>
}

export function AttachmentDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-medium text-slate-500 dark:text-slate-500 truncate">{children}</p>
}

export function AttachmentActions({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>
}

export function AttachmentAction({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("size-7 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors", className)}
      {...props}
    >
      {React.cloneElement(children as React.ReactElement, { size: 14 })}
    </button>
  )
}
