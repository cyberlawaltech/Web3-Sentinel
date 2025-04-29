import { redirect } from "next/navigation"

export default function ScraperIndexPage() {
  redirect("/agents/scraper/configuration")
  return null
}
