"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFinanceStats } from "@/lib/store"

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { totalBalance } = useFinanceStats()

  const [active, setActive] = useState<"front" | "back">("front")

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const features = [
    { icon: TrendingUp, label: "Real-time Analytics" },
    { icon: Shield, label: "Bank-grade Security" },
    { icon: Zap, label: "Instant Insights" },
  ]

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="relative overflow-hidden rounded-3xl border border-border/50 mb-8 
      bg-gradient-to-br 
      from-white via-blue-50/40 to-indigo-100/30 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
      backdrop-blur"
    >
      {/* Background */}
      <img
        src="/images/gradient-mesh2.png"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative px-6 py-12 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
              bg-blue-100 text-blue-700 
              dark:bg-blue-900/40 dark:text-blue-300 text-sm">
              <Sparkles className="h-4 w-4" />
              Your Financial Command Center
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">
                Take Control of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 
                dark:from-blue-400 dark:to-indigo-300
                bg-clip-text text-transparent">
                Your Finances
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 max-w-md text-lg">
              Track spending, analyze trends, and make smarter financial decisions.
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                View Demo
              </Button>
            </div>

            {/* Features */}
            <div className="flex gap-6 flex-wrap">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <f.icon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE STACK */}
          <div className="relative h-[480px] flex items-center justify-center">

            {/* BACK IMAGE */}
            <motion.img
              src="/images/dashboard1.png"
              onClick={() => setActive("back")}
              animate={{
                scale: active === "back" ? 1 : 0.85,
                rotateY: active === "back" ? 0 : -18,
                x: active === "back" ? 0 : 80,
                y: active === "back" ? 0 : 40,
                zIndex: active === "back" ? 30 : 10,
                filter: active === "back" ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute w-[700px] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] cursor-pointer"
              style={{ y }}
            />

            {/* FRONT IMAGE */}
            <motion.img
              src="/images/dashboard2.png"
              onClick={() => setActive("front")}
              animate={{
                scale: active === "front" ? 1 : 0.85,
                rotateY: active === "front" ? 0 : 18,
                x: active === "front" ? 0 : -80,
                y: active === "front" ? 0 : -40,
                zIndex: active === "front" ? 30 : 10,
                filter: active === "front" ? "blur(0px)" : "blur(2px)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute w-[700px] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.5)] cursor-pointer"
              style={{ y }}
            />

            {/* Profit */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-10 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg"
            >
              +$1,200
            </motion.div>

            {/* Saved */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-0 
              bg-white dark:bg-slate-800 
              text-gray-800 dark:text-gray-200
              px-4 py-2 rounded-xl shadow-lg border dark:border-gray-700"
            >
              Saved: {formatCurrency(totalBalance)}
            </motion.div>

          </div>

        </div>
      </div>
    </motion.div>
  )
}