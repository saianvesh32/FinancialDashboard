"use client"

import { motion } from "framer-motion"
import { TransactionList } from "@/components/transactions/transaction-list"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { useFinanceStore, useFilteredTransactions, useFinanceStats } from "@/lib/store"
import { Wallet, TrendingUp, TrendingDown, Receipt } from "lucide-react"

export default function TransactionsPage() {
  const { role } = useFinanceStore()
  const filteredTransactions = useFilteredTransactions()
  const { totalIncome, totalExpenses, totalBalance } = useFinanceStats()

  const stats = [
    {
      label: "Total Transactions",
      value: filteredTransactions.length.toString(),
      icon: Receipt,
      gradient:
        "bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900",
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-300",
    },
    {
      label: "Balance",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalBalance),
      icon: Wallet,
      gradient:
        "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
    },
    {
      label: "Income",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalIncome),
      icon: TrendingUp,
      gradient:
        "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900",
      iconBg: "bg-emerald-400/20",
      iconColor: "text-emerald-300",
    },
    {
      label: "Expenses",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalExpenses),
      icon: TrendingDown,
      gradient:
        "bg-gradient-to-br from-purple-900 via-rose-900 to-purple-900",
      iconBg: "bg-rose-400/20",
      iconColor: "text-rose-300",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Transactions
              </h1>
              <p className="text-muted-foreground mt-1">
                {role === "Admin"
                  ? "Manage and track all your transactions"
                  : "View all your transactions"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 🔥 PREMIUM STATS CARDS */}
        <ScrollReveal className="mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className={`relative p-5 rounded-2xl text-white shadow-xl ${stat.gradient}`}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-xl" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>

                    {/* Optional growth text */}
                    <p className="text-xs mt-1 text-emerald-300">
                      ↑ +8.2%
                    </p>
                  </div>

                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Transaction List */}
        <ScrollReveal delay={0.2}>
          <TransactionList />
        </ScrollReveal>
      </div>
    </div>
  )
}