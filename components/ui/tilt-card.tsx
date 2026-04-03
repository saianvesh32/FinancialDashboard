"use client"

import { useRef, useState, type ReactNode, type MouseEvent } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  glareEnabled?: boolean
}

export function TiltCard({ children, className, glareEnabled = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])

  const glareX = useTransform(springX, [0, 1], ["-100%", "200%"])
  const glareY = useTransform(springY, [0, 1], ["-100%", "200%"])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const xPos = (e.clientX - rect.left) / rect.width
    const yPos = (e.clientY - rect.top) / rect.height

    x.set(xPos)
    y.set(yPos)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      <div style={{ transform: "translateZ(0)" }}>
        {children}
      </div>
      
      {/* Glare effect */}
      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
          style={{
            opacity: isHovering ? 0.15 : 0,
          }}
        >
          <motion.div
            className="absolute h-[200%] w-[200%] bg-gradient-to-br from-transparent via-white to-transparent"
            style={{
              left: glareX,
              top: glareY,
              transform: "rotate(35deg)",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
