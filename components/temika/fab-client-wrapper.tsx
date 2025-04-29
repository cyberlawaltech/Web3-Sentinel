"use client"

import dynamic from "next/dynamic"

// Dynamically import the FAB component with no SSR
const TemikaFAB = dynamic(() => import("@/components/temika-fab-responsive").then((mod) => mod.TemikaFAB), {
  ssr: false,
})

export function TemikaFABWrapper() {
  return <TemikaFAB />
}
