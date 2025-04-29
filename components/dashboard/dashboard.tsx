"use client"

import { useState } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { AgentOverview } from "./agent-overview"
import { SecurityThreats } from "./security-threats"
import { Reports } from "./reports"
import { Tools } from "./tools"
import { Settings } from "./settings"

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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 pt-20">
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
