"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

export function TemikaFAB() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Handle scroll behavior - hide FAB when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Navigate to Temika page
  const handleClick = () => {
    router.push("/temika")
  }

  // Pulse animation to draw attention when the page first loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHovered(true)

      const resetTimer = setTimeout(() => {
        setIsHovered(false)
      }, 1000)

      return () => clearTimeout(resetTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            boxShadow: isHovered
              ? "0 0 0 4px rgba(16, 185, 129, 0.3)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Open Temika AI Assistant"
        >
          <div className="relative p-3">
            <Sparkles className="h-6 w-6" />

            {/* Ripple effect */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-emerald-400"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: 0 }}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
