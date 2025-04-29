import { Dashboard } from "@/components/dashboard/dashboard"

export default function DashboardPage({ searchParams }: { searchParams: { tab?: string } }) {
  return <Dashboard initialTab={searchParams.tab} />
}
