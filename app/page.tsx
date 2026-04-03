"use client"

import { motion } from "framer-motion"
import { HeroSection } from "@/components/dashboard/hero-section"
import { BalanceChart } from "@/components/dashboard/balance-chart"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { PhonePreview } from "@/components/dashboard/phone-preview"
import { SummaryCards } from "@/components/dashboard/summary-cards"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ✅ Container */}
      <div className="mx-auto w-full max-w-7xl">

        {/* Hero Section */}
        <HeroSection />

        {/* Header */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8"
          >
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
              Financial Overview
            </h2>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Track your income, expenses, and balance at a glance
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Phone Preview */}
        <ScrollReveal delay={0.1}>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <SummaryCards />
          </div>
        </ScrollReveal>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8">
          <ScrollReveal delay={0.2}>
            <BalanceChart />
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <SpendingChart />
          </ScrollReveal>
        </div>

        {/* Recent Activity */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8">
            <RecentActivity />
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}