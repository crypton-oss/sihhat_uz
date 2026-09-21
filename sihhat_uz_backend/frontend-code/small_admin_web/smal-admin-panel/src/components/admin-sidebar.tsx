"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AUTH_COOKIE, ROLE_KEY } from "@/lib/constants";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type AdminSidebarProps = {
  open: boolean;
  onToggle: () => void;
};

function NavButton({
  href,
  title,
  icon: Icon,
  active,
  collapsed,
}: {
  href: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  active: boolean;
  collapsed: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const className = cn(
    "inline-flex h-10 w-full items-center rounded-lg border border-transparent text-sm font-medium transition-all duration-300 relative group overflow-hidden",
    collapsed ? "justify-center px-0" : "gap-3 px-3",
    active
      ? (mounted && resolvedTheme === "dark"
          ? "bg-white text-black shadow-lg scale-[1.02]"
          : "bg-black text-white shadow-lg scale-[1.02]")
      : "text-sidebar-foreground hover:bg-slate-100 dark:hover:bg-white/5",
  );

  const content = (
    <>
      {active && mounted && (
        <div className={cn(
          "absolute inset-0 rounded-lg border-transparent pointer-events-none overflow-hidden",
          resolvedTheme === "dark" ? "animate-liquid-pulse" : "animate-liquid-pulse-light"
        )}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/20 to-transparent -skew-x-[25deg] animate-liquid-shimmer" />
        </div>
      )}

      <Icon className={cn("size-4 shrink-0 relative z-10", active && "animate-in zoom-in-95 duration-300")} />
      <span
        className={cn(
          "truncate relative z-10",
          collapsed ? "sr-only" : "opacity-100 font-bold",
        )}
      >
        {title}
      </span>
    </>
  );

  if (!collapsed) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        delay={150}
        closeOnClick
        render={<Link href={href} className={className} />}
      >
        {content}
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
}

export function AdminSidebar({ open, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const collapsed = !open;
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem(ROLE_KEY));
  }, []);

  function handleLogout() {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    localStorage.clear();
    router.push("/login");
    router.refresh();
  }

  // ROLGA QARAB MENYUNI FILTRLASH
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (role === 'small_admin') {
      // Small Admin ko'ra olmaydigan bo'limlar
      return !['Sanatoriya', 'Sozlamalar'].includes(item.title);
    }
    return true; // Director hamma narsani ko'radi
  });

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out",
        open ? "w-60" : "w-[72px]",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center px-3",
          collapsed ? "justify-center px-0" : "justify-end"
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="size-8 shrink-0 hover:bg-accent hover:text-accent-foreground"
          aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
        >
          {open ? (
            <PanelLeftClose className="size-4" />
          ) : (
            <PanelLeftOpen className="size-4" />
          )}
        </Button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-2 mt-2">
        {filteredNavItems.map((item) => (
          <NavButton
            key={item.href}
            href={item.href}
            title={item.title}
            icon={item.icon}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="p-2">
        <Separator className="mb-2" />
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger delay={150} render={logoutButton} />
            <TooltipContent side="right">Hisobdan chiqish</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            type="button"
            variant="ghost"
            onClick={handleLogout}
            className="h-10 w-full text-red-600 hover:bg-red-50 hover:text-red-700 justify-start gap-3 px-3 rounded-lg font-bold"
          >
            <LogOut className="size-4 shrink-0" />
            <span>Hisobdan chiqish</span>
          </Button>
        )}
      </div>
    </aside>
  );
}
