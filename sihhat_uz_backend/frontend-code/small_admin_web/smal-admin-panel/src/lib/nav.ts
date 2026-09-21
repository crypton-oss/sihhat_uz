import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Building2,
  MessageSquare,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Sanatoriya", href: "/sanatorium", icon: Building2 },
  { title: "Foydalanuvchilar", href: "/users", icon: Users },
  { title: "Analitika", href: "/analytics", icon: BarChart3 },
  { title: "Xabarlar", href: "/messages", icon: MessageSquare },
  { title: "Sozlamalar", href: "/settings", icon: Settings },
];
