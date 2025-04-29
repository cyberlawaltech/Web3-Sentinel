import { NextResponse } from "next/server"
import type { SecurityThreat } from "@/lib/agents"

// Mock database for threats
const mockThreats: SecurityThreat[] = [
  {
    id: "1",
    title: "Reentrancy Vulnerability in DeFi Protocol",
    description:
      "A critical reentrancy vulnerability was discovered in a popular DeFi lending protocol that could allow attackers to drain funds.",
    severity: "critical",
    category: "Smart Contract",
    source: "Security Blog",
    discoveredAt: new Date("2023-04-01"),
    status: "new",
    details: {
      affectedContracts: ["LendingPool.sol", "FlashLoan.sol"],
      exploitPotential: "High",
      technicalDetails:
        "The vulnerability exists in the _withdraw function where external calls are made before state updates.",
    },
  },
  {
    id: "2",
    title: "Flash Loan Attack Vector Identified",
    description: "A potential flash loan attack vector has been identified affecting multiple decentralized exchanges.",
    severity: "high",
    category: "DeFi",
    source: "Twitter",
    discoveredAt: new Date("2023-04-02"),
    status: "analyzing",
    details: {
      affectedProtocols: ["UniswapV2", "SushiSwap"],
      exploitPotential: "Medium",
      technicalDetails: "The attack vector involves manipulating price oracles through flash loans.",
    },
  },
  // Add more mock threats here
]

export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    return NextResponse.json({ threats: mockThreats })
  } catch (error) {
    console.error("Error fetching threats:", error)
    return NextResponse.json({ error: "Failed to fetch threats" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, severity, category, source } = body

    if (!title || !description || !severity || !category || !source) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new threat
    const newThreat: SecurityThreat = {
      id: crypto.randomUUID(),
      title,
      description,
      severity: severity as "critical" | "high" | "medium" | "low",
      category,
      source,
      discoveredAt: new Date(),
      status: "new",
    }

    // In a real implementation, this would save to a database
    // For now, we'll just return the new threat

    return NextResponse.json({ threat: newThreat })
  } catch (error) {
    console.error("Error creating threat:", error)
    return NextResponse.json({ error: "Failed to create threat" }, { status: 500 })
  }
}
