import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface ScraperLayoutProps {
  children: ReactNode
}

export default function ScraperLayout({ children }: ScraperLayoutProps) {
  return <PageLayoutWithBreadcrumbs>{children}</PageLayoutWithBreadcrumbs>
}
