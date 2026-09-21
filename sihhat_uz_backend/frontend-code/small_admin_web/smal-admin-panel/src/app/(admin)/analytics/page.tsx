"use client"

import { useState } from "react";
import {
  CreditCard,
  TrendingUp,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Activity
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChartPieInteractive } from "@/components/chart-pie-interactive";
import { AreaChart } from "@/components/AreaChart";
import { ComboChart } from "@/components/ComboChart";
import { cn } from "@/lib/utils";

const generateMonthlyData = () => {
  const data = [];
  const now = new Date();
  const month = now.getMonth();
  const monthNames = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];

  for (let i = 1; i <= 31; i++) {
    data.push({
      date: `${i}-${monthNames[month]}`,
      Tushum: 0,
    });
  }
  return data;
};

const chartdata = generateMonthlyData();

const comboChartData = [
  { date: "Jan 23", SolarPanels: 0 },
  { date: "Feb 23", SolarPanels: 0 },
  { date: "Mar 23", SolarPanels: 0 },
  { date: "Apr 23", SolarPanels: 0 },
  { date: "May 23", SolarPanels: 0 },
  { date: "Jun 23", SolarPanels: 0 },
  { date: "Jul 23", SolarPanels: 0 },
  { date: "Aug 23", SolarPanels: 0 },
  { date: "Sep 23", SolarPanels: 0 },
  { date: "Oct 23", SolarPanels: 0 },
  { date: "Nov 23", SolarPanels: 0 },
  { date: "Dec 23", SolarPanels: 0 },
];

const paidUsers = [
  { id: "p1", firstName: "Asadbek", lastName: "Karimov", phone: "+998 90 123 45 67", birthDate: "15.05.1995", province: "Farg'ona", district: "Marg'ilon", payDate: "04.09.2024", amount: "1,200,000 UZS", method: "Payme" },
  { id: "p2", firstName: "Malika", lastName: "Saidova", phone: "+998 93 456 78 90", birthDate: "22.11.1998", province: "Toshkent", district: "Chilonzor", payDate: "03.09.2024", amount: "850,000 UZS", method: "Click" },
  { id: "p3", firstName: "Jahongir", lastName: "Abduvohidov", phone: "+998 99 777 11 22", birthDate: "05.02.1990", province: "Samarqand", district: "Pastdarg'om", payDate: "02.09.2024", amount: "2,100,000 UZS", method: "Naqd" },
  { id: "p4", firstName: "Zilola", lastName: "Xodjayeva", phone: "+998 94 555 33 44", birthDate: "10.08.2001", province: "Andijon", district: "Asaka", payDate: "01.09.2024", amount: "1,500,000 UZS", method: "Payme" }
];

export default function AnalyticsPage() {
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const toggleUser = (id: string) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  return (
    <div className="flex w-full flex-col gap-8 pb-10 px-0">
      <div className="px-6">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Analitika</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Tushumlar va mijozlar tahlili</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 px-6 items-start">
        {/* Jami tushum - PURE BLACK fon */}
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 overflow-hidden group hover:ring-primary/20 transition-all lg:col-span-2 h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-transparent">
            <div className="grid gap-1 text-left">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-50 text-left">Jami tushum</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-left">31 kunlik daromad grafigi</CardDescription>
            </div>
            <div className="size-10 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
              <TrendingUp size={20} />
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-2 bg-transparent">
            <div className="h-64 w-full">
              <AreaChart
                data={chartdata}
                index="date"
                categories={["Tushum"]}
                valueFormatter={(number: number) => `${Intl.NumberFormat("uz").format(number)} UZS`}
                yAxisTickFormatter={(number: number) => number === 0 ? "" : `${(number / 1000000).toFixed(1)}M`}
                fill="gradient"
              />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-1 h-full">
          <ChartPieInteractive />
        </div>
      </div>

      {/* Yillik qiyosiy tahlil - PURE BLACK fon */}
      <div className="px-6">
        <Card className="border-0 shadow-sm bg-white dark:bg-black ring-1 ring-slate-200/60 dark:ring-white/10 overflow-hidden group hover:ring-primary/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10 bg-transparent">
            <div className="grid gap-1 text-left">
              <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-50 text-left">Yillik qiyosiy tahlil</CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-left">Mijozlar faolligi ko'rsatkichlari</CardDescription>
            </div>
            <div className="size-10 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
              <Activity size={20} />
            </div>
          </CardHeader>
          <CardContent className="bg-transparent">
            <ComboChart
              data={comboChartData}
              index="date"
              barSeries={{ categories: ["SolarPanels"] }}
              className="h-96"
            />
          </CardContent>
        </Card>
      </div>

      <hr className="border-t-2 border-slate-900/5 dark:border-white/5" />

      {/* To'lovchilar ma'lumotnomasi - PURE BLACK fon */}
      <div className="px-6 space-y-4 text-left">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">To'lovchilar ma'lumotnomasi</h3>
        <div className="flex flex-col gap-3">
          {paidUsers.map((user) => (
            <div key={user.id} className={cn("group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-black border transition-all duration-200", expandedUserId === user.id ? "border-primary/20 shadow-md ring-1 ring-primary/5" : "border-slate-100 dark:border-white/5 shadow-sm hover:border-slate-200 dark:hover:border-white/10")}>
              <button onClick={() => toggleUser(user.id)} className="flex items-center justify-between p-4 text-left w-full hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar className="size-11 border border-slate-100 dark:border-white/10 shadow-sm">
                    <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight block leading-none">{user.firstName} {user.lastName}</span>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1 inline-block">{user.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-black px-2 py-1 rounded-lg border dark:border-white/5">{user.payDate}</span>
                    {expandedUserId === user.id ? <ChevronUp size={18} className="text-primary" strokeWidth={2.5} /> : <ChevronDown size={18} className="text-slate-400 dark:text-slate-600" strokeWidth={2.5} />}
                </div>
              </button>
              <div className={cn("grid transition-all duration-300 ease-in-out", expandedUserId === user.id ? "grid-rows-[1fr] opacity-100 p-6 pt-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.01]" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><Phone size={12} /> Aloqa</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.phone}</p></div>
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><Calendar size={12} /> Tug'ilgan sana</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.birthDate}</p></div>
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><CreditCard size={12} /> To'lov usuli</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.method}</p></div>
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><MapPin size={12} /> Viloyat</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.province}</p></div>
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><MapPin size={12} /> Tuman</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.district}</p></div>
                    <div className="space-y-1.5 text-left"><p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500"><Clock size={12} /> To'lov sanasi</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.payDate}</p></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
