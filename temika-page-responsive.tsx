"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Bot, LogOut, Settings, User, Sparkles, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Custom hook for the interactive grid
function useInteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [cells, setCells] = useState<JSX.Element[]>([])
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animatingCells = useRef(new Set<string>())
  const requestRef = useRef<number>()
  const isMobile = useRef(false)

  // Check if device is mobile
  useEffect(() => {
    isMobile.current = window.innerWidth < 768
  }, [])

  // Calculate and render grid cells
  useEffect(() => {
    const calculateGrid = () => {
      if (!gridRef.current) return

      const container = gridRef.current
      // Use larger cell size on mobile for better performance
      const cellSize = isMobile.current ? 32 : 24
      const cols = Math.floor(container.clientWidth / cellSize)
      const rows = Math.floor(container.clientHeight / cellSize)

      const newCells: JSX.Element[] = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cellId = `${row}-${col}`
          newCells.push(
            <div
              key={cellId}
              data-id={cellId}
              data-row={row}
              data-col={col}
              className="w-5 h-5 md:w-5 md:h-5 rounded bg-gray-800 transition-all duration-300"
            />,
          )
        }
      }

      setCells(newCells)
    }

    calculateGrid()
    window.addEventListener("resize", calculateGrid)

    return () => {
      window.removeEventListener("resize", calculateGrid)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Handle mouse/touch movement and animation
  const handleInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    let x, y

    // Handle both mouse and touch events
    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    setMousePos({ x, y })

    // Clear previous animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }

    // Schedule animation frame
    requestRef.current = requestAnimationFrame(() => {
      const cellSize = isMobile.current ? 32 : 24
      const centerCol = Math.floor(x / cellSize)
      const centerRow = Math.floor(y / cellSize)
      // Use smaller radius on mobile for better performance
      const maxDistance = isMobile.current ? 5 : 8

      // Reset previously animating cells
      animatingCells.current.forEach((cellId) => {
        const cell = gridRef.current?.querySelector(`[data-id="${cellId}"]`) as HTMLElement
        if (cell) {
          cell.classList.remove("bg-pink-500", "scale-110", "z-10")
        }
      })

      animatingCells.current.clear()

      // Find and animate cells within the ripple radius
      const cells = gridRef.current.querySelectorAll("[data-row][data-col]")
      cells.forEach((cellElement) => {
        const cell = cellElement as HTMLElement
        const row = Number.parseInt(cell.dataset.row || "0")
        const col = Number.parseInt(cell.dataset.col || "0")

        const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2))

        if (distance < maxDistance) {
          const cellId = cell.dataset.id || ""
          const delay = distance * 50 // ms

          // Add to tracking set
          animatingCells.current.add(cellId)

          // Apply animation with delay
          setTimeout(() => {
            cell.classList.add("bg-pink-500", "scale-110", "z-10")

            // Remove animation after it completes
            setTimeout(() => {
              if (cell) {
                cell.classList.remove("bg-pink-500", "scale-110", "z-10")
                animatingCells.current.delete(cellId)
              }
            }, 500) // Animation duration
          }, delay)
        }
      })
    })
  }

  return {
    gridRef,
    cells,
    handleMouseMove: handleInteraction,
    handleTouchMove: handleInteraction,
  }
}

export default function TemikaPage() {
  const router = useRouter()
  const { gridRef, cells, handleMouseMove, handleTouchMove } = useInteractiveGrid()
  const [message, setMessage] = useState("")
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

  // Handle exit button click
  const handleExit = () => {
    router.push("/") // Navigate back to home page
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Interactive Grid Background (80% height) */}
      <div className="flex-grow relative overflow-hidden" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
        <div
          ref={gridRef}
          className="absolute inset-0 grid grid-cols-[repeat(auto-fill,20px)] md:grid-cols-[repeat(auto-fill,20px)] gap-1 p-1"
        >
          {cells}
        </div>

        {/* Temika Title/Branding */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 md:h-12 md:w-12 text-pink-500 mr-2 md:mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">Temika</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-300">Your AI Assistant</p>
        </div>
      </div>

      {/* Chat Interface (20% height) */}
      <div className="h-[20vh] bg-gray-800 p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl flex items-center gap-2 md:gap-4">
          {!isMobile && (
            <Button size="icon" variant="ghost" className="rounded-full bg-gray-700 hover:bg-gray-600">
              <User className="h-5 w-5 text-gray-300" />
            </Button>
          )}

          <Input
            placeholder="Chat with Temika..."
            className="flex-1 min-w-[120px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-pink-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button size="icon" variant="ghost" className="rounded-full bg-pink-600 hover:bg-pink-700">
            {isMobile ? <Send className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
          </Button>

          {!isMobile && (
            <Button size="icon" variant="ghost" className="rounded-full bg-gray-700 hover:bg-gray-600">
              <Settings className="h-5 w-5 text-gray-300" />
            </Button>
          )}

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-gray-700 hover:bg-red-600"
            onClick={handleExit}
          >
            <LogOut className="h-5 w-5 text-gray-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
