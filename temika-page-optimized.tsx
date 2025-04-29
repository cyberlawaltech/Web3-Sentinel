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
  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 })
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  // Calculate grid dimensions based on container size
  useEffect(() => {
    const calculateGrid = () => {
      if (!gridContainerRef.current) return

      const containerWidth = gridContainerRef.current.clientWidth
      const containerHeight = gridContainerRef.current.clientHeight
      const cellSize = 24 // Size of each grid cell including gap

      const cols = Math.floor(containerWidth / cellSize)
      const rows = Math.floor(containerHeight / cellSize)

      setGridDimensions({ rows, cols })
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
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Generate grid cells
  const renderGrid = () => {
    const cells = []
    const { rows, cols } = gridDimensions

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push(
          <div
            key={`${row}-${col}`}
            className="w-5 h-5 rounded bg-gray-800 transition-all duration-300 hover:bg-pink-500 hover:scale-110"
            style={
              {
                // Use CSS variables to calculate distance from mouse in the browser
                "--mouse-x": `${mousePosition.x}px`,
                "--mouse-y": `${mousePosition.y}px`,
                "--cell-x": `${col * 24 + 12}px`,
                "--cell-y": `${row * 24 + 12}px`,
                // Calculate distance and use it for animation delay
                "--distance": `calc(sqrt(pow(var(--mouse-x) - var(--cell-x), 2) + pow(var(--mouse-y) - var(--cell-y), 2)) / 30)`,
                animationDelay: `calc(var(--distance) * 1ms)`,
              } as React.CSSProperties
            }
          />,
        )
      }
    }

    return cells
  }

  // Handle exit button click
  const handleExit = () => {
    router.push("/") // Navigate back to home page
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Interactive Grid Background (80% height) */}
      <div ref={gridContainerRef} className="flex-grow relative overflow-hidden" onMouseMove={handleMouseMove}>
        <div
          className="absolute inset-0 grid grid-cols-[repeat(auto-fill,20px)] gap-1 p-1"
          style={
            {
              // Set CSS variables at the container level
              "--mouse-x": `${mousePosition.x}px`,
              "--mouse-y": `${mousePosition.y}px`,
            } as React.CSSProperties
          }
        >
          {renderGrid()}
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
