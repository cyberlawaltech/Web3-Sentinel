import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          {description && <p className="text-gray-400 mb-8">{description}</p>}
          <div className="prose prose-invert max-w-none">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
