"use client"

import { useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { AgentOverview } from "./agent-overview"
import { SecurityThreats } from "./security-threats"
import { Reports } from "./reports"
import { Tools } from "./tools"
import { Settings } from "./settings"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export type Tab =
  | "overview"
  | "threats"
  | "reports"
  | "explore"
  | "create"
  | "bots"
  | "resources"
  | "tools"
  | "settings"

interface DashboardProps {
  initialTab?: string
}

export function Dashboard({ initialTab }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>(
    initialTab &&
      ["overview", "threats", "reports", "tools", "settings", "explore", "create", "bots", "resources"].includes(
        initialTab,
      )
      ? (initialTab as Tab)
      : "overview",
  )

  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader onOpenSidebar={() => setMobileOpen(true)} />

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Sidebar menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-white">Menu</div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <DashboardSidebar
              activeTab={activeTab}
              setActiveTab={(t) => {
                setActiveTab(t)
                setMobileOpen(false)
              }}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <main className="flex-1 p-4 sm:p-6 pt-20">
          {activeTab === "overview" && <AgentOverview />}
          {activeTab === "threats" && <SecurityThreats />}
          {activeTab === "reports" && <Reports />}
          {activeTab === "tools" && <Tools />}
          {activeTab === "settings" && <Settings />}
          {activeTab === "explore" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">Explore</h1>
              <p className="text-gray-400">Navigate to a specific section using the sidebar.</p>
            </div>
          )}
          {activeTab === "create" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">Create</h1>
              <p className="text-gray-400">Navigate to a specific section using the sidebar.</p>
            </div>
          )}
          {activeTab === "bots" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">Bots and Apps</h1>
              <p className="text-gray-400">Navigate to a specific section using the sidebar.</p>
            </div>
          )}
          {activeTab === "resources" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">Resources</h1>
              <p className="text-gray-400">Navigate to a specific section using the sidebar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
