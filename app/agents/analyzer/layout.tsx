import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface AnalyzerLayoutProps {
  children: ReactNode
}

export default function AnalyzerLayout({ children }: AnalyzerLayoutProps) {
  return <PageLayoutWithBreadcrumbs>{children}</PageLayoutWithBreadcrumbs>
}
