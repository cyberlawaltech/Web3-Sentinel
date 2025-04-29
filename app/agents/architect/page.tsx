"use client"

import { motion } from "framer-motion"
import { ArchitectNav } from "./components/architect-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, CheckCircle, Clock, BarChart, Shield } from "lucide-react"
import Link from "next/link"

export default function ArchitectDashboardPage() {
  return (
    <>
      <ArchitectNav />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Total Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">86</div>
                <div className="p-2 bg-emerald-900/20 rounded-full">
                  <Zap className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-emerald-400">↑ 15%</span> from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">124</div>
                <div className="p-2 bg-blue-900/20 rounded-full">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-blue-400">↑ 8%</span> from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Implementation Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">78%</div>
                <div className="p-2 bg-green-900/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-green-400">↑ 5%</span> from last month
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Recent Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">Reentrancy Mitigation #{i}</div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {i} day{i !== 1 ? "s" : ""} ago
                      </div>
                    </div>
                    <Link href="/agents/architect/solutions/s1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/20"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link href="/agents/architect/solutions">
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    View All Solutions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Solution Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48">
                <div className="text-center text-gray-500">
                  <BarChart className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p>Chart visualization would appear here</p>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-sm">Code Fixes</span>
                  </div>
                  <span className="text-sm">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Architecture Changes</span>
                  </div>
                  <span className="text-sm">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Process Improvements</span>
                  </div>
                  <span className="text-sm">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Others</span>
                  </div>
                  <span className="text-sm">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg text-emerald-400">Current Projects</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                New Solution
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Overall Progress</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-gray-800" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Project</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">DeFi Protocol Redesign</div>
                        <div className="text-xs text-gray-400">Lending Platform</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">Architecture</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-900/20 text-emerald-400">
                          In Progress
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">NFT Marketplace Security</div>
                        <div className="text-xs text-gray-400">Access Control</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">Code Fix</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-900/20 text-amber-400">
                          Planning
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
