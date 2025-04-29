export interface Agent {
  id: string
  name: string
  description: string
  status: "idle" | "running" | "error"
  type: AgentType
  lastRun?: Date
  capabilities: string[]
}

export type AgentType = "llm" | "scraper" | "analyzer" | "researcher" | "architect" | "toolsmith" | "coder" | "github"

export interface AgentTask {
  id: string
  agentId: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "failed"
  createdAt: Date
  completedAt?: Date
  result?: any
}

export interface SecurityThreat {
  id: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  category: string
  source: string
  discoveredAt: Date
  status: "new" | "analyzing" | "mitigated" | "monitoring"
  details?: any
}

export interface SecurityReport {
  id: string
  title: string
  description: string
  createdAt: Date
  type: "incident" | "vulnerability" | "summary" | "analysis" | "guide" | "research"
  threats: string[] // IDs of related threats
  content: string // Markdown content
  publishedUrl?: string
}

export interface SecurityTool {
  id: string
  name: string
  description: string
  category: "scanner" | "analyzer" | "monitor" | "fuzzer" | "other"
  tags: string[]
  githubUrl: string
  isCustom: boolean
  installCommand?: string
  documentation?: string
}
