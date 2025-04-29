import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Github, ExternalLink, Star } from "lucide-react"

// Define the tools data outside the component
const tools = [
  {
    name: "Slither",
    description: "Static analysis framework for Solidity, detecting vulnerabilities and optimizing code.",
    category: "Static Analysis",
    tags: ["Solidity", "Security", "CLI"],
    stars: 3200,
    githubUrl: "https://github.com/crytic/slither",
    downloadUrl: "https://github.com/crytic/slither/releases",
    documentation: "https://github.com/crytic/slither/wiki",
  },
  {
    name: "Mythril",
    description: "Security analysis tool for EVM bytecode using symbolic execution and taint analysis.",
    category: "Symbolic Execution",
    tags: ["EVM", "Bytecode", "Formal Verification"],
    stars: 2800,
    githubUrl: "https://github.com/ConsenSys/mythril",
    downloadUrl: "https://github.com/ConsenSys/mythril/releases",
    documentation: "https://mythril-classic.readthedocs.io/",
  },
  {
    name: "Echidna",
    description: "Fuzzing/property-based testing framework for Ethereum smart contracts.",
    category: "Fuzzing",
    tags: ["Property Testing", "Solidity", "EVM"],
    stars: 1500,
    githubUrl: "https://github.com/crytic/echidna",
    documentation: "https://github.com/crytic/echidna/wiki",
  },
  {
    name: "Manticore",
    description: "Symbolic execution tool for analysis of smart contracts and binaries.",
    category: "Symbolic Execution",
    tags: ["EVM", "Formal Verification", "Python"],
    stars: 3100,
    githubUrl: "https://github.com/trailofbits/manticore",
    documentation: "https://github.com/trailofbits/manticore/wiki",
  },
  {
    name: "MythX",
    description: "Security analysis platform for Ethereum smart contracts.",
    category: "Security Suite",
    tags: ["API", "Solidity", "Vyper"],
    stars: 950,
    githubUrl: "https://github.com/MythX/mythx-cli",
    documentation: "https://docs.mythx.io/",
  },
  {
    name: "Securify",
    description: "Security scanner for Ethereum smart contracts that checks for common vulnerabilities.",
    category: "Static Analysis",
    tags: ["Solidity", "Patterns", "Automated"],
    stars: 1200,
    githubUrl: "https://github.com/eth-sri/securify2",
    documentation: "https://github.com/eth-sri/securify2#documentation",
  },
]

interface ToolCardProps {
  tool: {
    name: string
    description: string
    category: string
    tags: string[]
    stars: number
    githubUrl: string
    downloadUrl?: string
    documentation?: string
  }
}

function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <Badge variant="outline" className="bg-emerald-900/20 text-emerald-400 border-emerald-800">
            {tool.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400 mb-4">{tool.description}</CardDescription>
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <div className="flex items-center text-xs text-gray-500">
          <Star className="h-3 w-3 mr-1 text-yellow-500" />
          {tool.stars.toLocaleString()}
        </div>
        <div className="flex gap-2">
          {tool.documentation && (
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Documentation</span>
            </Button>
          )}
          {tool.downloadUrl && (
            <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ToolsPage() {
  return (
    <PageLayoutWithBreadcrumbs>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Security Tools</h1>
        <p className="text-gray-400 mb-8">Discover and use tools for blockchain and smart contract security analysis</p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Search tools..." className="pl-9 bg-gray-800 border-gray-700" />
          </div>
          <Button variant="outline" className="border-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </div>
      </div>
    </PageLayoutWithBreadcrumbs>
  )
}
