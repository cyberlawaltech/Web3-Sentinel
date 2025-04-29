import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface ArchitectLayoutProps {
  children: ReactNode
}

export default function ArchitectLayout({ children }: ArchitectLayoutProps) {
  return <PageLayoutWithBreadcrumbs>{children}</PageLayoutWithBreadcrumbs>
}
