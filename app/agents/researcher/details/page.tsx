"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ResearcherNav } from "../components/researcher-nav"
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
  citations?: number
  relevance?: number
}

const mockResults: Result[] = [
  {
    id: "1",
    title: "Reentrancy Vulnerability Analysis in Smart Contracts",
    description:
      "A comprehensive analysis of reentrancy vulnerabilities in Ethereum smart contracts, including historical exploits and prevention techniques.",
    source: "arxiv.org",
    date: "2023-04-01",
    category: "research",
    citations: 42,
    relevance: 95,
    url: "https://example.com/research-1",
  },
  {
    id: "2",
    title: "Flash Loan Attack Patterns in DeFi",
    description:
      "Research on common patterns in flash loan attacks across multiple DeFi protocols, with case studies and mitigation strategies.",
    source: "ethereum.org",
    date: "2023-03-28",
    category: "exploits",
    severity: "high",
    citations: 28,
    relevance: 90,
    url: "https://example.com/research-2",
  },
  {
    id: "3",
    title: "Formal Verification Methods for Smart Contracts",
    description: "An overview of formal verification techniques that can be applied to smart contract security.",
    source: "consensys.net",
    date: "2023-03-25",
    category: "solutions",
    citations: 35,
    relevance: 85,
    url: "https://example.com/research-3",
  },
  {
    id: "4",
    title: "Access Control Patterns in Web3 Applications",
    description: "Analysis of access control mechanisms in Web3 applications and common vulnerabilities.",
    source: "openzeppelin.com",
    date: "2023-03-20",
    category: "vulnerabilities",
    severity: "medium",
    citations: 19,
    relevance: 80,
    url: "https://example.com/research-4",
  },
  {
    id: "5",
    title: "Blockchain Security Tools Comparison",
    description: "A comparative analysis of popular blockchain security tools, their capabilities, and limitations.",
    source: "github.com",
    date: "2023-03-15",
    category: "tools",
    citations: 12,
    relevance: 75,
    url: "https://example.com/research-5",
  },
  {
    id: "6",
    title: "Emerging Consensus Mechanism Vulnerabilities",
    description: "Research on potential vulnerabilities in newer consensus mechanisms used in blockchain networks.",
    source: "ieee.org",
    date: "2023-03-10",
    category: "vulnerabilities",
    severity: "high",
    citations: 31,
    relevance: 88,
    url: "https://example.com/research-6",
  },
  {
    id: "7",
    title: "Slither: Static Analysis for Smart Contracts",
    description: "Detailed review of Slither's capabilities for detecting vulnerabilities in Solidity code.",
    source: "trailofbits.com",
    date: "2023-03-05",
    category: "tools",
    citations: 24,
    relevance: 82,
    url: "https://example.com/research-7",
  },
  {
    id: "8",
    title: "Economic Security Models in DeFi",
    description: "Research on economic security models and their application in decentralized finance protocols.",
    source: "defi-research.org",
    date: "2023-03-01",
    category: "research",
    citations: 38,
    relevance: 78,
    url: "https://example.com/research-8",
  },
  {
    id: "9",
    title: "Cross-Chain Bridge Security Analysis",
    description: "Analysis of security incidents involving cross-chain bridges and recommendations for improvement.",
    source: "chainalysis.com",
    date: "2023-02-25",
    category: "exploits",
    severity: "critical",
    citations: 45,
    relevance: 92,
    url: "https://example.com/research-9",
  },
  {
    id: "10",
    title: "Zero-Knowledge Proofs in Blockchain Privacy",
    description: "Overview of zero-knowledge proof applications for enhancing privacy in blockchain systems.",
    source: "zkresearch.org",
    date: "2023-02-20",
    category: "solutions",
    citations: 29,
    relevance: 76,
    url: "https://example.com/research-10",
  },
  {
    id: "11",
    title: "Web3 Security Best Practices Guide",
    description: "Comprehensive guide to security best practices for Web3 developers and projects.",
    source: "web3security.io",
    date: "2023-02-15",
    category: "solutions",
    citations: 52,
    relevance: 94,
    url: "https://example.com/research-11",
  },
  {
    id: "12",
    title: "Related Research in Traditional Cybersecurity",
    description: "Exploration of how traditional cybersecurity concepts apply to blockchain security challenges.",
    source: "cybersecurity-journal.com",
    date: "2023-02-10",
    category: "related",
    citations: 17,
    relevance: 70,
    url: "https://example.com/research-12",
  },
]

export default function ResearcherDetailsPage() {
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
      <ResearcherNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
          <div className="bg-gray-800 p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-emerald-400 mb-1">Research Results</h2>
              <p className="text-gray-400 text-sm">View and filter research findings on blockchain and Web3 security</p>
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
              <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mb-6">
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
                  onClick={() => setSelectedCategory("related")}
                  className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                    selectedCategory === "related"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <MessageSquare className="h-6 w-6 mb-1" />
                  <span className="text-xs">Related</span>
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
                                    {result.citations && (
                                      <span className="text-xs bg-gray-700 px-2 py-1 rounded text-blue-400">
                                        Citations: {result.citations}
                                      </span>
                                    )}
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
                                <div className="flex justify-between items-center">
                                  <a
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm"
                                  >
                                    View Original Source
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                  </a>
                                  {result.relevance && (
                                    <span className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-1 rounded-full">
                                      Relevance: {result.relevance}%
                                    </span>
                                  )}
                                </div>
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scraper%20details.jpg-YcUoi8GRgigczBQNxgWHgOKpgkbsGJ.jpeg"
              alt="Research details visualization"
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
