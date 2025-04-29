import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <PageLayoutWithBreadcrumbs showBreadcrumbs={false}>{children}</PageLayoutWithBreadcrumbs>
}
