"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TemikaFAB() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Handle scroll behavior
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

  // Initial attention-grabbing pulse animation
  useEffect(() => {
    let resetTimer: NodeJS.Timeout

    // Initial pulse after 2 seconds
    const initialTimer = setTimeout(() => {
      setIsPulsing(true)

      resetTimer = setTimeout(() => {
        setIsPulsing(false)
      }, 1500)
    }, 2000)

    // Repeat pulse every 30 seconds
    const intervalTimer = setInterval(() => {
      setIsPulsing(true)

      setTimeout(() => {
        setIsPulsing(false)
      }, 1500)
    }, 30000)

    // Cleanup function
    return () => {
      clearTimeout(initialTimer)
      clearTimeout(resetTimer)
      clearInterval(intervalTimer)
    }
  }, [])

  const fabButton = (
    <motion.button
      className={`fixed z-50 flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
        isMobile ? "bottom-4 right-4" : "bottom-6 right-6"
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        boxShadow:
          isHovered || isPulsing
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
      <div className={`relative ${isMobile ? "p-2" : "p-3"}`}>
        {isMobile ? <MessageSquare className="h-5 w-5" /> : <Sparkles className="h-6 w-6" />}

        {/* Ripple effect */}
        <AnimatePresence>
          {(isHovered || isPulsing) && (
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-emerald-400"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: isPulsing ? 1 : 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )

  return (
    <AnimatePresence>
      {isVisible &&
        (isMobile ? (
          fabButton
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>{fabButton}</TooltipTrigger>
              <TooltipContent side="left" className="bg-gray-800 text-white border-gray-700">
                <p>Chat with Temika AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
    </AnimatePresence>
  )
}
