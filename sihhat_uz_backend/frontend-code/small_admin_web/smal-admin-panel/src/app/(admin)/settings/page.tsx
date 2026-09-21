"use client"

import { useState, useEffect } from "react";
import {
  Building2,
  Bell,
  ShieldCheck,
  Save,
  MapPin,
  Phone,
  DollarSign,
  Pencil
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Narx uchun alohida state
  const [priceData, setPriceData] = useState({ value: "900,000", isSaved: true });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const btnClass = cn(
    "h-11 rounded-2xl gap-2 font-black text-[11px] uppercase tracking-widest transition-all shadow-md active:scale-95",
    theme === "dark"
      ? "bg-white text-black hover:bg-white/90"
      : "bg-black text-white hover:bg-black/90"
  );

  const iconContainerClass = cn(
    "size-10 rounded-xl flex items-center justify-center shadow-lg",
    theme === "dark" ? "bg-white text-black" : "bg-black text-white"
  );

  return (
    <div className="flex w-full flex-col gap-0 pb-10 px-0 max-w-4xl mx-auto">
      {/* Sarlavha */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 mb-10">
        <div className="text-left">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Sozlamalar</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Sanatoriya boshqaruvi va tizim parametrlarini sozlash
          </p>
        </div>
        <Button className={btnClass}>
          <Save size={16} strokeWidth={3} />
          Barchasini saqlash
        </Button>
      </div>

      <div className="flex flex-col gap-6 px-6">

        {/* 1. Sanatoriya Profili */}
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-slate-50 dark:border-white/5">
            <div className={iconContainerClass}>
              <Building2 size={20} />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg font-bold dark:text-slate-100 uppercase tracking-tight">Sanatoriya ma'lumotlari</CardTitle>
              <CardDescription className="dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Asosiy profil</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sanatoriya nomi</Label>
                <Input defaultValue="Oq-Tosh Sanatoriyasi" className="h-12 rounded-xl dark:bg-black dark:border-white/10" />
              </div>
              <div className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Markaziy telefon</Label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input defaultValue="+998 71 234 56 78" className="h-12 pl-10 rounded-xl dark:bg-black dark:border-white/10" />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Manzil</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                    <Input defaultValue="Toshkent viloyati, Bo'stonliq tumani" className="h-12 pl-10 rounded-xl dark:bg-black dark:border-white/10" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Narxlar */}
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-slate-50 dark:border-white/5">
            <div className={iconContainerClass}>
              <DollarSign size={20} />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg font-bold dark:text-slate-100 uppercase tracking-tight">Narxlar</CardTitle>
              <CardDescription className="dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Xizmat to'lovlari</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2 text-left">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">1 Kunlik to'lov (Odam boshiga)</Label>
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                    <Input
                        value={priceData.value}
                        onChange={(e) => setPriceData({ value: e.target.value, isSaved: false })}
                        disabled={priceData.isSaved}
                        className={cn(
                            "h-14 pr-12 font-black text-xl rounded-2xl transition-all",
                            priceData.isSaved ? "bg-slate-50 dark:bg-white/[0.01] border-transparent opacity-70" : "dark:bg-black dark:border-white/10"
                        )}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">UZS</span>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setPriceData(prev => ({ ...prev, isSaved: false }))}
                        variant="outline"
                        disabled={!priceData.isSaved}
                        className="h-14 rounded-2xl px-4 gap-1.5 font-black text-[10px] uppercase tracking-widest border-slate-200 dark:border-white/10 dark:text-slate-100"
                    >
                        <Pencil size={14} strokeWidth={3} /> Tahrirlash
                    </Button>
                    <Button
                        onClick={() => setPriceData(prev => ({ ...prev, isSaved: true }))}
                        disabled={priceData.isSaved}
                        className={cn("h-14 rounded-2xl px-6 gap-1.5 font-black text-[10px] uppercase tracking-widest", theme === "dark" ? "bg-white text-black" : "bg-black text-white")}
                    >
                        <Save size={14} strokeWidth={3} /> Saqlash
                    </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Bildirishnomalar */}
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-slate-50 dark:border-white/5">
            <div className={iconContainerClass}>
              <Bell size={20} />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg font-bold dark:text-slate-100 uppercase tracking-tight">Bildirishnomalar</CardTitle>
              <CardDescription className="dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Xabarnomalar</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6 text-left">
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">Yangi to'lov haqida SMS</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01]">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight">Yangi xabar bildirishnomasi</span>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* 4. Xavfsizlik */}
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 rounded-[24px]">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-6 border-b border-slate-50 dark:border-white/5">
            <div className={iconContainerClass}>
              <ShieldCheck size={20} />
            </div>
            <div className="text-left">
              <CardTitle className="text-lg font-bold dark:text-slate-100 uppercase tracking-tight">Xavfsizlik</CardTitle>
              <CardDescription className="dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Hisob himoyasi</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-6">
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 dark:border-white/10 font-black text-[10px] uppercase tracking-widest dark:text-slate-100 dark:hover:bg-white/5">
              Parolni o'zgartirish
            </Button>
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 dark:border-white/10 font-black text-[10px] uppercase tracking-widest text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
              Ikki bosqichli himoya (2FA)
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
