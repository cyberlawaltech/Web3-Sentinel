"use client"

import dynamic from "next/dynamic"

// Dynamically import the TemikaPage component with no SSR
const TemikaPage = dynamic(() => import("@/temika-page-responsive"), { ssr: false })

export default function TemikaClientWrapper() {
  return <TemikaPage />
}
