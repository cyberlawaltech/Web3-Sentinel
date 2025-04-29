"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Globe, Brain } from "lucide-react"
import { ResearcherNav } from "../components/researcher-nav"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResearcherConfigurationPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>("web3")
  const [selectedSource, setSelectedSource] = useState<string>("all")
  const [query, setQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would navigate to the details page or update state
    }, 2000)
  }

  return (
    <>
      <ResearcherNav />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-400 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Research Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">
                Configure the research agent to gather information on blockchain and Web3 security topics. Select your
                areas of interest and provide specific queries.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>Research Topic</Label>
                  <Tabs defaultValue="web3" value={selectedTopic} onValueChange={setSelectedTopic} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-gray-800">
                      <TabsTrigger value="web3">Web3</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                    </TabsList>
                    <TabsContent value="web3" className="mt-4 bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-400">
                        Research focused on Web3 technologies, including decentralized applications, protocols, and
                        infrastructure.
                      </p>
                    </TabsContent>
                    <TabsContent value="crypto" className="mt-4 bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-400">
                        Research focused on cryptocurrencies, tokens, and financial aspects of blockchain technology.
                      </p>
                    </TabsContent>
                    <TabsContent value="blockchain" className="mt-4 bg-gray-800 p-4 rounded-md">
                      <p className="text-sm text-gray-400">
                        Research focused on blockchain technology, consensus mechanisms, and underlying protocols.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Label>Research Categories</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="exploits"
                        defaultChecked
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="exploits" className="text-sm font-normal">
                        Exploits
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="vulnerabilities"
                        defaultChecked
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="vulnerabilities" className="text-sm font-normal">
                        Vulnerabilities
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="solutions"
                        defaultChecked
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="solutions" className="text-sm font-normal">
                        Solutions
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="tools"
                        defaultChecked
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="tools" className="text-sm font-normal">
                        Tools
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="related"
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="related" className="text-sm font-normal">
                        Related
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="research"
                        className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                      />
                      <Label htmlFor="research" className="text-sm font-normal">
                        Research
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="query">Research Query</Label>
                  <Textarea
                    id="query"
                    placeholder="Enter your research question or topic (e.g., 'Recent reentrancy vulnerabilities in DeFi protocols')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-gray-800 border-gray-700 min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Research
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Research Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Select Sources</Label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Sources</option>
                  <option value="academic">Academic Papers</option>
                  <option value="blogs">Security Blogs</option>
                  <option value="forums">Developer Forums</option>
                  <option value="github">GitHub Repositories</option>
                  <option value="twitter">Twitter/X</option>
                  <option value="discord">Discord Channels</option>
                </select>
              </div>

              <div className="mt-6 space-y-4">
                <Label>Search Engines</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="google"
                      defaultChecked
                      className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <Label htmlFor="google" className="text-sm font-normal">
                      Google
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bing"
                      className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <Label htmlFor="bing" className="text-sm font-normal">
                      Bing
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="duckduckgo"
                      defaultChecked
                      className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <Label htmlFor="duckduckgo" className="text-sm font-normal">
                      DuckDuckGo
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="github-search"
                      defaultChecked
                      className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <Label htmlFor="github-search" className="text-sm font-normal">
                      GitHub Search
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="arxiv"
                      className="rounded border-gray-700 bg-gray-800 text-emerald-500 focus:ring-emerald-500"
                    />
                    <Label htmlFor="arxiv" className="text-sm font-normal">
                      arXiv
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-sm font-medium text-emerald-400 mb-2">Research Agent Capabilities</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>Analyzes multiple sources for comprehensive insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>Identifies patterns across different security incidents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>Categorizes findings by type and severity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>Provides historical context for current vulnerabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span>Suggests related areas for further investigation</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
