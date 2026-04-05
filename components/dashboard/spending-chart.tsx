"use client"

import { motion } from "framer-motion"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { useCategoryData } from "@/lib/store"

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
]

export function SpendingChart() {
  const categoryData = useCategoryData()

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)

  const total = categoryData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="h-full"
    >
      <Card className="border-0 shadow-lg h-full flex flex-col">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>
            Clear breakdown of your expenses
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Chart */}
          <div className="h-[320px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={3}
                  dataKey="amount"
                  nameKey="category"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                {/* ✅ Custom Tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]
                      const value = data.value as number
                      const name = data.name

                      const percentage = (
                        (value / total) *
                        100
                      ).toFixed(1)

                      return (
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-3 shadow-lg border border-gray-200 dark:border-gray-700">
                          
                          {/* Category */}
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {name}
                          </p>

                          {/* Amount */}
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formatCurrency(value)}
                          </p>

                          {/* Percentage */}
                          <p
                            className="text-sm font-medium mt-1"
                            style={{ color: data.payload.fill }}
                          >
                            {percentage}%
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />

                {/* Legend */}
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Total Spending */}
          <div className="mt-auto pt-4 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">
              Total Spending
            </span>
            <span className="text-lg font-bold">
              {formatCurrency(total)}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}