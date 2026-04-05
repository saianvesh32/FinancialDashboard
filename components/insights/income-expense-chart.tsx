"use client"

import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useMonthlyData } from "@/lib/store"

export function IncomeExpenseChart() {
  const rawData = useMonthlyData()

  // ✅ Desired order
  const monthOrder = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

  // ✅ Normalize & reorder data
  const monthlyData = monthOrder.map((month) => {
    const found = rawData.find((m) => m.month === month)
    return (
      found || {
        month,
        income: 0,
        expense: 0,
      }
    )
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/40">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Income vs Expenses
          </CardTitle>
          <CardDescription>
            Compare your income and expenses from Oct to Mar
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                barGap={10}
              >
                {/* 🔥 Gradients */}
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>

                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />

                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-xl bg-popover/95 p-4 shadow-xl border border-border backdrop-blur-sm">
                          <p className="text-sm font-medium mb-3">{label}</p>
                          <div className="space-y-2">
                            {payload.map((entry, index) => (
                              <div key={index} className="flex justify-between gap-8">
                                <span className="capitalize text-sm">
                                  {entry.name}
                                </span>
                                <span className="font-semibold text-sm">
                                  {formatCurrency(entry.value as number)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />

                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                />

                {/* 💚 Income */}
                <Bar
                  dataKey="income"
                  fill="url(#incomeGradient)"
                  radius={[8, 8, 0, 0]}
                />

                {/* ❤️ Expense */}
                <Bar
                  dataKey="expense"
                  fill="url(#expenseGradient)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Total Income
              </p>
              <p className="text-xl font-bold text-emerald-500">
                {formatCurrency(
                  monthlyData.reduce((sum, m) => sum + m.income, 0)
                )}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">
                Total Expenses
              </p>
              <p className="text-xl font-bold text-rose-500">
                {formatCurrency(
                  monthlyData.reduce((sum, m) => sum + m.expense, 0)
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}