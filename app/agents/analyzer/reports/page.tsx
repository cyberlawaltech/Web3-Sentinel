"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { AnalyzerNav } from "../components/analyzer-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Filter } from "lucide-react"

// Mock data for analysis reports
const mockReports = [
  {
    id: "a1b2c3d4",
    title: "Reentrancy Vulnerability Analysis",
    contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    contractName: "UniswapV2Router",
    chain: "Ethereum Mainnet",
    timestamp: "2023-10-27T10:30:00Z",
    vulnerabilityType: "Reentrancy",
    checkResult: "PatternFound",
    confidence: "High",
    severity: "Critical",
  },
  {
    id: "e5f6g7h8",
    title: "Integer Overflow Check",
    contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    contractName: "UNI Token",
    chain: "Ethereum Mainnet",
    timestamp: "2023-10-26T14:15:00Z",
    vulnerabilityType: "Integer Overflow",
    checkResult: "PatternNotFound",
    confidence: "High",
    severity: "Low",
  },
  {
    id: "i9j0k1l2",
    title: "Access Control Analysis",
    contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    contractName: "DAI Stablecoin",
    chain: "Ethereum Mainnet",
    timestamp: "2023-10-25T09:45:00Z",
    vulnerabilityType: "Access Control",
    checkResult: "Inconclusive",
    confidence: "Medium",
    severity: "Medium",
  },
  {
    id: "m3n4o5p6",
    title: "Flash Loan Attack Vector Analysis",
    contractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    contractName: "WETH",
    chain: "Ethereum Mainnet",
    timestamp: "2023-10-24T16:20:00Z",
    vulnerabilityType: "Flash Loan Attack",
    checkResult: "PatternFound",
    confidence: "Medium",
    severity: "High",
  },
  {
    id: "q7r8s9t0",
    title: "Unchecked External Call Analysis",
    contractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    contractName: "WBTC Token",
    chain: "Ethereum Mainnet",
    timestamp: "2023-10-23T11:10:00Z",
    vulnerabilityType: "Unchecked External Call",
    checkResult: "PatternFound",
    confidence: "High",
    severity: "High",
  },
]

export default function AnalysisReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredReports, setFilteredReports] = useState(mockReports)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (!query) {
      setFilteredReports(mockReports)
      return
    }

    const filtered = mockReports.filter(
      (report) =>
        report.title.toLowerCase().includes(query) ||
        report.contractAddress.toLowerCase().includes(query) ||
        report.contractName.toLowerCase().includes(query) ||
        report.vulnerabilityType.toLowerCase().includes(query),
    )

    setFilteredReports(filtered)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PatternFound":
        return (
          <Badge variant="destructive" className="text-xs">
            🔴 Pattern Found
          </Badge>
        )
      case "PatternNotFound":
        return <Badge className="bg-green-600 hover:bg-green-700 text-xs">🟢 Pattern Not Found</Badge>
      case "Inconclusive":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500 text-xs">
            🟠 Inconclusive
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <Badge className="bg-red-600 hover:bg-red-700 text-xs">Critical</Badge>
      case "High":
        return <Badge className="bg-orange-600 hover:bg-orange-700 text-xs">High</Badge>
      case "Medium":
        return <Badge className="bg-amber-600 hover:bg-amber-700 text-xs">Medium</Badge>
      case "Low":
        return <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">Low</Badge>
      default:
        return <Badge className="bg-gray-600 hover:bg-gray-700 text-xs">{severity}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <AnalyzerNav />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-xl text-emerald-400">Analysis Reports</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="pl-9 bg-gray-800 border-gray-700 w-full md:w-64"
                  />
                </div>
                <Button variant="outline" className="border-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Report</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Contract</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Vulnerability</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Severity</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-medium text-white">{report.title}</div>
                        <div className="text-xs text-gray-400">ID: {report.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-white">{report.contractName}</div>
                        <div className="text-xs text-gray-400">{`${report.contractAddress.substring(0, 6)}...${report.contractAddress.substring(report.contractAddress.length - 4)}`}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{report.vulnerabilityType}</div>
                      </td>
                      <td className="py-3 px-4">{getStatusBadge(report.checkResult)}</td>
                      <td className="py-3 px-4">{getSeverityBadge(report.severity)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(report.timestamp)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link href={`/agents/analyzer/reports/${report.id}`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-8 text-gray-500">No reports found matching your search criteria.</div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
