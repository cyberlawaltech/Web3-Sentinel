"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ScraperNav } from "../components/scraper-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Cloud,
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
} from "lucide-react"
import Image from "next/image"

interface ScraperDomain {
  id: string
  domain: string
  adminEmail: string
  links: number
  active: boolean
}

interface ScraperStats {
  domains: number
  contents: number
  queues: number
  loadingErrors: number
  scrapingErrors: number
  success: number
}

export default function ActiveScraperPage() {
  const [isRunning, setIsRunning] = useState(true)
  const [progress, setProgress] = useState(68)
  const [stats, setStats] = useState<ScraperStats>({
    domains: 5,
    contents: 782,
    queues: 0,
    loadingErrors: 16,
    scrapingErrors: 3,
    success: 729,
  })
  const [domains, setDomains] = useState<ScraperDomain[]>([
    { id: "1", domain: "certik.com", adminEmail: "security@certik.com", links: 124, active: true },
    { id: "2", domain: "slowmist.com", adminEmail: "security@slowmist.com", links: 260, active: true },
    { id: "3", domain: "openzeppelin.com", adminEmail: "security@openzeppelin.com", links: 60, active: true },
    { id: "4", domain: "immunefi.com", adminEmail: "security@immunefi.com", links: 420, active: true },
    { id: "5", domain: "consensys.net", adminEmail: "security@consensys.net", links: 42, active: true },
  ])

  // Simulate progress updates
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning])

  const toggleActive = (id: string) => {
    setDomains(domains.map((domain) => (domain.id === id ? { ...domain, active: !domain.active } : domain)))
  }

  const deleteDomain = (id: string) => {
    setDomains(domains.filter((domain) => domain.id !== id))
    setStats((prev) => ({
      ...prev,
      domains: prev.domains - 1,
    }))
  }

  const toggleScraper = () => {
    setIsRunning(!isRunning)
  }

  const resetScraper = () => {
    setProgress(0)
    setIsRunning(true)
  }

  return (
    <>
      <ScraperNav />

      <div className="grid grid-cols-1 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-emerald-400">Active Scraper Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Current Progress</span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-800" indicatorClassName="bg-emerald-500" />
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Scraper Status</h3>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${isRunning ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}`}
                      >
                        {isRunning ? "Running" : "Paused"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {isRunning
                        ? "The scraper is currently running and collecting data from the configured sources."
                        : "The scraper is currently paused. Resume to continue data collection."}
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
                        onClick={toggleScraper}
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
                        onClick={resetScraper}
                      >
                        <RefreshCw className="mr-1 h-4 w-4" />
                        Restart
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-3">Current Activity</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-400">
                        <span className="w-32">Last Scan:</span>
                        <span className="text-white">2 minutes ago</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="w-32">Current Source:</span>
                        <span className="text-white">immunefi.com</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="w-32">Pages Scanned:</span>
                        <span className="text-white">247 / 420</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="w-32">Scan Rate:</span>
                        <span className="text-white">12 pages/minute</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="w-32">Estimated Time:</span>
                        <span className="text-white">~15 minutes remaining</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Cloud className="h-6 w-6 text-blue-400 mb-2" />
                      <span className="text-sm text-gray-400">Domains</span>
                      <span className="text-xl font-bold">{stats.domains}</span>
                    </div>
                    <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <FileText className="h-6 w-6 text-green-400 mb-2" />
                      <span className="text-sm text-gray-400">Contents</span>
                      <span className="text-xl font-bold">{stats.contents}</span>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Cloud className="h-6 w-6 text-purple-400 mb-2" />
                      <span className="text-sm text-gray-400">Queues</span>
                      <span className="text-xl font-bold">{stats.queues}</span>
                    </div>
                    <div className="bg-amber-900/20 border border-amber-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-amber-400 mb-2" />
                      <span className="text-sm text-gray-400">Loading Errors</span>
                      <span className="text-xl font-bold">{stats.loadingErrors}</span>
                    </div>
                    <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-400 mb-2" />
                      <span className="text-sm text-gray-400">Scraping Errors</span>
                      <span className="text-xl font-bold">{stats.scrapingErrors}</span>
                    </div>
                    <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mb-2" />
                      <span className="text-sm text-gray-400">Success</span>
                      <span className="text-xl font-bold">{stats.success}</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Recent Activity Log</h3>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        View All
                      </Button>
                    </div>
                    <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                      <div className="text-sm border-l-2 border-emerald-500 pl-3 py-1">
                        <div className="text-emerald-400">Success</div>
                        <div className="text-white">Scraped 42 pages from consensys.net</div>
                        <div className="text-gray-500">2 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-amber-500 pl-3 py-1">
                        <div className="text-amber-400">Warning</div>
                        <div className="text-white">Rate limit detected on immunefi.com</div>
                        <div className="text-gray-500">5 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-red-500 pl-3 py-1">
                        <div className="text-red-400">Error</div>
                        <div className="text-white">Failed to parse content on slowmist.com/blog/123</div>
                        <div className="text-gray-500">10 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-blue-500 pl-3 py-1">
                        <div className="text-blue-400">Info</div>
                        <div className="text-white">Started scanning openzeppelin.com</div>
                        <div className="text-gray-500">15 minutes ago</div>
                      </div>
                      <div className="text-sm border-l-2 border-emerald-500 pl-3 py-1">
                        <div className="text-emerald-400">Success</div>
                        <div className="text-white">Completed scan of certik.com</div>
                        <div className="text-gray-500">20 minutes ago</div>
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
                <CardTitle className="text-xl text-emerald-400">Domain List</CardTitle>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  + New Domain
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
                    placeholder="Search domains..."
                    className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Domain</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Admin Email</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Links</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Active</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domains.map((domain) => (
                      <tr key={domain.id} className="border-b border-gray-800">
                        <td className="py-3 px-4">
                          <a
                            href={`https://${domain.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {domain.domain}
                          </a>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{domain.adminEmail}</td>
                        <td className="py-3 px-4 text-gray-300">{domain.links}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${domain.active ? "bg-emerald-900/50 text-emerald-400" : "bg-gray-800 text-gray-400"}`}
                          >
                            {domain.active ? "true" : "false"}
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
                              onClick={() => deleteDomain(domain.id)}
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
                              className={`h-8 w-8 p-0 ${domain.active ? "text-emerald-500" : "text-gray-500"}`}
                              onClick={() => toggleActive(domain.id)}
                            >
                              {domain.active ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                              <span className="sr-only">{domain.active ? "Active" : "Inactive"}</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">Showing {domains.length} domains</div>
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ws-admin-dashboard-min%20%282%29.jpg-fHLFnFVfKQ9gRXVDscFmWopNqQ6eGI.jpeg"
                alt="Active scraper dashboard visualization"
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
