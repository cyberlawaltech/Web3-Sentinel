"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnalyzerNav } from "../components/analyzer-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ExternalLink, BookOpen, Shield, Search, Database, Code } from "lucide-react"
import Link from "next/link"

// Sample vulnerability data
const vulnerabilityData = [
  {
    id: "V001",
    name: "Reentrancy",
    severity: "high",
    description:
      "A vulnerability where a contract can be interrupted during execution and called repeatedly before the first execution is complete.",
    cveLinks: ["CVE-2018-10299", "CVE-2018-10376"],
    owaspLinks: ["A06:2021-Vulnerable and Outdated Components"],
    resources: [
      {
        title: "Understanding Reentrancy Attacks",
        url: "https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/",
      },
      { title: "SWC-107: Reentrancy", url: "https://swcregistry.io/docs/SWC-107" },
    ],
    mitigation: "Implement checks-effects-interactions pattern and consider using reentrancy guards.",
  },
  {
    id: "V002",
    name: "Access Control",
    severity: "high",
    description:
      "Insufficient access controls allow unauthorized users to execute sensitive functions or access private data.",
    cveLinks: ["CVE-2018-1000203", "CVE-2018-1000006"],
    owaspLinks: ["A01:2021-Broken Access Control"],
    resources: [
      { title: "Access Control Design", url: "https://docs.openzeppelin.com/contracts/4.x/access-control" },
      { title: "SWC-105: Unprotected Ether Withdrawal", url: "https://swcregistry.io/docs/SWC-105" },
    ],
    mitigation: "Implement proper role-based access control and use modifiers to restrict function access.",
  },
  {
    id: "V003",
    name: "Flash Loan Attacks",
    severity: "high",
    description:
      "Exploits that leverage flash loans to manipulate market prices and exploit vulnerable DeFi protocols.",
    cveLinks: ["CVE-2020-13242"],
    owaspLinks: ["A04:2021-Insecure Design"],
    resources: [
      {
        title: "Understanding Flash Loan Attacks",
        url: "https://consensys.net/diligence/blog/2020/flash-loans-and-the-emergence-of-protocol-manipulations/",
      },
      { title: "DeFi Security Best Practices", url: "https://github.com/defi-defense-dao/defi-risk-tools-list" },
    ],
    mitigation:
      "Implement time-weighted average price (TWAP) oracles and avoid using spot prices for critical operations.",
  },
  {
    id: "V004",
    name: "Integer Overflow/Underflow",
    severity: "medium",
    description:
      "Arithmetic operations that exceed the maximum or minimum size of the integer type, causing unexpected behavior.",
    cveLinks: ["CVE-2018-10299", "CVE-2018-10706"],
    owaspLinks: ["A03:2021-Injection"],
    resources: [
      { title: "SafeMath Library", url: "https://docs.openzeppelin.com/contracts/4.x/api/utils#SafeMath" },
      { title: "SWC-101: Integer Overflow and Underflow", url: "https://swcregistry.io/docs/SWC-101" },
    ],
    mitigation:
      "Use SafeMath library for Solidity versions < 0.8.0 or use a compiler version >= 0.8.0 with built-in overflow checks.",
  },
  {
    id: "V005",
    name: "Front-Running",
    severity: "medium",
    description: "Transactions can be observed in the mempool and front-run by paying higher gas fees.",
    cveLinks: [],
    owaspLinks: ["A05:2021-Security Misconfiguration"],
    resources: [
      {
        title: "Front-Running Prevention",
        url: "https://consensys.github.io/smart-contract-best-practices/attacks/front-running/",
      },
      { title: "SWC-114: Transaction Order Dependence", url: "https://swcregistry.io/docs/SWC-114" },
    ],
    mitigation: "Implement commit-reveal schemes or use a private mempool solution.",
  },
]

// Knowledge base sources
const knowledgeBases = [
  { name: "Smart Contract Weakness Classification (SWC)", url: "https://swcregistry.io/" },
  { name: "Common Vulnerabilities and Exposures (CVE)", url: "https://cve.mitre.org/" },
  { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
  {
    name: "Consensys Smart Contract Best Practices",
    url: "https://consensys.github.io/smart-contract-best-practices/",
  },
  {
    name: "Ethereum Smart Contract Security Best Practices",
    url: "https://ethereum.org/en/developers/docs/smart-contracts/security/",
  },
  { name: "DeFi Safety", url: "https://www.defisafety.com/" },
]

export default function VulnerabilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVulnerabilities = vulnerabilityData.filter(
    (vuln) =>
      vuln.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vuln.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <AnalyzerNav />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Vulnerability Knowledge Base</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search vulnerabilities..."
              className="pl-8 bg-gray-800 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="vulnerabilities" className="mb-8">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-emerald-600">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Vulnerabilities
            </TabsTrigger>
            <TabsTrigger value="databases" className="data-[state=active]:bg-emerald-600">
              <Database className="h-4 w-4 mr-2" />
              Knowledge Bases
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vulnerabilities" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              {filteredVulnerabilities.length > 0 ? (
                filteredVulnerabilities.map((vulnerability) => (
                  <Card key={vulnerability.id} className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl text-white flex items-center">
                          {vulnerability.name}
                          <Badge
                            className={`ml-3 ${
                              vulnerability.severity === "high"
                                ? "bg-red-600"
                                : vulnerability.severity === "medium"
                                  ? "bg-amber-600"
                                  : "bg-blue-600"
                            }`}
                          >
                            {vulnerability.severity}
                          </Badge>
                        </CardTitle>
                        <div className="text-sm text-gray-400">ID: {vulnerability.id}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">{vulnerability.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <h3 className="text-lg font-medium text-emerald-400 mb-2 flex items-center">
                            <Shield className="h-5 w-5 mr-2" />
                            Mitigation Strategy
                          </h3>
                          <p className="text-gray-300">{vulnerability.mitigation}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-emerald-400 mb-2 flex items-center">
                            <ExternalLink className="h-5 w-5 mr-2" />
                            External References
                          </h3>

                          {vulnerability.cveLinks.length > 0 && (
                            <div className="mb-2">
                              <h4 className="text-sm font-medium text-gray-400">CVE Entries:</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {vulnerability.cveLinks.map((cve) => (
                                  <Link
                                    href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cve}`}
                                    target="_blank"
                                    key={cve}
                                  >
                                    <Badge variant="outline" className="hover:bg-gray-800">
                                      {cve} <ExternalLink className="h-3 w-3 ml-1" />
                                    </Badge>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {vulnerability.owaspLinks.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-400">OWASP References:</h4>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {vulnerability.owaspLinks.map((owasp) => (
                                  <Link href={`https://owasp.org/Top10/`} target="_blank" key={owasp}>
                                    <Badge variant="outline" className="hover:bg-gray-800">
                                      {owasp} <ExternalLink className="h-3 w-3 ml-1" />
                                    </Badge>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-emerald-400 mb-2 flex items-center">
                          <BookOpen className="h-5 w-5 mr-2" />
                          Educational Resources
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {vulnerability.resources.map((resource, index) => (
                            <Link
                              href={resource.url}
                              target="_blank"
                              key={index}
                              className="flex items-center p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                            >
                              <div className="mr-2 p-1 rounded-full bg-emerald-900/30">
                                <BookOpen className="h-4 w-4 text-emerald-400" />
                              </div>
                              <span className="text-sm text-gray-300">{resource.title}</span>
                              <ExternalLink className="h-3 w-3 ml-auto text-gray-400" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white mr-2">
                          <Code className="h-4 w-4 mr-2" />
                          View Affected Code
                        </Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <Shield className="h-4 w-4 mr-2" />
                          Generate Fix
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="pt-6 text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No vulnerabilities found matching your search criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="databases" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">Security Knowledge Bases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {knowledgeBases.map((kb, index) => (
                    <Link
                      href={kb.url}
                      target="_blank"
                      key={index}
                      className="flex items-center p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      <div className="mr-3 p-2 rounded-full bg-emerald-900/30">
                        <Database className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{kb.name}</h3>
                        <p className="text-sm text-gray-400">{kb.url}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </Link>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-emerald-400 mb-4">Connect Additional Knowledge Bases</h3>
                  <div className="flex items-center">
                    <Input placeholder="Enter knowledge base URL" className="bg-gray-800 border-gray-700 mr-2" />
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  )
}
