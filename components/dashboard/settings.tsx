"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Save Changes</Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">General Settings</CardTitle>
              <CardDescription>Configure the general settings for the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input
                  id="system-name"
                  defaultValue="Web3 Security Multi-Agent System"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="dark">
                  <SelectTrigger id="theme" className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-scan">Automatic Scanning</Label>
                  <p className="text-sm text-gray-400">Automatically scan for new threats every hour</p>
                </div>
                <Switch id="auto-scan" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="telemetry">Share Anonymous Usage Data</Label>
                  <p className="text-sm text-gray-400">Help improve the system by sharing anonymous usage data</p>
                </div>
                <Switch id="telemetry" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">API Keys</CardTitle>
              <CardDescription>Manage API keys for external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="google-ai-key">Google AI Studio API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="google-ai-key"
                    type="password"
                    defaultValue="••••••••••••••••"
                    className="bg-gray-800 border-gray-700 flex-1"
                  />
                  <Button variant="outline" className="border-gray-700">
                    Update
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="groq-key">Groq API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="groq-key"
                    type="password"
                    defaultValue="••••••••••••••••"
                    className="bg-gray-800 border-gray-700 flex-1"
                  />
                  <Button variant="outline" className="border-gray-700">
                    Update
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="supabase-key"
                    type="password"
                    defaultValue="••••••••••••••••"
                    className="bg-gray-800 border-gray-700 flex-1"
                  />
                  <Button variant="outline" className="border-gray-700">
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="github">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">GitHub Integration</CardTitle>
              <CardDescription>Configure GitHub repository settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="github-token">GitHub Personal Access Token</Label>
                <div className="flex space-x-2">
                  <Input
                    id="github-token"
                    type="password"
                    defaultValue="••••••••••••••••"
                    className="bg-gray-800 border-gray-700 flex-1"
                  />
                  <Button variant="outline" className="border-gray-700">
                    Update
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo-name">Repository Name</Label>
                <Input id="repo-name" defaultValue="web3-security-reports" className="bg-gray-800 border-gray-700" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-commit">Automatic Commits</Label>
                  <p className="text-sm text-gray-400">Automatically commit new reports to GitHub</p>
                </div>
                <Switch id="auto-commit" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="gh-pages">GitHub Pages Publishing</Label>
                  <p className="text-sm text-gray-400">Automatically publish reports to GitHub Pages</p>
                </div>
                <Switch id="gh-pages" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Notification Settings</CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email Notifications</Label>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <Switch id="email-notif" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <Input
                  id="email-address"
                  type="email"
                  defaultValue="user@example.com"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="critical-only">Critical Alerts Only</Label>
                  <p className="text-sm text-gray-400">Only receive notifications for critical security threats</p>
                </div>
                <Switch id="critical-only" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="slack-notif">Slack Notifications</Label>
                  <p className="text-sm text-gray-400">Receive notifications in Slack</p>
                </div>
                <Switch id="slack-notif" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
