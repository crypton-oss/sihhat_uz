"use client";

import { useState, useMemo } from "react";
import { Drawer } from "vaul";
import useMeasure from "react-use-measure";
import { motion } from "motion/react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { X, Mail, Lock, Eye, EyeOff, ShieldCheck, Save, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddAdminDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: any) => void;
}

export const AddAdminDrawer = ({ isOpen, onOpenChange, onSave }: AddAdminDrawerProps) => {
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'small_admin' as 'director' | 'small_admin'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
    // Reset form
    setFormData({
      email: '',
      password: '',
      role: 'small_admin'
    });
  };

  const content = useMemo(() => {
    return (
      <div className="text-left">
        <div className="flex items-center justify-between w-full mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Yangi Admin Yaratish
            </h2>
            <p className="text-xs text-slate-500 mt-1">Tizimga kirish uchun ma'lumotlarni kiriting</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-100"
            onClick={() => onOpenChange(false)}
          >
            <X className="text-slate-600" size={18} strokeWidth={3} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email (Username)</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                required
                placeholder="admin@sanatoriya.uz"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-12 pl-10 rounded-2xl bg-slate-50 border-slate-200 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium text-slate-900"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Maxfiy Parol</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="h-12 pl-10 pr-10 rounded-2xl bg-slate-50 border-slate-200 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tizimdagi roli</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'director'})}
                className={cn(
                  "flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest",
                  formData.role === 'director' ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:bg-slate-50"
                )}
              >
                <ShieldCheck size={14} /> Direktor
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'small_admin'})}
                className={cn(
                  "flex items-center justify-center gap-2 h-12 rounded-xl border-2 transition-all font-bold text-[10px] uppercase tracking-widest",
                  formData.role === 'small_admin' ? "border-primary bg-primary/5 text-primary" : "border-slate-100 text-slate-400 hover:bg-slate-50"
                )}
              >
                <User size={14} /> Admin
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 mt-4 bg-black text-white hover:bg-slate-900">
            <Save size={16} className="mr-2" /> Saqlash
          </Button>
        </form>
      </div>
    );
  }, [formData, showPassword, onOpenChange]);

  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        <Drawer.Content
          asChild
          className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-[500px] overflow-hidden rounded-[36px] bg-white outline-none"
        >
          <motion.div animate={{ height: bounds.height }} transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}>
            <div className="p-8" ref={elementRef}>
              {content}
            </div>
          </motion.div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
