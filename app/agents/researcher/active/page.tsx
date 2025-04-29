"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ResearcherNav } from "../components/researcher-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Database,
  FileText,
  AlertCircle,
  CheckCircle,
  Pause,
  Play,
  StopCircle,
  Edit,
  Trash2,
  Settings,
  RefreshCw,
  Search,
} from "lucide-react"

interface ResearchSource {
  id: string
  name: string
  type: string
  items: number
  active: boolean
}

interface ResearchStats {
  sources: number
  papers: number
  articles: number
  repositories: number
  errors: number
  success: number
}

export default function ActiveResearchPage() {
  const [isRunning, setIsRunning] = useState(true)
  const [progress, setProgress] = useState(42)
  const [stats, setStats] = useState<ResearchStats>({
    sources: 6,
    papers: 124,
    articles: 287,
    repositories: 56,
    errors: 8,
    success: 459,
  })
  const [sources, setSources] = useState<ResearchSource[]>([
    { id: "1", name: "arxiv.org", type: "Academic", items: 124, active: true },
    { id: "2", name: "github.com", type: "Repository", items: 56, active: true },
    { id: "3", name: "ethereum.org", type: "Documentation", items: 42, active: true },
    { id: "4", name: "consensys.net", type: "Blog", items: 78, active: true },
    { id: "5", name: "openzeppelin.com", type: "Documentation", items: 35, active: true },
    { id: "6", name: "web3security.io", type: "Blog", items: 132, active: true },
  ])
  const [query, setQuery] = useState<string>("Reentrancy vulnerabilities in DeFi protocols")

  // Simulate progress updates
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning])

  const toggleActive = (id: string) => {
    setSources(sources.map((source) => (source.id === id ? { ...source, active: !source.active } : source)))
  }

  const deleteSource = (id: string) => {
    setSources(sources.filter((source) => source.id !== id))
    setStats((prev) => ({
      ...prev,
      sources: prev.sources - 1,
    }))
  }

  const toggleResearch = () => {
    setIsRunning(!isRunning)
  }

  const resetResearch = () => {
    setProgress(0)
    setIsRunning(true)
  }

  return (
    <>
      <ResearcherNav />

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-emerald-400">Active Research Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Research Progress</span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-emerald-500" />
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Research Status</h3>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${isRunning ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}`}
                      >
                        {isRunning ? "Running" : "Paused"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {isRunning
                        ? "The research agent is currently gathering and analyzing information from configured sources."
                        : "The research agent is currently paused. Resume to continue data collection and analysis."}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={isRunning ? "outline" : "default"}
                        className={
                          isRunning
                            ? "border-amber-500 text-amber-500 hover:bg-amber-900/20"
                            : "bg-emerald-600 hover:bg-emerald-700"
                        }
                        onClick={toggleResearch}
                      >
                        {isRunning ? (
                          <>
                            <Pause className="mr-1 h-4 w-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="mr-1 h-4 w-4" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-900/20"
                        onClick={() => {
                          setIsRunning(false)
                          setProgress(0)
                        }}
                      >
                        <StopCircle className="mr-1 h-4 w-4" />
                        Stop
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-900/20"
                        onClick={resetResearch}
                      >
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Restart
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Current Query</h3>
                    <div className="bg-gray-900 p-3 rounded-md mb-3 text-sm border border-gray-700">{query}</div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                        <Edit className="mr-1 h-4 w-4" />
                        Refine Query
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-400 flex-1">
                        <Search className="mr-1 h-4 w-4" />
                        New Search
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Database className="h-6 w-6 text-blue-400 mb-2" />
                      <span className="text-sm text-gray-400">Sources</span>
                      <span className="text-xl font-bold">{stats.sources}</span>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <FileText className="h-6 w-6 text-purple-400 mb-2" />
                      <span className="text-sm text-gray-400">Papers</span>
                      <span className="text-xl font-bold">{stats.papers}</span>
                    </div>
                    <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <FileText className="h-6 w-6 text-green-400 mb-2" />
                      <span className="text-sm text-gray-400">Articles</span>
                      <span className="text-xl font-bold">{stats.articles}</span>
                    </div>
                    <div className="bg-indigo-900/20 border border-indigo-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Database className="h-6 w-6 text-indigo-400 mb-2" />
                      <span className="text-sm text-gray-400">Repositories</span>
                      <span className="text-xl font-bold">{stats.repositories}</span>
                    </div>
                    <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-400 mb-2" />
                      <span className="text-sm text-gray-400">Errors</span>
                      <span className="text-xl font-bold">{stats.errors}</span>
                    </div>
                    <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mb-2" />
                      <span className="text-sm text-gray-400">Success</span>
                      <span className="text-xl font-bold">{stats.success}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Research Activity Log</h3>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                      <div className="text-sm border-l-2 border-emerald-500 pl-3 py-1">
                        <div className="text-emerald-400">Analysis Complete</div>
                        <div className="text-white">Analyzed 42 papers on reentrancy vulnerabilities</div>
                        <div className="text-gray-500">2 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-blue-500 pl-3 py-1">
                        <div className="text-blue-400">Processing</div>
                        <div className="text-white">Extracting data from ethereum.org documentation</div>
                        <div className="text-gray-500">5 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-amber-500 pl-3 py-1">
                        <div className="text-amber-400">Warning</div>
                        <div className="text-white">Rate limit detected on arxiv.org</div>
                        <div className="text-gray-500">8 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-red-500 pl-3 py-1">
                        <div className="text-red-400">Error</div>
                        <div className="text-white">Failed to parse PDF from research paper #124</div>
                        <div className="text-gray-500">12 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-purple-500 pl-3 py-1">
                        <div className="text-purple-400">Discovery</div>
                        <div className="text-white">Found 15 new relevant papers on DeFi security</div>
                        <div className="text-gray-500">15 minutes ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-emerald-400">Research Sources</CardTitle>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  + Add Source
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700">
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Refresh
                </Button>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search sources..."
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Items</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Active</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.map((source) => (
                      <tr key={source.id} className="border-b border-gray-800">
                        <td className="py-3 px-4">
                          <a
                            href={`https://${source.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {source.name}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{source.type}</td>
                        <td className="py-3 px-4 text-gray-300">{source.items}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${source.active ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
                          >
                            {source.active ? "true" : "false"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-500">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => deleteSource(source.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-500">
                              <Settings className="h-4 w-4" />
                              <span className="sr-only">Settings</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-8 w-8 p-0 ${source.active ? "text-emerald-500" : "text-gray-500"}`}
                              onClick={() => toggleActive(source.id)}
                            >
                              {source.active ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                              <span className="sr-only">{source.active ? "Active" : "Inactive"}</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">Showing {sources.length} sources</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 border-gray-700 disabled:opacity-50"
                    disabled
                  >
                    &lt;
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-white bg-emerald-600 border-emerald-600"
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 border-gray-700 disabled:opacity-50"
                    disabled
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Add the image from the mockup */}
        <div className="mt-4 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-emerald-400">Visualization Reference</h3>
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/scraper%20details.jpg-YcUoi8GRgigczBQNxgWHgOKpgkbsGJ.jpeg"
                alt="Active research dashboard visualization"
                width={800}
                height={600}
                className="rounded-lg border border-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
