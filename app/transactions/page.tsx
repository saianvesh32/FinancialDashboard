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
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Balance",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalBalance),
      icon: Wallet,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Income",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalIncome),
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Expenses",
      value: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(totalExpenses),
      icon: TrendingDown,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
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
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
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

        {/* Quick Stats */}
        <ScrollReveal className="mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold">{stat.value}</p>
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
