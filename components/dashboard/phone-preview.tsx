"use client"

import { motion } from "framer-motion"
import { SummaryCards } from "./summary-cards"

export function PhonePreview() {
  return (
    <div className="flex justify-center items-center py-16 relative">

      {/* Glow */}
      <div className="absolute w-[700px] h-[200px] bg-indigo-500/20 blur-[120px] rounded-full" />

      {/* PHONE CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          delay: 1,              // 👈 phone starts after 1 sec
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative w-[500px] sm:w-[750px] md:w-[400px]"
      >

        {/* Phone Image */}
        <img
          src="/images/phone2.jpg"
          alt="phone"
          className="w-full scale-[1.2] sm:scale-[1.4] md:scale-[1.6] relative z-10"
        />

        {/* SCREEN */}
        <div className="absolute top-[18%] left-[50%] translate-x-[-50%] w-[500px] h-[60%] flex z-20">

          {/* CARDS (delayed AFTER phone) */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  delay: 2.8,     // 👈 appears after phone animation
                  staggerChildren: 0.2,
                },
              },
            }}
            className="w-full"
          >
            <SummaryCards />
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}