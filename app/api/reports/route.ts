import { NextResponse } from "next/server"
import type { SecurityReport } from "@/lib/agents"

// Mock database for reports
const mockReports: SecurityReport[] = [
  {
    id: "1",
    title: "Flash Loan Attack Analysis",
    description: "Detailed breakdown of the recent flash loan exploit affecting multiple DeFi protocols.",
    createdAt: new Date("2023-04-10"),
    type: "incident",
    threats: ["2"],
    content: `
# Flash Loan Attack Analysis

## Overview
On April 2, 2023, a sophisticated flash loan attack was executed against multiple DeFi protocols, resulting in approximately $3 million in losses.

## Technical Details
The attacker used a flash loan from Aave to manipulate price oracles used by several DEXs. By temporarily distorting asset prices, the attacker was able to execute profitable arbitrage trades at the expense of liquidity providers.

## Affected Protocols
- UniswapV2
- SushiSwap
- PancakeSwap

## Mitigation Strategies
1. Implement time-weighted average price (TWAP) oracles
2. Add circuit breakers for unusual price movements
3. Limit the impact of flash loans on price calculations

## Recommendations
All DeFi protocols should review their price oracle implementations and consider implementing the mitigation strategies outlined above.
    `,
    publishedUrl: "https://example.com/reports/flash-loan-attack",
  },
  {
    id: "2",
    title: "Reentrancy Vulnerability Report",
    description: "Analysis of reentrancy vulnerabilities found in popular smart contracts.",
    createdAt: new Date("2023-04-08"),
    type: "vulnerability",
    threats: ["1"],
    content: `
# Reentrancy Vulnerability Report

## Overview
A critical reentrancy vulnerability has been identified in several DeFi lending protocols that could allow attackers to drain funds.

## Technical Details
The vulnerability exists in the withdrawal functions where external calls are made before state updates, violating the checks-effects-interactions pattern.

## Vulnerable Code Pattern
\`\`\`solidity
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    
    // VULNERABLE: External call before state update
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
    
    // TOO LATE: State updated after external call
    balances[msg.sender] -= amount;
}
\`\`\`

## Secure Code Pattern
\`\`\`solidity
function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    
    // SECURE: State updated before external call
    balances[msg.sender] -= amount;
    
    // External call after state update
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed");
}
\`\`\`

## Affected Protocols
- LendingProtocolA
- DeFiPlatformB
- YieldFarmC

## Recommendations
1. Implement the checks-effects-interactions pattern
2. Use reentrancy guards
3. Consider using OpenZeppelin's ReentrancyGuard
    `,
    publishedUrl: "https://example.com/reports/reentrancy-vulnerability",
  },
]

export async function GET() {
  try {
    // In a real implementation, this would fetch from a database
    return NextResponse.json({ reports: mockReports })
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, type, threats, content } = body

    if (!title || !description || !type || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new report
    const newReport: SecurityReport = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date(),
      type: type as "incident" | "vulnerability" | "summary" | "analysis" | "guide" | "research",
      threats: threats || [],
      content,
    }

    // In a real implementation, this would save to a database
    // For now, we'll just return the new report

    return NextResponse.json({ report: newReport })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 })
  }
}
