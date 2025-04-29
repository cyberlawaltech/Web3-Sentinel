import type { ReactNode } from "react"
import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"

interface ToolsmithLayoutProps {
  children: ReactNode
}

export default function ToolsmithLayout({ children }: ToolsmithLayoutProps) {
  return <PageLayoutWithBreadcrumbs>{children}</PageLayoutWithBreadcrumbs>
}
