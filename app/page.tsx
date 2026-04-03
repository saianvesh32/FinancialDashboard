"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/dashboard/hero-section"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { BalanceChart } from "@/components/dashboard/balance-chart"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { PhonePreview } from "@/components/dashboard/phone-preview"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Section Header */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-balance">
              Financial Overview
            </h2>
            <p className="text-muted-foreground mt-1">
              {"Track your income, expenses, and balance at a glance"}
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Summary Cards */}
        <ScrollReveal delay={0.1} >
          <PhonePreview />
        </ScrollReveal>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2 mt-8">
          <ScrollReveal delay={0.2}>
            <BalanceChart />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <SpendingChart />
          </ScrollReveal>
        </div>

        {/* Recent Activity */}
        <ScrollReveal delay={0.4}>
          <RecentActivity />
        </ScrollReveal>
      </div>
    </div>
  )
}
