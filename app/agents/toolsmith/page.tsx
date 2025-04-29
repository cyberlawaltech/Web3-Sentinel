"use client"

import { motion } from "framer-motion"
import { ToolsmithNav } from "./components/toolsmith-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PenToolIcon as Tool, Wrench, CheckCircle, Clock, BarChart } from "lucide-react"
import Link from "next/link"

export default function ToolsmithDashboardPage() {
  return (
    <>
      <ToolsmithNav />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="bg-gray-900 border-gray-800 h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-emerald-400">Total Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">48</div>
                <div className="p-2 bg-emerald-900/20 rounded-full">
                  <Wrench className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-emerald-400">↑ 10%</span> from last month
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
              <CardTitle className="text-lg text-emerald-400">Tool Evaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">92</div>
                <div className="p-2 bg-blue-900/20 rounded-full">
                  <Tool className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-blue-400">↑ 12%</span> from last month
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
              <CardTitle className="text-lg text-emerald-400">Adoption Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">72%</div>
                <div className="p-2 bg-green-900/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <span className="text-green-400">↑ 8%</span> from last month
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
              <CardTitle className="text-lg text-emerald-400">Recent Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="font-medium">Security Scanner #{i}</div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {i} day{i !== 1 ? "s" : ""} ago
                      </div>
                    </div>
                    <Link href="/agents/toolsmith/tools/t1">
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
                <Link href="/agents/toolsmith/tools">
                  <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white">
                    View All Tools
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
              <CardTitle className="text-lg text-emerald-400">Tool Categories</CardTitle>
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
                    <span className="text-sm">Static Analyzers</span>
                  </div>
                  <span className="text-sm">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Fuzzers</span>
                  </div>
                  <span className="text-sm">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-sm">Monitoring Tools</span>
                  </div>
                  <span className="text-sm">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Others</span>
                  </div>
                  <span className="text-sm">20%</span>
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
              <CardTitle className="text-lg text-emerald-400">Tool Development</CardTitle>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                New Tool
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-400">Overall Progress</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2 bg-gray-800" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Tool</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">ReentrancyGuard</div>
                        <div className="text-xs text-gray-400">Static Analyzer</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">Security</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-900/20 text-emerald-400">
                          In Development
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
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
                        <div className="font-medium text-white">FlashLoanDetector</div>
                        <div className="text-xs text-gray-400">Monitoring Tool</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">DeFi</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-900/20 text-amber-400">
                          Planning
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-800 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "30%" }}></div>
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
