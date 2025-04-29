"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Brain, Search, FileSearch, Database, Zap, PenToolIcon as Tool, Code, Github, ArrowLeft } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export function AgentsOverview() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Agent System</h1>
        </div>

        <p className="text-gray-400 max-w-3xl mb-8">
          Our multi-agent system combines specialized AI agents to provide comprehensive web3 security analysis, threat
          detection, and mitigation strategies.
        </p>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="all">All Agents</TabsTrigger>
            <TabsTrigger value="detection">Detection</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents
            .filter((agent) => {
              if (activeTab === "all") return true
              return agent.category === activeTab
            })
            .map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="bg-gray-900 border-gray-800 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-md bg-gray-800">{agent.icon}</div>
                        <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-400">{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Capabilities:</h4>
                    <ul className="text-sm text-gray-400 space-y-1 mb-4">
                      {agent.capabilities.map((capability, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-emerald-500 mr-2">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <div className="p-4 pt-0 mt-auto">
                    <Link href={`/agents/${agent.id}`}>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Agent</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>

        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">How Agents Work Together</h2>
          <p className="text-gray-400 mb-6">
            Our agents form a coordinated system where each specialized component contributes to the overall security
            analysis pipeline.
          </p>

          <div className="relative overflow-x-auto">
            <div className="min-w-[800px] h-[400px] relative">
              {/* Agent connection lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M200,80 C300,80 300,160 400,160" stroke="#10b981" strokeWidth="2" fill="none" />
                <path d="M200,80 C300,80 300,240 400,240" stroke="#10b981" strokeWidth="2" fill="none" />
                <path d="M200,80 C300,80 300,320 400,320" stroke="#10b981" strokeWidth="2" fill="none" />
                <path d="M520,160 C620,160 620,200 720,200" stroke="#10b981" strokeWidth="2" fill="none" />
                <path d="M520,240 C620,240 620,200 720,200" stroke="#10b981" strokeWidth="2" fill="none" />
                <path d="M520,320 C620,320 620,200 720,200" stroke="#10b981" strokeWidth="2" fill="none" />
              </svg>

              {/* LLM Assistant */}
              <div className="absolute left-[100px] top-[40px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-emerald-900">
                  <div className="flex items-center mb-2">
                    <Brain className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="font-medium">LLM Assistant</span>
                  </div>
                  <p className="text-xs text-gray-400">Coordinates all agents and provides insights</p>
                </div>
              </div>

              {/* Data Collection */}
              <div className="absolute left-[400px] top-[120px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-blue-900">
                  <div className="flex items-center mb-2">
                    <Search className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="font-medium">Data Collection</span>
                  </div>
                  <p className="text-xs text-gray-400">Scraper Agent gathers security threats</p>
                </div>
              </div>

              {/* Analysis */}
              <div className="absolute left-[400px] top-[200px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-yellow-900">
                  <div className="flex items-center mb-2">
                    <FileSearch className="h-5 w-5 text-yellow-500 mr-2" />
                    <span className="font-medium">Analysis</span>
                  </div>
                  <p className="text-xs text-gray-400">Analyzer & Researcher Agents process data</p>
                </div>
              </div>

              {/* Solutions */}
              <div className="absolute left-[400px] top-[280px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-orange-900">
                  <div className="flex items-center mb-2">
                    <Zap className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="font-medium">Solutions</span>
                  </div>
                  <p className="text-xs text-gray-400">Architect & Toolsmith Agents create solutions</p>
                </div>
              </div>

              {/* Implementation */}
              <div className="absolute left-[720px] top-[160px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-purple-900">
                  <div className="flex items-center mb-2">
                    <Code className="h-5 w-5 text-purple-500 mr-2" />
                    <span className="font-medium">Implementation</span>
                  </div>
                  <p className="text-xs text-gray-400">Coder Agent implements security tools</p>
                </div>
              </div>

              {/* Publication */}
              <div className="absolute left-[720px] top-[240px] w-[200px]">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <Github className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-medium">Publication</span>
                  </div>
                  <p className="text-xs text-gray-400">GitHub Manager publishes findings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const agents = [
  {
    id: "llm",
    name: "LLM Assistant",
    description: "Provides security consultation and manages other agents",
    icon: <Brain className="h-6 w-6 text-purple-400" />,
    category: "management",
    capabilities: [
      "Natural language processing",
      "Security consultation",
      "Agent coordination",
      "Report generation",
      "Task automation",
    ],
  },
  {
    id: "scraper",
    name: "Scraper Agent",
    description: "Extracts security threats from various online sources",
    icon: <Search className="h-6 w-6 text-blue-400" />,
    category: "detection",
    capabilities: ["Web scraping", "Data extraction", "Source monitoring", "Threat identification", "Real-time alerts"],
  },
  {
    id: "analyzer",
    name: "Analyzer Agent",
    description: "Performs in-depth analysis of exploits and vulnerabilities",
    icon: <FileSearch className="h-6 w-6 text-yellow-400" />,
    category: "analysis",
    capabilities: [
      "Technical analysis",
      "Vulnerability assessment",
      "Attack vector identification",
      "Impact evaluation",
      "Code review",
    ],
  },
  {
    id: "researcher",
    name: "Researcher Agent",
    description: "Organizes blockchain security knowledge and research",
    icon: <Database className="h-6 w-6 text-green-400" />,
    category: "analysis",
    capabilities: [
      "Knowledge management",
      "Research curation",
      "Trend analysis",
      "Historical context",
      "Educational content",
    ],
  },
  {
    id: "architect",
    name: "Solution Architect",
    description: "Suggests mitigation strategies for security issues",
    icon: <Zap className="h-6 w-6 text-orange-400" />,
    category: "analysis",
    capabilities: [
      "Solution design",
      "Mitigation strategies",
      "Security architecture",
      "Best practices",
      "Code review",
    ],
  },
  {
    id: "toolsmith",
    name: "Toolsmith Agent",
    description: "Identifies and evaluates open-source security tools",
    icon: <Tool className="h-6 w-6 text-red-400" />,
    category: "tools",
    capabilities: [
      "Tool discovery",
      "Tool evaluation",
      "Integration recommendations",
      "Usage guidelines",
      "Customization",
    ],
  },
  {
    id: "coder",
    name: "Coder Agent",
    description: "Develops and implements security tools and fixes",
    icon: <Code className="h-6 w-6 text-indigo-400" />,
    category: "tools",
    capabilities: ["Tool development", "Code implementation", "Security fixes", "Testing", "Documentation"],
  },
  {
    id: "github",
    name: "GitHub Manager",
    description: "Manages repository and publishes findings online",
    icon: <Github className="h-6 w-6 text-gray-400" />,
    category: "management",
    capabilities: [
      "Repository management",
      "Automated commits",
      "GitHub Pages publishing",
      "Documentation",
      "Version control",
    ],
  },
]
