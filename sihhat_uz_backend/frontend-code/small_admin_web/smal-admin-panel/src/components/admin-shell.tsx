"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SIDEBAR_STORAGE_KEY, ROLE_KEY, NAME_KEY } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === "0") setOpen(false);
    if (stored === "1") setOpen(true);

    const userRole = window.localStorage.getItem(ROLE_KEY);
    setRole(userRole);
    setUserName(window.localStorage.getItem(NAME_KEY));

    // SMALL ADMIN XAVFSIZLIK TEKSHIRUVI
    if (userRole === 'small_admin') {
      const restrictedPages = ['/sanatorium', '/settings'];
      if (restrictedPages.some(page => pathname.startsWith(page))) {
        router.push('/dashboard');
      }
    }
  }, [pathname, router]);

  function toggle() {
    setOpen((current) => {
      const next = !current;
      window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  const title =
    NAV_ITEMS.find((item) => item.href === pathname)?.title ?? "Admin";

  return (
    <div className="flex h-svh overflow-hidden bg-background">
      <AdminSidebar open={open} onToggle={toggle} />
      <div className="flex min-w-0 flex-1 flex-col text-left">
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium tracking-tight text-slate-500 dark:text-slate-400">{title}</h1>
            {mounted && (
              <Badge
                variant="default"
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-sm transition-all",
                  theme === "dark"
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                )}
              >
                {role === 'director' ? 'Director Admin Panel' : 'Small Admin Panel'}
              </Badge>
            )}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end leading-none">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{userName || "Admin"}</span>
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                {role === 'director' ? 'Direktor' : 'Sanatoriya Admini'}
              </span>
            </div>
            <Avatar className="size-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <AvatarFallback className="bg-primary/5 text-primary font-bold text-[10px] uppercase">
                {userName ? userName.slice(0, 2).toUpperCase() : "AD"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
