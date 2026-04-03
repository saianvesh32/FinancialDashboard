"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import {
  ShoppingBag,
  Utensils,
  Car,
  Zap,
  Heart,
  Briefcase,
  TrendingUp,
  Plane,
  Film,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useFinanceStore, TransactionCategory } from "@/lib/store"
import { cn } from "@/lib/utils"

const categoryIcons: Record<TransactionCategory, typeof ShoppingBag> = {
  "Shopping": ShoppingBag,
  "Food & Dining": Utensils,
  "Transportation": Car,
  "Bills & Utilities": Zap,
  "Healthcare": Heart,
  "Salary": Briefcase,
  "Freelance": Briefcase,
  "Investment": TrendingUp,
  "Travel": Plane,
  "Entertainment": Film,
  "Other": Wallet,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
}

export function RecentActivity() {
  const { transactions } = useFinanceStore()
  const recentTransactions = transactions.slice(0, 5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {recentTransactions.map((transaction) => {
              const Icon = categoryIcons[transaction.category]
              const isIncome = transaction.type === "income"
              
              return (
                <motion.div
                  key={transaction.id}
                  variants={item}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer group"
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                      isIncome
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category} • {format(new Date(transaction.date), "MMM d")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {isIncome ? (
                      <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    )}
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isIncome
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      )}
                    >
                      {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
