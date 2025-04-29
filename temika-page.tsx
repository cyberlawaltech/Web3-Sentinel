"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Bot, LogOut, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function TemikaPage() {
  const router = useRouter()
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const [gridItems, setGridItems] = useState<{ row: number; col: number }[]>([])
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set())

  // Calculate grid dimensions based on container size and desired cell size
  useEffect(() => {
    const calculateGrid = () => {
      if (!gridContainerRef.current) return

      const containerWidth = gridContainerRef.current.clientWidth
      const containerHeight = gridContainerRef.current.clientHeight
      const cellSize = 24 // Size of each grid cell including gap

      const cols = Math.floor(containerWidth / cellSize)
      const rows = Math.floor(containerHeight / cellSize)

      const newGridItems = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newGridItems.push({ row, col })
        }
      }

      setGridItems(newGridItems)
    }

    calculateGrid()
    window.addEventListener("resize", calculateGrid)

    return () => {
      window.removeEventListener("resize", calculateGrid)
    }
  }, [])

  // Handle mouse movement over the grid
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current) return

    const rect = gridContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
    triggerRippleEffect(x, y)
  }

  // Create ripple effect from mouse position
  const triggerRippleEffect = (x: number, y: number) => {
    if (!gridContainerRef.current) return

    const cellSize = 24
    const centerCol = Math.floor(x / cellSize)
    const centerRow = Math.floor(y / cellSize)

    const newAnimatingCells = new Set<string>()

    // Calculate which cells to animate based on distance from mouse
    gridItems.forEach(({ row, col }) => {
      const distance = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2))
      if (distance < 8) {
        // Limit the ripple radius
        const delay = distance * 50 // Stagger the animation based on distance
        const cellId = `${row}-${col}`

        newAnimatingCells.add(cellId)

        // Remove the animation class after the animation completes
        setTimeout(() => {
          setAnimatingCells((prev) => {
            const updated = new Set(prev)
            updated.delete(cellId)
            return updated
          })
        }, 500 + delay) // Animation duration + delay
      }
    })

    setAnimatingCells((prev) => new Set([...prev, ...newAnimatingCells]))
  }

  // Handle exit button click
  const handleExit = () => {
    router.push("/") // Navigate back to home page
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Interactive Grid Background (80% height) */}
      <div ref={gridContainerRef} className="flex-grow relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,20px)] gap-1 p-1">
          {gridItems.map(({ row, col }) => {
            const cellId = `${row}-${col}`
            const isAnimating = animatingCells.has(cellId)
            return (
              <div
                key={cellId}
                className={`w-5 h-5 rounded transition-all duration-300 ${
                  isAnimating ? "bg-pink-500 scale-110 z-10" : "bg-gray-800"
                }`}
                style={{
                  transitionDelay: isAnimating
                    ? `${
                        Math.sqrt(
                          Math.pow(row - (mousePosition?.y || 0) / 24, 2) +
                            Math.pow(col - (mousePosition?.x || 0) / 24, 2),
                        ) * 30
                      }ms`
                    : "0ms",
                }}
              />
            )
          })}
        </div>

        {/* Temika Title/Branding */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 pointer-events-none">
          <h1 className="text-6xl font-bold text-white mb-4">Temika</h1>
          <p className="text-xl text-gray-300">Your AI Assistant</p>
        </div>
      </div>

      {/* Chat Interface (20% height) */}
      <div className="h-[20vh] bg-gray-800 p-6 flex items-center justify-center">
        <div className="w-full max-w-4xl flex items-center gap-4">
          <Button size="icon" variant="ghost" className="rounded-full bg-gray-700 hover:bg-gray-600">
            <User className="h-5 w-5 text-gray-300" />
          </Button>

          <Input
            placeholder="Chat with Temika..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-pink-500"
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
            className="rounded-full bg-gray-700 hover:bg-red-600 ml-2"
            onClick={handleExit}
          >
            <LogOut className="h-5 w-5 text-gray-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
