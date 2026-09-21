import { Moon, Sun, Bell, User as UserIcon } from 'lucide-react'
import { Badge } from '@/components/Badge'

interface HeaderProps {
  title: string
  isDark: boolean
  onThemeToggle: () => void
  userName?: string
}

export function Header({ title, isDark, onThemeToggle, userName }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Chap tomon - Sarlavha */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium tracking-tight text-foreground">{title}</h1>
      </div>

      {/* O'ng tomon - Profil va Sozlamalar */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end leading-none mr-2 text-right">
            <span className="text-xs font-black text-foreground">{userName || "Super Admin"}</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Asosiy Staff</span>
        </div>

        <button
          onClick={onThemeToggle}
          className="size-10 flex items-center justify-center hover:bg-muted rounded-xl transition-all border border-border/50 shadow-sm"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={18} className="text-orange-500" /> : <Moon size={18} className="text-slate-500" />}
        </button>

        <button className="size-10 flex items-center justify-center hover:bg-muted rounded-xl transition-all border border-border/50 shadow-sm relative">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full ring-2 ring-card" />
        </button>

        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-inner">
            <UserIcon size={20} />
        </div>
      </div>
    </header>
  )
}
