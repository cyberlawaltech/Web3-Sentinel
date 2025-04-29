"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertTriangle, Clock, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function SecurityThreats() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredThreats = mockThreats.filter(
    (threat) =>
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.source.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Security Threats</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Scan for New Threats</Button>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search threats..."
            className="pl-10 bg-gray-900 border-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-700">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all">All Threats</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="high">High</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Latest Security Threats</CardTitle>
              <CardDescription>Showing {filteredThreats.length} threats from various sources</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Severity</TableHead>
                    <TableHead className="text-gray-400">Title</TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">Source</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredThreats.map((threat) => (
                    <TableRow key={threat.id} className="border-gray-800">
                      <TableCell>
                        <SeverityBadge severity={threat.severity} />
                      </TableCell>
                      <TableCell className="font-medium text-white">{threat.title}</TableCell>
                      <TableCell>{threat.category}</TableCell>
                      <TableCell>{threat.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{threat.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={threat.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="critical">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Critical Threats</CardTitle>
              <CardDescription>High-priority security issues requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Severity</TableHead>
                    <TableHead className="text-gray-400">Title</TableHead>
                    <TableHead className="text-gray-400">Category</TableHead>
                    <TableHead className="text-gray-400">Source</TableHead>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredThreats
                    .filter((threat) => threat.severity === "critical")
                    .map((threat) => (
                      <TableRow key={threat.id} className="border-gray-800">
                        <TableCell>
                          <SeverityBadge severity={threat.severity} />
                        </TableCell>
                        <TableCell className="font-medium text-white">{threat.title}</TableCell>
                        <TableCell>{threat.category}</TableCell>
                        <TableCell>{threat.source}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{threat.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={threat.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Other severity tabs would follow the same pattern */}
      </Tabs>
    </div>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const colorMap: Record<string, string> = {
    critical: "bg-red-900 text-red-300 border-red-700",
    high: "bg-orange-900 text-orange-300 border-orange-700",
    medium: "bg-yellow-900 text-yellow-300 border-yellow-700",
    low: "bg-blue-900 text-blue-300 border-blue-700",
  }

  return (
    <Badge className={`${colorMap[severity]} border`}>
      {severity === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    new: "bg-purple-900 text-purple-300 border-purple-700",
    analyzing: "bg-blue-900 text-blue-300 border-blue-700",
    mitigated: "bg-green-900 text-green-300 border-green-700",
    monitoring: "bg-yellow-900 text-yellow-300 border-yellow-700",
  }

  return (
    <Badge className={`${colorMap[status]} border`}>
      {status === "analyzing" && <Clock className="h-3 w-3 mr-1" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

const mockThreats = [
  {
    id: "1",
    title: "Reentrancy Vulnerability in DeFi Protocol",
    severity: "critical",
    category: "Smart Contract",
    source: "Security Blog",
    date: "2023-04-01",
    status: "new",
  },
  {
    id: "2",
    title: "Flash Loan Attack Vector Identified",
    severity: "high",
    category: "DeFi",
    source: "Twitter",
    date: "2023-04-02",
    status: "analyzing",
  },
  {
    id: "3",
    title: "Unchecked Return Values in Token Contract",
    severity: "medium",
    category: "ERC20",
    source: "GitHub Issue",
    date: "2023-04-03",
    status: "mitigated",
  },
  {
    id: "4",
    title: "Front-Running Vulnerability in DEX",
    severity: "high",
    category: "Exchange",
    source: "Security Forum",
    date: "2023-04-04",
    status: "monitoring",
  },
  {
    id: "5",
    title: "Integer Overflow in Solidity Contract",
    severity: "critical",
    category: "Smart Contract",
    source: "Bug Bounty",
    date: "2023-04-05",
    status: "new",
  },
  {
    id: "6",
    title: "Weak Randomness in NFT Minting",
    severity: "medium",
    category: "NFT",
    source: "Discord",
    date: "2023-04-06",
    status: "analyzing",
  },
  {
    id: "7",
    title: "Unprotected Self-Destruct Function",
    severity: "critical",
    category: "Smart Contract",
    source: "Code Audit",
    date: "2023-04-07",
    status: "new",
  },
  {
    id: "8",
    title: "Signature Replay Attack Possibility",
    severity: "high",
    category: "Authentication",
    source: "Research Paper",
    date: "2023-04-08",
    status: "monitoring",
  },
]
