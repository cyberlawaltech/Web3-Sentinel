"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Bot, LogOut, Settings, User, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import type { JSX } from "react/jsx-runtime"

// Custom hook for the interactive grid
function useInteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [cells, setCells] = useState<JSX.Element[]>([])
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const animatingCells = useRef(new Set<string>())
  const requestRef = useRef<number>()

  // Calculate and render grid cells
  useEffect(() => {
    const calculateGrid = () => {
      if (!gridRef.current) return

      const container = gridRef.current
      const cellSize = 24
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
              className="w-5 h-5 rounded bg-gray-800 transition-all duration-300"
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

  // Handle mouse movement and animation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return

    const rect = gridRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePos({ x, y })

    // Clear previous animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }

    // Schedule animation frame
    requestRef.current = requestAnimationFrame(() => {
      const cellSize = 24
      const centerCol = Math.floor(x / cellSize)
      const centerRow = Math.floor(y / cellSize)
      const maxDistance = 8 // Maximum distance for the ripple effect

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

  return { gridRef, cells, handleMouseMove }
}

export default function TemikaPage() {
  const router = useRouter()
  const { gridRef, cells, handleMouseMove } = useInteractiveGrid()
  const [message, setMessage] = useState("")

  // Handle exit button click
  const handleExit = () => {
    router.push("/") // Navigate back to home page
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Interactive Grid Background (80% height) */}
      <div className="flex-grow relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div ref={gridRef} className="absolute inset-0 grid grid-cols-[repeat(auto-fill,20px)] gap-1 p-1">
          {cells}
        </div>

        {/* Temika Title/Branding */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-12 w-12 text-pink-500 mr-3" />
            <h1 className="text-6xl font-bold text-white">Temika</h1>
          </div>
          <p className="text-xl text-gray-300">Your AI Assistant</p>
        </div>
      </div>

      {/* Chat Interface (20% height) */}
      <div className="h-[20vh] bg-gray-800 p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl flex flex-wrap items-center gap-4">
          <Button size="icon" variant="ghost" className="rounded-full bg-gray-700 hover:bg-gray-600">
            <User className="h-5 w-5 text-gray-300" />
          </Button>

          <Input
            placeholder="Chat with Temika..."
            className="flex-1 min-w-[200px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-pink-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Button size="icon" variant="ghost" className="rounded-full bg-pink-600 hover:bg-pink-700">
            <Bot className="h-5 w-5 text-white" />
          </Button>

          <Button size="icon" variant="ghost" className="rounded-full bg-gray-700 hover:bg-gray-600">
            <Settings className="h-5 w-5 text-gray-300" />
          </Button>

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
