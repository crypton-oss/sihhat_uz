"use client"

import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Calendar, User as UserIcon, X, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const initialUsers = [
  {
    id: "1",
    firstName: "Asadbek",
    lastName: "Karimov",
    phone: "+998 90 123 45 67",
    birthDate: "15.05.1995",
    province: "Farg'ona",
    district: "Marg'ilon",
    regDate: "01.09.2024",
    gender: "Erkak"
  },
  {
    id: "2",
    firstName: "Malika",
    lastName: "Saidova",
    phone: "+998 93 456 78 90",
    birthDate: "22.11.1998",
    province: "Toshkent",
    district: "Chilonzor",
    regDate: "28.08.2024",
    gender: "Ayol"
  },
  {
    id: "3",
    firstName: "Jahongir",
    lastName: "Abduvohidov",
    phone: "+998 99 777 11 22",
    birthDate: "05.02.1990",
    province: "Samarqand",
    district: "Pastdarg'om",
    regDate: "03.09.2024",
    gender: "Erkak"
  },
  {
    id: "4",
    firstName: "Zilola",
    lastName: "Xodjayeva",
    phone: "+998 94 555 33 44",
    birthDate: "10.08.2001",
    province: "Andijon",
    district: "Asaka",
    regDate: "15.08.2024",
    gender: "Ayol"
  }
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return initialUsers;

    return initialUsers.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.phone.replace(/\s/g, "").includes(query.replace(/\s/g, ""))
    );
  }, [searchQuery]);

  const toggleUser = (id: string) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  return (
    <div className="flex w-full flex-col gap-0 pb-10 px-0">
      <div className="mb-10 px-6 text-left">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">Foydalanuvchilar</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Barcha ro'yxatdan o'tgan mijozlar bazasi</p>
      </div>

      {/* Search Input - Dark mode da PURE BLACK fon */}
      <div className="relative w-full group mb-8 px-6">
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
          <Search size={20} strokeWidth={2.5} />
        </div>
        <Input
          placeholder="Ism, familiya yoki telefon raqami orqali qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-12 pr-12 bg-white border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-primary/5 transition-all text-base font-medium placeholder:text-slate-400 dark:bg-black dark:border-white/10 dark:text-slate-100"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <hr className="border-t-2 border-slate-900/5 dark:border-white/5 mb-8" />

      {/* Foydalanuvchilar ro'yxati - Dark mode da PURE BLACK fonli kartalar */}
      <div className="flex flex-col gap-3 px-6 text-left">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border transition-all duration-200",
                expandedUserId === user.id
                  ? "border-primary/20 shadow-md ring-1 ring-primary/5 bg-white dark:bg-black"
                  : "border-slate-100 dark:border-white/5 shadow-sm hover:border-slate-200 dark:hover:border-white/10 bg-white dark:bg-black"
              )}
            >
              <button
                onClick={() => toggleUser(user.id)}
                className="flex items-center justify-between p-4 text-left w-full hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="size-11 border border-slate-100 dark:border-white/10 shadow-sm">
                    <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase">
                      {user.firstName[0]}{user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-widest bg-slate-50 dark:bg-black px-2 py-1 rounded-lg border dark:border-white/5">
                        {user.phone}
                    </span>
                    {expandedUserId === user.id ? (
                        <ChevronUp size={18} className="text-primary" strokeWidth={2.5} />
                    ) : (
                        <ChevronDown size={18} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" strokeWidth={2.5} />
                    )}
                </div>
              </button>

              <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                expandedUserId === user.id ? "grid-rows-[1fr] opacity-100 p-6 pt-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-white/[0.01]" : "grid-rows-[0fr] opacity-0"
              )}>
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <div className="space-y-1.5 text-left">
                      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <Phone size={12} /> Aloqa
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.phone}</p>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <Calendar size={12} /> Tug'ilgan sana
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.birthDate}</p>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <MapPin size={12} /> Viloyat
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.province}</p>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <MapPin size={12} /> Tuman
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.district}</p>
                    </div>
                    <div className="space-y-1.5 text-left">
                      <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                        <Clock size={12} /> Ro'yxatdan o'tgan sana
                      </p>
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-black p-3 rounded-xl border border-slate-100 dark:border-white/10 shadow-sm">{user.regDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 gap-3 bg-slate-50/50 dark:bg-black rounded-[32px] border border-dashed border-slate-200 dark:border-white/10">
            <UserIcon size={40} strokeWidth={1.5} />
            <p className="font-bold tracking-tight text-lg">Foydalanuvchi topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
}
