import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface ResearcherLayoutProps {
  children: ReactNode
}

export default function ResearcherLayout({ children }: ResearcherLayoutProps) {
  return <PageLayoutWithBreadcrumbs>{children}</PageLayoutWithBreadcrumbs>
}
