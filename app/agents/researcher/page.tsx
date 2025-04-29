import { redirect } from "next/navigation"

export default function ResearcherIndexPage() {
  redirect("/agents/researcher/configuration")
  return null
}
