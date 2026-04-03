"use client"

import { motion } from "framer-motion"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useMonthlyData } from "@/lib/store"

export function BalanceChart() {
  const monthlyData = useMonthlyData()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)

  let runningBalance = 0
  const chartData = monthlyData.map((item) => {
    runningBalance += item.income - item.expense
    return {
      ...item,
      balance: runningBalance,
    }
  })

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>Income vs Expense vs Balance</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                {/* Gradients */}
                <defs>
                  <linearGradient id="balance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis dataKey="month" />
                <YAxis />

                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                />

                <Legend />

                {/* Balance */}
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  fill="url(#balance)"
                  strokeWidth={3}
                />

                {/* Income */}
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  fill="url(#income)"
                  strokeWidth={2}
                />

                {/* Expense */}
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fill="url(#expense)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}