"use client"

import type React from "react"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbProps {
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeItemClasses?: string
  inactiveItemClasses?: string
}

export function Breadcrumb({
  homeElement = <Home className="h-4 w-4" />,
  separator = <ChevronRight className="h-4 w-4" />,
  containerClasses = "flex py-3",
  listClasses = "flex items-center space-x-2 text-sm",
  activeItemClasses = "text-emerald-400",
  inactiveItemClasses = "text-gray-400 hover:text-white transition-colors",
}: BreadcrumbProps) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  // Map of path segments to human-readable names
  const pathMap: Record<string, string> = {
    agents: "Agents",
    dashboard: "Dashboard",
    scraper: "Scraper Agent",
    researcher: "Researcher Agent",
    analyzer: "Analyzer Agent",
    architect: "Solution Architect",
    toolsmith: "Toolsmith Agent",
    github: "GitHub Manager",
    configuration: "Configuration",
    details: "Details",
    active: "Active",
    reports: "Reports",
    vulnerabilities: "Vulnerabilities",
    settings: "Settings",
    tools: "Tools",
    projects: "Projects",
    repositories: "Repositories",
  }

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        <li className={inactiveItemClasses}>
          <Link href="/" className="flex items-center">
            {homeElement}
          </Link>
        </li>

        {pathNames.length > 0 && <li className="flex items-center text-gray-500">{separator}</li>}

        {pathNames.map((name, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`
          const isLast = index === pathNames.length - 1

          // Handle dynamic routes with [id]
          const displayName =
            name.startsWith("[") && name.endsWith("]")
              ? "Details"
              : pathMap[name] || name.charAt(0).toUpperCase() + name.slice(1)

          return (
            <Fragment key={routeTo}>
              <li className={isLast ? activeItemClasses : inactiveItemClasses}>
                {isLast ? <span>{displayName}</span> : <Link href={routeTo}>{displayName}</Link>}
              </li>

              {!isLast && <li className="flex items-center text-gray-500">{separator}</li>}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
