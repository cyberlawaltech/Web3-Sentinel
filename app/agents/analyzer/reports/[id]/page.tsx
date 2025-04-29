"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Clock, FileCode, AlertTriangle, Copy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the analysis report
const analysisReport = {
  id: "a1b2c3d4",
  title: "Exploit Analysis Report",
  contractAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  chain: {
    name: "Ethereum Mainnet",
    id: 1,
    logo: "ethereum",
  },
  timestamp: "2023-10-27T10:30:00Z",
  vulnerabilityType: "Reentrancy",
  checkResult: "PatternFound", // PatternFound, PatternNotFound, Inconclusive
  confidence: "High", // High, Medium, Low
  basicImpact: "Fund Loss",
  technicalFindings: {
    sourceCodeStatus: "Verified Source Found",
    sourceOrigin: "Etherscan",
    abiFound: true,
    targetFunction: "withdraw(uint256)",
    relevantLines: [125, 130],
    involvedStateVariables: ["userBalances", "lockFlag"],
    description: "External call detected on line 125 before state update to 'userBalances' on line 130.",
  },
  impactAssessment: {
    basicImpacts: ["Fund Loss", "State Corruption"],
    affectedComponents: ["User Balances", "Protocol Liquidity"],
    potentialConsequences: [
      "Reputational Damage",
      "Loss of User Trust",
      "Protocol Instability",
      "Potential for cascading failures in dependent protocols",
    ],
  },
  evidence: {
    sourceAvailable: true,
    codeSnippet: `function withdraw(uint256 amount) external {
  require(userBalances[msg.sender] >= amount, "Insufficient balance");
  
  // VULNERABLE: External call before state update
  (bool success, ) = msg.sender.call{value: amount}("");
  require(success, "Transfer failed");
  
  // TOO LATE: State updated after external call
  userBalances[msg.sender] -= amount;
}`,
    notes: "Analysis focused on source code. Bytecode not deeply inspected.",
  },
}

export default function AnalysisReportPage({ params }: { params: { id: string } }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PatternFound":
        return (
          <Badge variant="destructive" className="text-sm py-1 px-2">
            🔴 Pattern Found
          </Badge>
        )
      case "PatternNotFound":
        return <Badge className="bg-green-600 hover:bg-green-700 text-sm py-1 px-2">🟢 Pattern Not Found</Badge>
      case "Inconclusive":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500 text-sm py-1 px-2">
            🟠 Inconclusive
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-sm py-1 px-2">
            {status}
          </Badge>
        )
    }
  }

  const getConfidenceBadge = (confidence: string) => {
    switch (confidence) {
      case "High":
        return <span className="text-green-400">High Confidence</span>
      case "Medium":
        return <span className="text-amber-400">Medium Confidence</span>
      case "Low":
        return <span className="text-red-400">Low Confidence</span>
      default:
        return <span>{confidence}</span>
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/agents/analyzer/reports"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Link>
      </div>

      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-white">{analysisReport.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">Contract:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`https://etherscan.io/address/${analysisReport.contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                      >
                        {`${analysisReport.contractAddress.substring(0, 6)}...${analysisReport.contractAddress.substring(analysisReport.contractAddress.length - 4)}`}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View on Etherscan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">Chain:</span>
                <span className="text-white">
                  {analysisReport.chain.name} ({analysisReport.chain.id})
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-gray-400 justify-end">
              <Clock className="h-4 w-4 mr-1" />
              <span>Analyzed: {formatDate(analysisReport.timestamp)}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              ID: {analysisReport.id}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 ml-1 text-gray-500 hover:text-gray-300"
                onClick={() => copyToClipboard(analysisReport.id)}
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy ID</span>
              </Button>
              {copied && <span className="text-xs text-emerald-500 ml-1">Copied!</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-6"
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-400">Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-3">
                  <span className="text-gray-400 block text-sm mb-1">Vulnerability Type:</span>
                  <span className="text-white font-medium">{analysisReport.vulnerabilityType}</span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-400 block text-sm mb-1">Analysis Result:</span>
                  {getStatusBadge(analysisReport.checkResult)}
                </div>
              </div>
              <div>
                <div className="mb-3">
                  <span className="text-gray-400 block text-sm mb-1">Confidence:</span>
                  {getConfidenceBadge(analysisReport.confidence)}
                </div>
                <div>
                  <span className="text-gray-400 block text-sm mb-1">Potential Immediate Impact:</span>
                  <span className="text-red-400 font-medium">{analysisReport.basicImpact}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technical Analysis Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-6"
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-400">Technical Findings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">Data Source</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">Source Code:</span>
                    <span className="text-white">{analysisReport.technicalFindings.sourceCodeStatus}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">Origin:</span>
                    <span className="text-white">{analysisReport.technicalFindings.sourceOrigin}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">ABI Found:</span>
                    <span className="text-white">{analysisReport.technicalFindings.abiFound ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Context</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">Target Function:</span>
                    <code className="text-emerald-300 bg-gray-800 px-1 py-0.5 rounded font-mono">
                      {analysisReport.technicalFindings.targetFunction}
                    </code>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">Relevant Lines:</span>
                    <span className="text-white">{analysisReport.technicalFindings.relevantLines.join(", ")}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-400 w-28">State Variables:</span>
                    <div className="flex flex-wrap gap-1">
                      {analysisReport.technicalFindings.involvedStateVariables.map((variable, index) => (
                        <code key={index} className="text-blue-300 bg-gray-800 px-1 py-0.5 rounded font-mono">
                          {variable}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-white font-medium mb-2">Description</h3>
              <p className="text-gray-300">{analysisReport.technicalFindings.description}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Impact Assessment Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-6"
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-400">Impact Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">Basic Impact(s)</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.impactAssessment.basicImpacts.map((impact, index) => (
                    <Badge key={index} variant="outline" className="border-red-500 text-red-400">
                      {impact}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-white font-medium mt-4 mb-2">Affected Component(s)</h3>
                <div className="flex flex-wrap gap-2">
                  {analysisReport.impactAssessment.affectedComponents.map((component, index) => (
                    <Badge key={index} variant="outline" className="border-amber-500 text-amber-400">
                      {component}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Potential Long-Term Consequences</h3>
                <ul className="space-y-2 text-gray-300">
                  {analysisReport.impactAssessment.potentialConsequences.map((consequence, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      <span>{consequence}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Evidence Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-emerald-400">Evidence</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-white font-medium mb-2">Code Snippet</h3>
            {analysisReport.evidence.sourceAvailable ? (
              <div className="relative">
                <div className="absolute right-2 top-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(analysisReport.evidence.codeSnippet)}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy code</span>
                  </Button>
                </div>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm font-mono text-gray-300 mb-4">
                  <code>{analysisReport.evidence.codeSnippet}</code>
                </pre>
              </div>
            ) : (
              <div className="bg-gray-800 p-4 rounded-md text-gray-400 mb-4">
                Source code not available for snippet display.
              </div>
            )}

            <h3 className="text-white font-medium mb-2">Agent Notes</h3>
            <p className="text-gray-300 text-sm italic">{analysisReport.evidence.notes}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mt-8 flex flex-wrap gap-4 justify-end"
      >
        <Button variant="outline" className="border-gray-700 text-gray-400">
          <FileCode className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Create Security Alert
        </Button>
      </motion.div>
    </div>
  )
}
