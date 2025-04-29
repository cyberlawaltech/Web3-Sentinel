"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Settings, Play } from "lucide-react"
import { cn } from "@/lib/utils"

export function ScraperNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Configuration",
      href: "/agents/scraper/configuration",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Details",
      href: "/agents/scraper/details",
      icon: <Search className="h-5 w-5" />,
    },
    {
      name: "Active Scrapers",
      href: "/agents/scraper/active",
      icon: <Play className="h-5 w-5" />,
    },
  ]

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Scraper Agent</h1>
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md transition-all",
              pathname === item.href ? "bg-emerald-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
            )}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
