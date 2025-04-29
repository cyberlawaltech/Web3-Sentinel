import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/footer"
import { Breadcrumb } from "@/components/breadcrumb"

interface PageLayoutWithBreadcrumbsProps {
  children: ReactNode
  title?: string
  description?: string
  showBreadcrumbs?: boolean
}

export function PageLayoutWithBreadcrumbs({
  children,
  title,
  description,
  showBreadcrumbs = true,
}: PageLayoutWithBreadcrumbsProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        {showBreadcrumbs && (
          <div className="mb-4">
            <Breadcrumb />
          </div>
        )}

        {(title || description) && (
          <div className="mb-6">
            {title && <h1 className="text-3xl font-bold mb-2">{title}</h1>}
            {description && <p className="text-gray-400">{description}</p>}
          </div>
        )}

        {children}
      </main>
      <Footer />
    </div>
  )
}
