"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenToolIcon as Tool, Download, Github, Code } from "lucide-react"

export function Tools() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Security Tools</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Code className="h-4 w-4 mr-2" />
          Create New Tool
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="scanners">Scanners</TabsTrigger>
          <TabsTrigger value="analyzers">Analyzers</TabsTrigger>
          <TabsTrigger value="monitors">Monitors</TabsTrigger>
          <TabsTrigger value="custom">Custom Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="scanners">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTools
              .filter((tool) => tool.category === "scanner")
              .map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
          </div>
        </TabsContent>
        {/* Other tabs would follow the same pattern */}
      </Tabs>
    </div>
  )
}

interface ToolCardProps {
  tool: {
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    githubUrl: string
    isCustom: boolean
  }
}

function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-md bg-gray-800">
              <Tool className="h-5 w-5 text-emerald-400" />
            </div>
            <CardTitle className="text-lg text-white">{tool.name}</CardTitle>
          </div>
          {tool.isCustom && <Badge className="bg-purple-900 text-purple-300 border-purple-700 border">Custom</Badge>}
        </div>
        <CardDescription className="text-gray-400">
          {tool.category.charAt(0).toUpperCase() + tool.category.slice(1)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{tool.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="border-gray-700 text-gray-400">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-800 pt-4 flex justify-between">
        <Button size="sm" variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-950">
          <Download className="h-4 w-4 mr-2" />
          Install
        </Button>
        <Button size="sm" variant="ghost" as="a" href={tool.githubUrl} target="_blank" rel="noopener noreferrer">
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </CardFooter>
    </Card>
  )
}

const allTools = [
  {
    id: "1",
    name: "Slither",
    description: "Static analyzer for Solidity smart contracts that detects vulnerabilities and optimizations.",
    category: "scanner",
    tags: ["static-analysis", "solidity", "security"],
    githubUrl: "https://github.com/crytic/slither",
    isCustom: false,
  },
  {
    id: "2",
    name: "MythX",
    description: "Security analysis platform for Ethereum smart contracts.",
    category: "analyzer",
    tags: ["smart-contracts", "ethereum", "security-analysis"],
    githubUrl: "https://github.com/ConsenSys/mythx-cli",
    isCustom: false,
  },
  {
    id: "3",
    name: "Echidna",
    description: "Ethereum smart contract fuzzer for finding vulnerabilities through property-based testing.",
    category: "fuzzer",
    tags: ["fuzzing", "property-testing", "smart-contracts"],
    githubUrl: "https://github.com/crytic/echidna",
    isCustom: false,
  },
  {
    id: "4",
    name: "Manticore",
    description: "Symbolic execution tool for analysis of smart contracts and binaries.",
    category: "analyzer",
    tags: ["symbolic-execution", "formal-verification", "smart-contracts"],
    githubUrl: "https://github.com/trailofbits/manticore",
    isCustom: false,
  },
  {
    id: "5",
    name: "DeFi Monitor",
    description: "Custom tool for monitoring DeFi protocols for unusual activity and potential exploits.",
    category: "monitor",
    tags: ["defi", "monitoring", "real-time"],
    githubUrl: "#",
    isCustom: true,
  },
  {
    id: "6",
    name: "Flash Loan Detector",
    description: "Detects and analyzes flash loan attacks across multiple DeFi protocols.",
    category: "analyzer",
    tags: ["flash-loans", "defi", "attack-detection"],
    githubUrl: "#",
    isCustom: true,
  },
]
