"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Award } from "lucide-react"
import { InsightCards } from "@/components/insights/insight-cards"
import { IncomeExpenseChart } from "@/components/insights/income-expense-chart"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { useFinanceStats } from "@/lib/store"

export default function InsightsPage() {
  const { totalIncome, totalExpenses } = useFinanceStats()
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  const healthStatus = savingsRate >= 20 ? "excellent" : savingsRate >= 10 ? "good" : "review"
  const statusConfig = {
    excellent: {
      label: "Excellent",
      icon: Award,
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      badgeClass: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      borderClass: "border-emerald-500/20",
    },
    good: {
      label: "Good",
      icon: TrendingUp,
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      badgeClass: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500/20",
    },
    review: {
      label: "Needs Review",
      icon: TrendingDown,
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      badgeClass: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
      borderClass: "border-rose-500/20",
    },
  }

  const config = statusConfig[healthStatus]
  const StatusIcon = config.icon

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
            Financial Insights
          </h1>
          <p className="text-muted-foreground mt-1">
            Understand your spending patterns and financial health
          </p>
        </motion.div>

        {/* Financial Health Banner */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className={`mb-8 p-6 rounded-2xl border ${config.borderClass} shadow-lg bg-gradient-to-br ${config.gradient} overflow-hidden relative`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-3xl" />
            
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.badgeClass}`}
                >
                  <StatusIcon className="h-7 w-7" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-semibold mb-1">Financial Health Score</h2>
                  <p className="text-sm text-muted-foreground">
                    Based on your savings rate and spending habits
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`px-4 py-2 rounded-xl font-semibold ${config.badgeClass}`}
                >
                  {config.label}
                </motion.div>
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-right"
                >
                  <p className="text-3xl font-bold">{savingsRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">Savings Rate</p>
                </motion.div>
              </div>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6"
            >
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>0%</span>
                <span>Target: 20%</span>
                <span>50%+</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(savingsRate * 2, 100)}%` }}
                  transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    healthStatus === "excellent" 
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : healthStatus === "good"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-rose-500 to-pink-500"
                  }`}
                />
              </div>
            </motion.div>
          </motion.div>
        </ScrollReveal>

        {/* Insight Cards */}
        <ScrollReveal delay={0.2} className="mb-8">
          <InsightCards />
        </ScrollReveal>

        {/* Income vs Expense Chart */}
        <ScrollReveal delay={0.3}>
          <IncomeExpenseChart />
        </ScrollReveal>
      </div>
    </div>
  )
}
