"use client"

import { motion } from "framer-motion"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useFinanceStats } from "@/lib/store"

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinanceStats()

  const cards = [
    {
      title: "Balance",
      value: totalBalance,
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      gradient: "from-emerald-400 to-teal-600",
    },
    {
      title: "Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "-3.1%",
      trendUp: false,
      gradient: "from-rose-400 to-pink-600",
    },
  ]

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 18,
              },
            },
          }}
        >
          <Card className="relative overflow-hidden border-0 bg-slate-900 text-white shadow-lg rounded-xl">
            
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-20 blur-xl`}
            />

            <CardContent className="relative p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] text-gray-400">{card.title}</p>
                  <p className="text-sm font-bold">
                    {formatCurrency(card.value)}
                  </p>
                </div>

                <div
                  className={`p-1.5 rounded-lg bg-gradient-to-br ${card.gradient}`}
                >
                  <card.icon className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="mt-2 flex items-center gap-1 text-[10px]">
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    card.trendUp ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {card.trendUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {card.trend}
                </span>
              </div>
            </CardContent>

            <div
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.gradient}`}
            />
          </Card>
        </motion.div>
      ))}
    </div>
  )
}