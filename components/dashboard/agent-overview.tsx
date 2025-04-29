"use client"

import type React from "react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Search,
  FileSearch,
  Database,
  Zap,
  PenToolIcon as Tool,
  Code,
  Github,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AgentOverview() {
  const [agentStates, setAgentStates] = useState({
    llm: "idle",
    scraper: "idle",
    analyzer: "idle",
    researcher: "idle",
    architect: "idle",
    toolsmith: "idle",
    coder: "idle",
    github: "idle",
  })

  const startAgent = (agent: string) => {
    setAgentStates((prev) => ({ ...prev, [agent]: "running" }))
    // In a real app, this would trigger the agent to start working
  }

  const stopAgent = (agent: string) => {
    setAgentStates((prev) => ({ ...prev, [agent]: "idle" }))
    // In a real app, this would stop the agent
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Agent Overview</h1>
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              Object.keys(agentStates).forEach((agent) => startAgent(agent))
            }}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Start All Agents
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              Object.keys(agentStates).forEach((agent) => stopAgent(agent))
            }}
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-950"
          >
            Stop All Agents
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            state={agentStates[agent.id as keyof typeof agentStates]}
            onStart={() => startAgent(agent.id)}
            onStop={() => stopAgent(agent.id)}
          />
        ))}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">System Status</CardTitle>
          <CardDescription>Overall system performance and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">CPU Usage</span>
                <span className="text-sm text-gray-400">42%</span>
              </div>
              <Progress value={42} className="h-2 bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Memory Usage</span>
                <span className="text-sm text-gray-400">1.2GB / 4GB</span>
              </div>
              <Progress value={30} className="h-2 bg-gray-700" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">API Calls</span>
                <span className="text-sm text-gray-400">243 / 1000</span>
              </div>
              <Progress value={24.3} className="h-2 bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface AgentCardProps {
  agent: {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    learnMoreLink?: string
  }
  state: "idle" | "running" | "error"
  onStart: () => void
  onStop: () => void
}

function AgentCard({ agent, state, onStart, onStop }: AgentCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <div
        className={`h-1 ${state === "running" ? "bg-emerald-500" : state === "error" ? "bg-red-500" : "bg-gray-700"}`}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-md bg-gray-800">{agent.icon}</div>
            <CardTitle className="text-lg text-white">{agent.name}</CardTitle>
          </div>
          <StatusIndicator status={state} />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400 mb-4 min-h-[40px]">{agent.description}</CardDescription>
        <div className="flex flex-col space-y-2">
          {state === "idle" ? (
            <Button size="sm" onClick={onStart} className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
              Start Agent
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={onStop}
              className="border-red-500 text-red-500 hover:bg-red-950 w-full"
            >
              Stop Agent
            </Button>
          )}
          {agent.learnMoreLink && (
            <Link href={agent.learnMoreLink} passHref>
              <Button
                size="sm"
                variant="ghost"
                className="text-emerald-400 hover:text-emerald-300 hover:bg-gray-800 w-full"
              >
                Learn More
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function StatusIndicator({ status }: { status: "idle" | "running" | "error" }) {
  return (
    <div className="flex items-center">
      {status === "idle" && (
        <div className="flex items-center text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-xs">Idle</span>
        </div>
      )}
      {status === "running" && (
        <div className="flex items-center text-emerald-500">
          <CheckCircle2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Running</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center text-red-500">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span className="text-xs">Error</span>
        </div>
      )}
    </div>
  )
}

const agents = [
  {
    id: "llm",
    name: "LLM Assistant",
    description: "Provides security consultation and manages other agents",
    icon: <Brain className="h-5 w-5 text-purple-400" />,
    learnMoreLink: "/temika",
  },
  {
    id: "scraper",
    name: "Scraper Agent",
    description: "Extracts security threats from various online sources",
    icon: <Search className="h-5 w-5 text-blue-400" />,
  },
  {
    id: "analyzer",
    name: "Analyzer Agent",
    description: "Performs in-depth analysis of exploits and vulnerabilities",
    icon: <FileSearch className="h-5 w-5 text-yellow-400" />,
  },
  {
    id: "researcher",
    name: "Researcher Agent",
    description: "Organizes blockchain security knowledge and research",
    icon: <Database className="h-5 w-5 text-green-400" />,
  },
  {
    id: "architect",
    name: "Solution Architect",
    description: "Suggests mitigation strategies for security issues",
    icon: <Zap className="h-5 w-5 text-orange-400" />,
  },
  {
    id: "toolsmith",
    name: "Toolsmith Agent",
    description: "Identifies and evaluates open-source security tools",
    icon: <Tool className="h-5 w-5 text-red-400" />,
  },
  {
    id: "coder",
    name: "Coder Agent",
    description: "Develops and implements security tools and fixes",
    icon: <Code className="h-5 w-5 text-indigo-400" />,
  },
  {
    id: "github",
    name: "GitHub Manager",
    description: "Manages repository and publishes findings online",
    icon: <Github className="h-5 w-5 text-gray-400" />,
  },
]
