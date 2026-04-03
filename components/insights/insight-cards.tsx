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

  // Calculate month-over-month change
  const currentMonthExpense = monthlyData[monthlyData.length - 1]?.expense || 0
  const previousMonthExpense = monthlyData[monthlyData.length - 2]?.expense || 1
  const momChange = ((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100

  // Highest spending category
  const highestCategory = categoryData[0] || { category: "N/A", amount: 0 }

  // Savings rate
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0
  const isHealthy = savingsRate >= 20

  // Top 3 expenses
  const topExpenses = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3)

  const insights = [
    {
      title: "Highest Spending",
      value: highestCategory.category,
      subValue: formatCurrency(highestCategory.amount),
      icon: PieChart,
      gradient: "from-indigo-500/10 to-violet-600/10",
      iconBg: "bg-indigo-500/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
      borderGlow: "shadow-indigo-500/10",
    },
    {
      title: "Month over Month",
      value: `${momChange >= 0 ? "+" : ""}${momChange.toFixed(1)}%`,
      subValue: momChange >= 0 ? "Expenses increased" : "Expenses decreased",
      icon: momChange >= 0 ? TrendingUp : TrendingDown,
      trend: momChange >= 0 ? "up" : "down",
      gradient: momChange >= 0 
        ? "from-rose-500/10 to-pink-600/10" 
        : "from-emerald-500/10 to-teal-600/10",
      iconBg: momChange >= 0 ? "bg-rose-500/20" : "bg-emerald-500/20",
      textColor: momChange >= 0 
        ? "text-rose-600 dark:text-rose-400" 
        : "text-emerald-600 dark:text-emerald-400",
      borderGlow: momChange >= 0 ? "shadow-rose-500/10" : "shadow-emerald-500/10",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      subValue: isHealthy ? "Healthy" : "Needs improvement",
      icon: isHealthy ? ShieldCheck : AlertTriangle,
      gradient: isHealthy 
        ? "from-emerald-500/10 to-teal-600/10" 
        : "from-amber-500/10 to-orange-600/10",
      iconBg: isHealthy ? "bg-emerald-500/20" : "bg-amber-500/20",
      textColor: isHealthy 
        ? "text-emerald-600 dark:text-emerald-400" 
        : "text-amber-600 dark:text-amber-400",
      isHealthy,
      borderGlow: isHealthy ? "shadow-emerald-500/10" : "shadow-amber-500/10",
    },
    {
      title: "Financial Activity",
      value: transactions.length.toString(),
      subValue: "Total transactions",
      icon: Activity,
      gradient: "from-blue-500/10 to-cyan-600/10",
      iconBg: "bg-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
      borderGlow: "shadow-blue-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Main Insight Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ perspective: "1000px" }}
      >
        {insights.map((insight) => (
          <motion.div key={insight.title} variants={item}>
            <TiltCard className="h-full">
              <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl ${insight.borderGlow} transition-all duration-500 h-full`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-60`} />
                <CardContent className="relative p-5">
                  <div className="flex items-start justify-between mb-3">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${insight.iconBg} backdrop-blur-sm`}
                    >
                      <insight.icon className={`h-5 w-5 ${insight.textColor}`} />
                    </motion.div>
                    {"isHealthy" in insight && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          insight.isHealthy
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {insight.isHealthy ? "Good" : "Review"}
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {insight.title}
                  </p>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-xl font-bold tracking-tight"
                  >
                    {insight.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {insight.subValue}
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Top Expenses Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top 3 Expenses</h3>
            <div className="space-y-3">
              {topExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold"
                  >
                    #{index + 1}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{expense.description}</p>
                    <p className="text-xs text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
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
