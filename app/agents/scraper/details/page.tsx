"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScraperNav } from "../components/scraper-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  AlertTriangle,
  Star,
  DollarSign,
  ImageIcon,
  MessageSquare,
  Link2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"

// Import the image for the scraper details
import Image from "next/image"

type ResultCategory = "exploits" | "vulnerabilities" | "solutions" | "tools" | "related" | "research"

interface Result {
  id: string
  title: string
  description: string
  source: string
  date: string
  category: ResultCategory
  severity?: "critical" | "high" | "medium" | "low"
  url: string
}

const mockResults: Result[] = [
  {
    id: "1",
    title: "Reentrancy Vulnerability in DeFi Protocol",
    description:
      "A critical reentrancy vulnerability was discovered in a popular DeFi lending protocol that could allow attackers to drain funds.",
    source: "certik.com",
    date: "2023-04-01",
    category: "exploits",
    severity: "critical",
    url: "https://example.com/exploit-1",
  },
  {
    id: "2",
    title: "Flash Loan Attack Vector Analysis",
    description:
      "Analysis of a new flash loan attack vector that affects multiple DeFi protocols using similar pool designs.",
    source: "slowmist.com",
    date: "2023-03-28",
    category: "exploits",
    severity: "high",
    url: "https://example.com/exploit-2",
  },
  {
    id: "3",
    title: "Integer Overflow in Smart Contract",
    description: "A vulnerability related to integer overflow was found in multiple ERC-20 token implementations.",
    source: "immunefi.com",
    date: "2023-03-25",
    category: "vulnerabilities",
    severity: "medium",
    url: "https://example.com/vulnerability-1",
  },
  {
    id: "4",
    title: "Access Control Weakness in Admin Functions",
    description: "Several projects were found to have insufficient access controls for critical admin functions.",
    source: "openzeppelin.com",
    date: "2023-03-20",
    category: "vulnerabilities",
    severity: "high",
    url: "https://example.com/vulnerability-2",
  },
  {
    id: "5",
    title: "Implementing Secure Proxy Patterns",
    description: "A guide to implementing secure proxy patterns for upgradeable smart contracts.",
    source: "consensys.net",
    date: "2023-03-15",
    category: "solutions",
    url: "https://example.com/solution-1",
  },
  {
    id: "6",
    title: "Best Practices for DeFi Security",
    description: "Comprehensive guide to securing DeFi protocols against common attack vectors.",
    source: "trailofbits.com",
    date: "2023-03-10",
    category: "solutions",
    url: "https://example.com/solution-2",
  },
  {
    id: "7",
    title: "Slither: Static Analyzer for Solidity",
    description: "An overview of Slither, a static analysis framework for Solidity smart contracts.",
    source: "github.com",
    date: "2023-03-05",
    category: "tools",
    url: "https://example.com/tool-1",
  },
  {
    id: "8",
    title: "Mythril: Security Analysis Tool",
    description: "Introduction to Mythril, a security analysis tool for EVM bytecode.",
    source: "mythril.ai",
    date: "2023-03-01",
    category: "tools",
    url: "https://example.com/tool-2",
  },
  {
    id: "9",
    title: "Blockchain Security Conference 2023",
    description: "Upcoming blockchain security conference featuring talks on the latest security research.",
    source: "blocksec.com",
    date: "2023-02-25",
    category: "related",
    url: "https://example.com/related-1",
  },
  {
    id: "10",
    title: "Security Audit Firms Comparison",
    description: "A comparison of major blockchain security audit firms and their methodologies.",
    source: "defirate.com",
    date: "2023-02-20",
    category: "related",
    url: "https://example.com/related-2",
  },
  {
    id: "11",
    title: "Formal Verification Methods for Smart Contracts",
    description: "Research paper on applying formal verification methods to smart contract security.",
    source: "arxiv.org",
    date: "2023-02-15",
    category: "research",
    url: "https://example.com/research-1",
  },
  {
    id: "12",
    title: "Economic Security in Blockchain Systems",
    description: "Academic research on economic security models for blockchain protocols.",
    source: "ieee.org",
    date: "2023-02-10",
    category: "research",
    url: "https://example.com/research-2",
  },
]

export default function ScraperDetailsPage() {
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<ResultCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredResults, setFilteredResults] = useState<Result[]>(mockResults)
  const [expandedResults, setExpandedResults] = useState<Record<string, boolean>>({})

  // Get unique sources
  const sources = ["all", ...Array.from(new Set(mockResults.map((result) => result.source)))]

  useEffect(() => {
    let results = mockResults

    if (selectedSource !== "all") {
      results = results.filter((result) => result.source === selectedSource)
    }

    if (selectedCategory !== "all") {
      results = results.filter((result) => result.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (result) => result.title.toLowerCase().includes(query) || result.description.toLowerCase().includes(query),
      )
    }

    setFilteredResults(results)
  }, [selectedSource, selectedCategory, searchQuery])

  const toggleExpand = (id: string) => {
    setExpandedResults((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getCategoryIcon = (category: ResultCategory) => {
    switch (category) {
      case "exploits":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      case "vulnerabilities":
        return <Star className="h-5 w-5 text-amber-400" />
      case "solutions":
        return <DollarSign className="h-5 w-5 text-green-400" />
      case "tools":
        return <ImageIcon className="h-5 w-5 text-blue-400" />
      case "related":
        return <MessageSquare className="h-5 w-5 text-purple-400" />
      case "research":
        return <Link2 className="h-5 w-5 text-indigo-400" />
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <>
      <ScraperNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
          <div className="bg-gray-800 p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-emerald-400 mb-1">Scraper Results</h2>
              <p className="text-gray-400 text-sm">View and filter security findings from web scraping sources</p>
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search results..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-gray-950 border-gray-700 w-full"
                />
              </div>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-gray-950 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source === "all" ? "All Sources" : source}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <CardContent className="p-0">
            {/* Source visualization */}
            <div className="p-6 bg-gray-900 border-b border-gray-800">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-gray-800 rounded-md px-4 py-2 text-center">
                  <span className="text-lg font-medium">
                    {selectedSource === "all" ? "All Sources" : selectedSource}
                  </span>
                </div>
              </div>

              {/* Category filter buttons */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("all")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Search className="h-6 w-6 mb-1" />
                  <span className="text-xs">All</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("exploits")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "exploits"
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <AlertTriangle className="h-6 w-6 mb-1" />
                  <span className="text-xs">Exploits</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("vulnerabilities")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "vulnerabilities"
                      ? "bg-amber-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Star className="h-6 w-6 mb-1" />
                  <span className="text-xs">Vulnerabilities</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("solutions")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "solutions"
                      ? "bg-green-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <DollarSign className="h-6 w-6 mb-1" />
                  <span className="text-xs">Solutions</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("tools")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "tools"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <ImageIcon className="h-6 w-6 mb-1" />
                  <span className="text-xs">Tools</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("research")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "research"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Link2 className="h-6 w-6 mb-1" />
                  <span className="text-xs">Research</span>
                </motion.button>
              </div>

              {/* Results visualization */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-emerald-500/5 pointer-events-none" />
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4 text-emerald-400">Results</h3>

                  <AnimatePresence>
                    {filteredResults.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 text-gray-500"
                      >
                        No results found for the current filters.
                      </motion.div>
                    ) : (
                      <motion.div
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                      >
                        {filteredResults.map((result) => (
                          <motion.div
                            key={result.id}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 },
                            }}
                            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
                          >
                            <div
                              className="p-4 cursor-pointer flex items-start justify-between"
                              onClick={() => toggleExpand(result.id)}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-1">{getCategoryIcon(result.category)}</div>
                                <div>
                                  <h4 className="font-medium text-white">{result.title}</h4>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{result.source}</span>
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{result.date}</span>
                                    {result.severity && (
                                      <span
                                        className={`text-xs bg-gray-700 px-2 py-1 rounded ${getSeverityColor(result.severity)}`}
                                      >
                                        {result.severity}
                                      </span>
                                    )}
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-emerald-400">
                                      {result.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                {expandedResults[result.id] ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </div>
                            </div>

                            {expandedResults[result.id] && (
                              <div className="p-4 border-t border-gray-700 bg-gray-850">
                                <p className="text-gray-300 mb-4">{result.description}</p>
                                <a
                                  href={result.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm"
                                >
                                  View Original Source
                                  <ExternalLink className="ml-1 h-3 w-3" />
                                </a>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add the image from the mockup */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-emerald-400">Visualization Reference</h3>
        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scraperAgtDetails-Gqac0wWcOIGlcAxxRLGBZQD3GvsExu.png"
              alt="Scraper details visualization"
              width={800}
              height={600}
              className="rounded-lg border border-gray-700"
            />
          </div>
        </div>
      </div>
    </>
  )
}
