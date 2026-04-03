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

// 🎨 Better distinct colors
const COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
]

export function SpendingChart() {
  const categoryData = useCategoryData()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const total = categoryData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-0 shadow-lg h-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Spending by Category
          </CardTitle>
          <CardDescription>
            Clear breakdown of your expenses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="amount"
                  nameKey="category"
                  animationDuration={1200}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>

                {/* Tooltip */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0]
                      const percentage = (
                        (data.value as number / total) *
                        100
                      ).toFixed(1)

                      return (
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-3 shadow-xl border border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium">
                            {data.name}
                          </p>
                          <p
                            className="text-sm font-semibold mt-1"
                            style={{ color: data.payload.fill }}
                          >
                            {formatCurrency(data.value as number)} ({percentage}%)
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
                  iconSize={10}
                  formatter={(value) => (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Total Spending
              </span>
              <span className="text-lg font-bold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}