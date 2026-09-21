import { Section } from '@/App'
import {
  LayoutDashboard,
  Users,
  MessageCircleQuestion,
  Columns3Icon as Columns3Cog,
  UserRoundCog,
  Cog,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface SidebarProps {
  activeSection: Section
  onSectionChange: (section: Section) => void
  onLogout: () => void
}

const navItems: Array<{ id: Section; label: string; icon: React.ComponentType<{ size?: number }> }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Foydalanuvchilar', icon: Users },
  { id: 'support', label: 'Yordam/Shikoyatlar', icon: MessageCircleQuestion },
  { id: 'app-management', label: 'App Management', icon: Columns3Cog },
  { id: 'manager-management', label: 'Adminlar Boshqaruvi', icon: UserRoundCog },
  { id: 'settings', label: 'Tizim Sozlamalari', icon: Cog },
]

export function Sidebar({ activeSection, onSectionChange, onLogout }: SidebarProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col z-20 shadow-xl transition-colors duration-300">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 text-left">
          <div className="size-10 bg-black text-white rounded-2xl flex items-center justify-center font-bold shadow-lg">
            <ShieldCheck size={24} />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-lg leading-none tracking-tight text-slate-900 uppercase">Sihhat Staff</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Super Admin</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left group relative overflow-hidden',
              activeSection === item.id
                ? 'bg-black text-white shadow-lg scale-[1.02]'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            )}
          >
            {activeSection === item.id && mounted && (
              <div className={cn(
                "absolute inset-0 rounded-xl border-[1.5px] border-black/10 pointer-events-none overflow-hidden",
                "animate-liquid-pulse-light"
              )}>
                  <div className="absolute inset-0 -skew-x-[25deg] bg-gradient-to-r from-transparent via-black/10 to-transparent animate-liquid-shimmer" />
              </div>
            )}
            <div className={cn(
                "transition-transform duration-300 relative z-10",
                activeSection === item.id ? "scale-110" : "group-hover:scale-110"
            )}>
                <item.icon size={20} />
            </div>
            <span className="font-medium text-sm tracking-tight relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-bold text-sm"
        >
          <LogOut size={20} />
          <span>Tizimdan chiqish</span>
        </button>
      </div>
    </aside>
  )
}
