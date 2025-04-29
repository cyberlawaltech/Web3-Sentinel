"use client"

import type React from "react"

import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  PenToolIcon as Tool,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  PlusCircle,
  Bot,
  BookOpen,
  Rss,
  ShieldAlert,
  Wrench,
  Hammer,
  Cog,
  AppWindow,
  MessageSquare,
  FileQuestion,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type Tab = "overview" | "threats" | "reports" | "explore" | "create" | "bots" | "resources" | "tools" | "settings"

interface DashboardSidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    explore: false,
    create: false,
    bots: false,
    resources: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div
      className={cn(
        "bg-gray-900 border-r border-gray-800 h-[calc(100vh-4rem)] transition-all duration-300 overflow-y-auto",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6">
          <nav className="space-y-1 px-2">
            <SidebarItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Security Threats"
              active={activeTab === "threats"}
              onClick={() => setActiveTab("threats")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports"
              active={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
              collapsed={collapsed}
            />

            {/* New Explore Section */}
            <div className="pt-2">
              <SidebarItem
                icon={<Compass className="h-5 w-5" />}
                label="Explore"
                active={activeTab === "explore"}
                onClick={() => {
                  setActiveTab("explore")
                  if (!collapsed) toggleSection("explore")
                }}
                collapsed={collapsed}
                hasSubmenu={!collapsed}
                expanded={expandedSections.explore}
                onExpandClick={() => toggleSection("explore")}
              />

              {!collapsed && expandedSections.explore && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-800 pl-2">
                  <SubMenuItem icon={<Rss className="h-4 w-4" />} label="Live Feed" href="/explore/live-feed" />
                  <SubMenuItem icon={<ShieldAlert className="h-4 w-4" />} label="Exploits" href="/explore/exploits" />
                  <SubMenuItem icon={<Wrench className="h-4 w-4" />} label="Tools" href="/explore/tools" />
                </div>
              )}
            </div>

            {/* New Create Section */}
            <div className="pt-2">
              <SidebarItem
                icon={<PlusCircle className="h-5 w-5" />}
                label="Create"
                active={activeTab === "create"}
                onClick={() => {
                  setActiveTab("create")
                  if (!collapsed) toggleSection("create")
                }}
                collapsed={collapsed}
                hasSubmenu={!collapsed}
                expanded={expandedSections.create}
                onExpandClick={() => toggleSection("create")}
              />

              {!collapsed && expandedSections.create && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-800 pl-2">
                  <SubMenuItem icon={<Hammer className="h-4 w-4" />} label="Tool Builder" href="/create/tool-builder" />
                  <SubMenuItem icon={<Cog className="h-4 w-4" />} label="Custom Tools" href="/create/custom-tools" />
                </div>
              )}
            </div>

            {/* New Bots and Apps Section */}
            <div className="pt-2">
              <SidebarItem
                icon={<Bot className="h-5 w-5" />}
                label="Bots and Apps"
                active={activeTab === "bots"}
                onClick={() => {
                  setActiveTab("bots")
                  if (!collapsed) toggleSection("bots")
                }}
                collapsed={collapsed}
                hasSubmenu={!collapsed}
                expanded={expandedSections.bots}
                onExpandClick={() => toggleSection("bots")}
              />

              {!collapsed && expandedSections.bots && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-800 pl-2">
                  <SubMenuItem
                    icon={<AppWindow className="h-4 w-4" />}
                    label="App-Centric Features"
                    href="/bots/app-features"
                  />
                  <SubMenuItem
                    icon={<MessageSquare className="h-4 w-4" />}
                    label="Specialized Interactions"
                    href="/bots/interactions"
                  />
                </div>
              )}
            </div>

            {/* New Resources Section */}
            <div className="pt-2">
              <SidebarItem
                icon={<BookOpen className="h-5 w-5" />}
                label="Resources"
                active={activeTab === "resources"}
                onClick={() => {
                  setActiveTab("resources")
                  if (!collapsed) toggleSection("resources")
                }}
                collapsed={collapsed}
                hasSubmenu={!collapsed}
                expanded={expandedSections.resources}
                onExpandClick={() => toggleSection("resources")}
              />

              {!collapsed && expandedSections.resources && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-gray-800 pl-2">
                  <SubMenuItem icon={<Rss className="h-4 w-4" />} label="Blog" href="/resources/blog" />
                  <SubMenuItem icon={<FileText className="h-4 w-4" />} label="Documentation" href="/resources/docs" />
                  <SubMenuItem icon={<FileQuestion className="h-4 w-4" />} label="FAQs" href="/resources/faqs" />
                </div>
              )}
            </div>

            <SidebarItem
              icon={<Tool className="h-5 w-5" />}
              label="Tools"
              active={activeTab === "tools"}
              onClick={() => setActiveTab("tools")}
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
              collapsed={collapsed}
            />
          </nav>
        </div>
        <div className="p-4 border-t border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex justify-center"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
  collapsed: boolean
  hasSubmenu?: boolean
  expanded?: boolean
  onExpandClick?: () => void
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
  collapsed,
  hasSubmenu = false,
  expanded = false,
  onExpandClick,
}: SidebarItemProps) {
  return (
    <div className="flex items-center">
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          active ? "bg-emerald-900 text-emerald-200 hover:bg-emerald-800" : "text-gray-400 hover:text-white",
          collapsed ? "px-3" : "px-3",
        )}
        onClick={onClick}
      >
        {icon}
        {!collapsed && <span className="ml-3 flex-1 text-left">{label}</span>}
        {!collapsed && hasSubmenu && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              onExpandClick && onExpandClick()
            }}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        )}
      </Button>
    </div>
  )
}

interface SubMenuItemProps {
  icon: React.ReactNode
  label: string
  href: string
}

function SubMenuItem({ icon, label, href }: SubMenuItemProps) {
  return (
    <Link href={href} className="block">
      <Button
        variant="ghost"
        className="w-full justify-start py-1.5 h-auto text-sm text-gray-400 hover:text-white hover:bg-gray-800"
      >
        {icon}
        <span className="ml-2">{label}</span>
      </Button>
    </Link>
  )
}
