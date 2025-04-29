"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, Clock } from "lucide-react"

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Security Reports</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Generate New Report</Button>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Summaries</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="weekly">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weeklyReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthlyReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ReportCardProps {
  report: {
    id: string
    title: string
    description: string
    date: string
    type: string
    url: string
  }
}

function ReportCard({ report }: ReportCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-md bg-gray-800">
              <FileText className="h-5 w-5 text-emerald-400" />
            </div>
            <CardTitle className="text-lg text-white">{report.title}</CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-400">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{report.date}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{report.description}</p>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-950">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="ghost">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Online
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const recentReports = [
  {
    id: "1",
    title: "Flash Loan Attack Analysis",
    description: "Detailed breakdown of the recent flash loan exploit affecting multiple DeFi protocols.",
    date: "April 10, 2023",
    type: "incident",
    url: "#",
  },
  {
    id: "2",
    title: "Reentrancy Vulnerability Report",
    description: "Analysis of reentrancy vulnerabilities found in popular smart contracts.",
    date: "April 8, 2023",
    type: "vulnerability",
    url: "#",
  },
  {
    id: "3",
    title: "NFT Security Best Practices",
    description: "Comprehensive guide to securing NFT smart contracts and platforms.",
    date: "April 5, 2023",
    type: "guide",
    url: "#",
  },
  {
    id: "4",
    title: "DEX Front-Running Mitigation",
    description: "Strategies to prevent front-running attacks on decentralized exchanges.",
    date: "April 3, 2023",
    type: "research",
    url: "#",
  },
]

const weeklyReports = [
  {
    id: "w1",
    title: "Weekly Security Summary - Week 14",
    description: "Overview of all security incidents and vulnerabilities discovered in week 14.",
    date: "April 9, 2023",
    type: "summary",
    url: "#",
  },
  {
    id: "w2",
    title: "Weekly Security Summary - Week 13",
    description: "Overview of all security incidents and vulnerabilities discovered in week 13.",
    date: "April 2, 2023",
    type: "summary",
    url: "#",
  },
]

const monthlyReports = [
  {
    id: "m1",
    title: "March 2023 Security Analysis",
    description: "Comprehensive analysis of blockchain security trends and incidents in March 2023.",
    date: "April 1, 2023",
    type: "analysis",
    url: "#",
  },
  {
    id: "m2",
    title: "February 2023 Security Analysis",
    description: "Comprehensive analysis of blockchain security trends and incidents in February 2023.",
    date: "March 1, 2023",
    type: "analysis",
    url: "#",
  },
]
