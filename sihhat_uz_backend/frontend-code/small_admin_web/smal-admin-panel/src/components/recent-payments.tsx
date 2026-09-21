"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Phone, Calendar } from "lucide-react"

const recentPayments = [
  {
    id: "1",
    firstName: "Asadbek",
    lastName: "Karimov",
    phone: "+998 90 123 45 67",
    birthDate: "1995",
    province: "Farg'ona",
    district: "Marg'ilon",
    amount: "1,200,000 UZS",
    date: "Bugun"
  },
  {
    id: "2",
    firstName: "Malika",
    lastName: "Saidova",
    phone: "+998 93 456 78 90",
    birthDate: "1998",
    province: "Toshkent",
    district: "Chilonzor",
    amount: "850,000 UZS",
    date: "Kecha"
  },
  {
    id: "3",
    firstName: "Jahongir",
    lastName: "Abduvohidov",
    phone: "+998 99 777 11 22",
    birthDate: "1990",
    province: "Samarqand",
    district: "Pastdarg'om",
    amount: "2,100,000 UZS",
    date: "2 kun oldin"
  },
  {
    id: "4",
    firstName: "Zilola",
    lastName: "Xodjayeva",
    phone: "+998 94 555 33 44",
    birthDate: "2001",
    province: "Andijon",
    district: "Asaka",
    amount: "1,500,000 UZS",
    date: "4 kun oldin"
  }
]

export function RecentPayments() {
  return (
    <Card className="ring-0 border-0 shadow-none bg-transparent rounded-none">
      <CardHeader className="flex flex-col gap-1 px-0 pb-6 text-left">
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">So'nggi to'lovlar</CardTitle>
        <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
          Oxirgi 6 kun ichida to'lov qilgan foydalanuvchilar ro'yxati
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-4 text-left">
          {recentPayments.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl transition-all bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:border-primary/20 hover:bg-slate-50 dark:hover:bg-slate-800/80 group"
            >
              <div className="flex items-start gap-4 text-left">
                <Avatar className="size-12 rounded-xl border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                  <AvatarFallback className="bg-primary/5 text-primary font-bold text-base rounded-xl">
                    {user.firstName[0]}{user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-left">
                  <p className="text-base font-bold leading-none text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                    {user.firstName} {user.lastName}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                    <Phone className="size-3.5" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider">
                      <Calendar className="size-3" />
                      <span>{user.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-500 font-semibold uppercase tracking-wider">
                      <MapPin className="size-3" />
                      <span>{user.province}, {user.district}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 pt-3 sm:pt-0">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-500 tracking-tight">
                  {user.amount}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-800">
                  {user.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
