

// "use client"

// import { motion, useScroll, useTransform } from "framer-motion"
// import { useRef } from "react"
// import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useFinanceStats } from "@/lib/store"

// export function HeroSection() {
//   const ref = useRef<HTMLDivElement>(null)
//   const { totalBalance } = useFinanceStats()

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   })

//   const y = useTransform(scrollYProgress, [0, 1], [0, 150])
//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
//   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount)
//   }

//   const features = [
//     { icon: TrendingUp, label: "Real-time Analytics" },
//     { icon: Shield, label: "Bank-grade Security" },
//     { icon: Zap, label: "Instant Insights" },
//   ]

//   return (
//     <motion.div
//       ref={ref}
//       style={{ opacity, scale }}
//       className="relative overflow-hidden rounded-3xl border border-border/50 mb-8 backdrop-blur bg-gradient-to-br from-white via-blue-50/40 to-indigo-100/30 dark:from-background dark:via-background dark:to-background"
//     >
//       {/* Background Image */}
//       <img
//         src="/images/gradient-mesh2.png"
//         alt="background"
//         className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
//       />

//       <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
//         <div className="grid gap-8 lg:grid-cols-2 items-center">

//           {/* LEFT CONTENT */}
//           <div className="space-y-6">
            
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/60 text-blue-600 text-sm font-medium"
//             >
//               <Sparkles className="h-4 w-4 text-blue-500" />
//               Your Financial Command Center
//             </motion.div>

//             {/* Heading */}
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-4xl lg:text-5xl font-bold leading-tight"
//             >
//               <span className="text-gray-900 dark:text-white">
//                 Take Control of{" "}
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
//                 Your Finances
//               </span>
//             </motion.h1>

//             {/* Subtext */}
//             <motion.p className="text-gray-600 dark:text-muted-foreground max-w-md text-lg">
//               Track spending, analyze trends, and make smarter financial decisions.
//             </motion.p>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <Button
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
//               >
//                 Get Started <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="bg-white/80 backdrop-blur border border-gray-200 hover:bg-white"
//               >
//                 View Demo
//               </Button>
//             </div>

//             {/* Features */}
//             <div className="flex gap-6 pt-2 flex-wrap">
//               {features.map((f, i) => (
//                 <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
//                   <div className="p-1.5 rounded-lg bg-blue-100/60">
//                     <f.icon className="h-4 w-4 text-blue-600" />
//                   </div>
//                   {f.label}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div className="relative">
//             <motion.img
//               src="/images/dashboard-mock2.png"
//               alt="Dashboard"
//               initial={{ opacity: 0, x: 80, scale: 0.9 }}
//               animate={{ opacity: 1, x: 0, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               style={{ y }}
//               className="rounded-2xl shadow-2xl border border-white/30"
//             />

//             {/* Floating Profit */}
//             <motion.div
//               animate={{ y: [0, -10, 0] }}
//               transition={{ duration: 4, repeat: Infinity }}
//               className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg font-semibold"
//             >
//               +$1,200
//             </motion.div>

//             {/* Saved */}
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 5, repeat: Infinity }}
//               className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border text-gray-800"
//             >
//               Saved: {formatCurrency(totalBalance)}
//             </motion.div>
//           </div>

//         </div>
//       </div>
//     </motion.div>
//   )
// }




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
      className="relative overflow-hidden rounded-3xl border border-border/50 mb-8 bg-gradient-to-br from-white via-blue-50/40 to-indigo-100/30 backdrop-blur"
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm">
              <Sparkles className="h-4 w-4" />
              Your Financial Command Center
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-gray-900">Take Control of</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                Your Finances
              </span>
            </h1>

            <p className="text-gray-600 max-w-md text-lg">
              Track spending, analyze trends, and make smarter financial decisions.
            </p>

            <div className="flex gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">View Demo</Button>
            </div>

            <div className="flex gap-6 flex-wrap">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <f.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE STACK */}
          <div className="relative h-[480px] flex items-center justify-center">

            {/* BACK IMAGE (bottom-right) */}
            <motion.img
              src="/images/dashboard-back.png"
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
              className="absolute w-[500px] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] cursor-pointer"
              style={{ y }}
            />

            {/* FRONT IMAGE (top-left) */}
            <motion.img
              src="/images/dashboard-front.png"
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
              className="absolute w-[500px] rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] cursor-pointer"
              style={{ y }}
            />

            {/* Floating Profit */}
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
              className="absolute bottom-0 bg-white px-4 py-2 rounded-xl shadow-lg border"
            >
              Saved: {formatCurrency(totalBalance)}
            </motion.div>

          </div>

        </div>
      </div>
    </motion.div>
  )
}