import { PageLayoutWithBreadcrumbs } from "@/components/page-layout-with-breadcrumbs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Hammer, Code, FileCode, Play, Save, Plus } from "lucide-react"

// Sample code for the editor - defined outside the component to avoid syntax issues
const sampleCode = `// Tool Builder Code Editor
// Write your tool's code here

async function analyzeContract(address) {
  // Example function to analyze a smart contract
  console.log("Analyzing contract at: " + address);
  
  // Fetch contract code
  const contractCode = await getContractCode(address);
  
  // Perform security analysis
  const vulnerabilities = scanForVulnerabilities(contractCode);
  
  return {
    address,
    vulnerabilities,
    timestamp: Date.now()
  };
}

// Helper functions
function scanForVulnerabilities(code) {
  // Implement vulnerability scanning logic
  return [];
}

async function getContractCode(address) {
  // Implement contract code fetching
  return "sample code";
}

// Export the main function
module.exports = { analyzeContract };`

export default function ToolBuilderPage() {
  return (
    <PageLayoutWithBreadcrumbs>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Tool Builder</h1>
            <p className="text-gray-400 mt-2">
              Create custom security tools for blockchain and smart contract analysis
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Save className="h-4 w-4 mr-2" />
              Save Tool
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Hammer className="h-5 w-5 mr-2 text-emerald-400" />
                  Tool Configuration
                </CardTitle>
                <CardDescription>Define your tool's basic properties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Tool Name</Label>
                  <Input id="tool-name" placeholder="Enter tool name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-description">Description</Label>
                  <Textarea
                    id="tool-description"
                    placeholder="Describe what your tool does"
                    className="bg-gray-800 border-gray-700"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-type">Tool Type</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select tool type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="analyzer">Vulnerability Analyzer</SelectItem>
                      <SelectItem value="scanner">Contract Scanner</SelectItem>
                      <SelectItem value="monitor">Transaction Monitor</SelectItem>
                      <SelectItem value="custom">Custom Tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Capabilities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start border-gray-700 hover:bg-gray-800">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Capability
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-emerald-400" />
                  Tool Development
                </CardTitle>
                <CardDescription>Build your tool's functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code" className="w-full">
                  <TabsList className="bg-gray-800 border-gray-700">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                    <TabsTrigger value="test">Test</TabsTrigger>
                  </TabsList>
                  <TabsContent value="code" className="mt-4">
                    <div className="relative h-96 rounded-md overflow-hidden border border-gray-800">
                      <div className="absolute top-0 left-0 right-0 bg-gray-800 p-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 mr-2 text-blue-400" />
                          <span className="text-sm">tool.js</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Play className="h-4 w-4 mr-1" />
                          Run
                        </Button>
                      </div>
                      <div className="pt-10 p-4 h-full bg-gray-950 text-gray-300 font-mono text-sm">
                        <pre>{sampleCode}</pre>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="visual" className="mt-4">
                    <div className="h-96 rounded-md border border-gray-800 bg-gray-950 p-4 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Code className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Visual Builder</h3>
                        <p className="max-w-md">Drag and drop components to build your tool without writing code.</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="test" className="mt-4">
                    <div className="h-96 rounded-md border border-gray-800 bg-gray-950 p-4 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Play className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-300 mb-2">Test Environment</h3>
                        <p className="max-w-md">Run tests against your tool to verify its functionality.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <div className="flex justify-between w-full">
                  <Button variant="outline" className="border-gray-700">
                    Preview
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Deploy Tool</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageLayoutWithBreadcrumbs>
  )
}
