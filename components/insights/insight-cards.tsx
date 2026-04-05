"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Activity,
  ArrowDownRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { TiltCard } from "@/components/ui/tilt-card"
import { useFinanceStore, useFinanceStats, useMonthlyData, useCategoryData } from "@/lib/store"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  },
}

export function InsightCards() {
  const { transactions } = useFinanceStore()
  const { totalIncome, totalExpenses } = useFinanceStats()
  const monthlyData = useMonthlyData()
  const categoryData = useCategoryData()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const currentMonthExpense = monthlyData[monthlyData.length - 1]?.expense || 0
  const previousMonthExpense = monthlyData[monthlyData.length - 2]?.expense || 1
  const momChange = ((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100

  const highestCategory = categoryData[0] || { category: "N/A", amount: 0 }

  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  const isHealthy = savingsRate >= 20

  const topExpenses = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)

  // 🔥 UPDATED PREMIUM COLORS
  const insights = [
    {
      title: "Highest Spending",
      value: highestCategory.category,
      subValue: formatCurrency(highestCategory.amount),
      icon: PieChart,
      gradient: "bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900",
      iconBg: "bg-indigo-500/20",
      iconColor: "text-indigo-300",
    },
    {
      title: "Month over Month",
      value: `${momChange >= 0 ? "+" : ""}${momChange.toFixed(1)}%`,
      subValue: momChange >= 0 ? "Expenses increased" : "Expenses decreased",
      icon: momChange >= 0 ? TrendingUp : TrendingDown,
      gradient: momChange >= 0
        ? "bg-gradient-to-br from-rose-900 via-rose-800 to-purple-900"
        : "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900",
      iconBg: momChange >= 0 ? "bg-rose-400/20" : "bg-emerald-400/20",
      iconColor: momChange >= 0 ? "text-rose-300" : "text-emerald-300",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      subValue: isHealthy ? "Healthy" : "Needs improvement",
      icon: isHealthy ? ShieldCheck : AlertTriangle,
      gradient: isHealthy
        ? "bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-900"
        : "bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900",
      iconBg: isHealthy ? "bg-emerald-400/20" : "bg-amber-400/20",
      iconColor: isHealthy ? "text-emerald-300" : "text-amber-300",
      isHealthy,
    },
    {
      title: "Financial Activity",
      value: transactions.length.toString(),
      subValue: "Total transactions",
      icon: Activity,
      gradient: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
      iconBg: "bg-blue-400/20",
      iconColor: "text-blue-300",
    },
  ]

  return (
    <div className="space-y-8">
      {/* 🔥 MAIN CARDS */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {insights.map((insight) => (
          <motion.div key={insight.title} variants={item}>
            <TiltCard className="h-full">
              <Card className={`relative overflow-hidden border-0 shadow-2xl ${insight.gradient} text-white`}>
                
                {/* Glow */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-xl" />

                <CardContent className="relative p-5">
                  <div className="flex items-start justify-between mb-3">
                    
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${insight.iconBg}`}>
                      <insight.icon className={`h-5 w-5 ${insight.iconColor}`} />
                    </div>

                    {"isHealthy" in insight && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.isHealthy
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}>
                        {insight.isHealthy ? "Good" : "Review"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-white/70 mb-1">
                    {insight.title}
                  </p>

                  <p className="text-xl font-bold">
                    {insight.value}
                  </p>

                  <p className="text-sm text-white/70 mt-1">
                    {insight.subValue}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Top Expenses (UNCHANGED) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top 3 Expenses</h3>
            <div className="space-y-3">
              {topExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400 font-bold">
                    #{index + 1}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.category}</p>
                  </div>

                  <div className="flex items-center gap-1 text-rose-400">
                    <ArrowDownRight className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      -{formatCurrency(expense.amount)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}