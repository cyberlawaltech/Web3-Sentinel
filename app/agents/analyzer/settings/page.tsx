"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnalyzerNav } from "../components/analyzer-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EyeIcon, EyeOffIcon, Save, RefreshCw, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AnalyzerSettingsPage() {
  const [settings, setSettings] = useState({
    agentEnabled: true,
    autoAnalyzeNewContracts: true,
    etherscanApiKey: "YOUR_ETHERSCAN_API_KEY",
    bscscanApiKey: "YOUR_BSCSCAN_API_KEY",
    minSeverity: "all",
  })

  const [showEtherscanKey, setShowEtherscanKey] = useState(false)
  const [showBscscanKey, setShowBscscanKey] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your analyzer agent settings have been updated successfully.",
      })
    }, 1500)
  }

  return (
    <>
      <AnalyzerNav />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Analyzer Agent Settings</h1>
          <p className="text-gray-400">Configure how the analyzer agent scans and reports vulnerabilities.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">Agent Status</CardTitle>
              <CardDescription>Control the analyzer agent's operational status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="agent-status" className="text-white">
                    Enable Real-time Analysis
                  </Label>
                  <p className="text-sm text-gray-400">
                    Allow the Analyzer Agent to automatically scan and identify potential vulnerabilities.
                  </p>
                </div>
                <Switch
                  id="agent-status"
                  checked={settings.agentEnabled}
                  onCheckedChange={(checked) => setSettings({ ...settings, agentEnabled: checked })}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>

              {!settings.agentEnabled && (
                <div className="mt-4 p-3 bg-amber-900/20 border border-amber-800/30 rounded-md flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-200">
                    Warning: With the analyzer disabled, no automatic vulnerability detection will occur. You can still
                    manually trigger analysis from the dashboard.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">Analysis Scope</CardTitle>
              <CardDescription>Define what the analyzer agent should monitor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-analyze" className="text-white">
                    Automatic Analysis of New Contracts
                  </Label>
                  <p className="text-sm text-gray-400">
                    Automatically analyze newly deployed contracts on monitored networks.
                  </p>
                </div>
                <Switch
                  id="auto-analyze"
                  checked={settings.autoAnalyzeNewContracts}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoAnalyzeNewContracts: checked })}
                  className="data-[state=checked]:bg-emerald-600"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">API Keys</CardTitle>
              <CardDescription>Configure API keys for blockchain explorers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="etherscan-api-key" className="text-white mb-1 block">
                  Etherscan API Key
                </Label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      id="etherscan-api-key"
                      type={showEtherscanKey ? "text" : "password"}
                      value={settings.etherscanApiKey}
                      onChange={(e) => setSettings({ ...settings, etherscanApiKey: e.target.value })}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowEtherscanKey(!showEtherscanKey)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      {showEtherscanKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button variant="outline" className="ml-2 border-gray-700 text-gray-400 hover:text-white">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">API keys enhance data retrieval from block explorers.</p>
              </div>

              <div>
                <Label htmlFor="bscscan-api-key" className="text-white mb-1 block">
                  BscScan API Key
                </Label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <Input
                      id="bscscan-api-key"
                      type={showBscscanKey ? "text" : "password"}
                      value={settings.bscscanApiKey}
                      onChange={(e) => setSettings({ ...settings, bscscanApiKey: e.target.value })}
                      className="bg-gray-800 border-gray-700 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowBscscanKey(!showBscscanKey)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
                    >
                      {showBscscanKey ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                    </button>
                  </div>
                  <Button variant="outline" className="ml-2 border-gray-700 text-gray-400 hover:text-white">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">API keys enhance data retrieval from block explorers.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-emerald-400">Vulnerability Reporting</CardTitle>
              <CardDescription>Configure how vulnerabilities are displayed and reported</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="min-severity" className="text-white mb-1 block">
                  Minimum Severity to Display
                </Label>
                <Select
                  value={settings.minSeverity}
                  onValueChange={(value) => setSettings({ ...settings, minSeverity: value })}
                >
                  <SelectTrigger id="min-severity" className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select minimum severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="medium">Medium and High</SelectItem>
                    <SelectItem value="high">High Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  Filter the vulnerabilities shown in the reports based on their severity level.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end mt-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSaveSettings} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}
