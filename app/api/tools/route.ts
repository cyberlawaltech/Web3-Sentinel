import { NextResponse } from "next/server"
import type { SecurityTool } from "@/lib/agents"

// Mock database for tools
const mockTools: SecurityTool[] = [
  {
    id: "1",
    name: "Slither",
    description: "Static analyzer for Solidity smart contracts that detects vulnerabilities and optimizations.",
    category: "scanner",
    tags: ["static-analysis", "solidity", "security"],
    githubUrl: "https://github.com/crytic/slither",
    isCustom: false,
    installCommand: "pip install slither-analyzer",
    documentation: "https://github.com/crytic/slither/wiki",
  },
  {
    id: "2",
    name: "MythX",
    description: "Security analysis platform for Ethereum smart contracts.",
    category: "analyzer",
    tags: ["smart-contracts", "ethereum", "security-analysis"],
    githubUrl: "https://github.com/ConsenSys/mythx-cli",
    isCustom: false,
    installCommand: "pip install mythx-cli",
    documentation: "https://docs.mythx.io/",
  },
  {
    id: "3",
    name: "Echidna",
    description: "Ethereum smart contract fuzzer for finding vulnerabilities through property-based testing.",
    category: "fuzzer",
    tags: ["fuzzing", "property-testing", "smart-contracts"],
    githubUrl: "https://github.com/crytic/echidna",
    isCustom: false,
    installCommand: "docker pull trailofbits/echidna",
    documentation: "https://github.com/crytic/echidna/wiki",
  },
  {
    id: "4",
    name: "Manticore",
    description: "Symbolic execution tool for analysis of smart contracts and binaries.",
    category: "analyzer",
    tags: ["symbolic-execution", "formal-verification", "smart-contracts"],
    githubUrl: "https://github.com/trailofbits/manticore",
    isCustom: false,
    installCommand: "pip install manticore",
    documentation: "https://github.com/trailofbits/manticore/wiki",
  },
  {
    id: "5",
    name: "DeFi Monitor",
    description: "Custom tool for monitoring DeFi protocols for unusual activity and potential exploits.",
    category: "monitor",
    tags: ["defi", "monitoring", "real-time"],
    githubUrl: "https://github.com/your-org/defi-monitor",
    isCustom: true,
    installCommand: "npm install @your-org/defi-monitor",
    documentation: "https://github.com/your-org/defi-monitor/README.md",
  },
  {
    id: "6",
    name: "Flash Loan Detector",
    description: "Detects and analyzes flash loan attacks across multiple DeFi protocols.",
    category: "analyzer",
    tags: ["flash-loans", "defi", "attack-detection"],
    githubUrl: "https://github.com/your-org/flash-loan-detector",
    isCustom: true,
    installCommand: "npm install @your-org/flash-loan-detector",
    documentation: "https://github.com/your-org/flash-loan-detector/README.md",
  },
]

export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    return NextResponse.json({ tools: mockTools })
  } catch (error) {
    console.error("Error fetching tools:", error)
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, category, tags, githubUrl, isCustom, installCommand, documentation } = body

    if (!name || !description || !category || !githubUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new tool
    const newTool: SecurityTool = {
      id: crypto.randomUUID(),
      name,
      description,
      category: category as "scanner" | "analyzer" | "monitor" | "fuzzer" | "other",
      tags: tags || [],
      githubUrl,
      isCustom: isCustom || false,
      installCommand,
      documentation,
    }

    // In a real implementation, this would save to a database
    // For now, we'll just return the new tool

    return NextResponse.json({ tool: newTool })
  } catch (error) {
    console.error("Error creating tool:", error)
    return NextResponse.json({ error: "Failed to create tool" }, { status: 500 })
  }
}
