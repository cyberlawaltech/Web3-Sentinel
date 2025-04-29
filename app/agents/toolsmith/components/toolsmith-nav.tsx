"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PenToolIcon as Tool, Settings, List, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export function ToolsmithNav() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/agents/toolsmith",
      icon: <List className="h-5 w-5" />,
    },
    {
      name: "Tools",
      href: "/agents/toolsmith/tools",
      icon: <Wrench className="h-5 w-5" />,
    },
    {
      name: "Evaluations",
      href: "/agents/toolsmith/evaluations",
      icon: <Tool className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/agents/toolsmith/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-6 text-emerald-400">Toolsmith Agent</h1>
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
