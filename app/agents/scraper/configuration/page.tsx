"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash2, Globe, Code } from "lucide-react"
import { ScraperNav } from "../components/scraper-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DataSource {
  id: string
  name: string
  domain: string
  elements: string
  frequency: string
}

export default function ScraperConfigurationPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "1",
      name: "CertiK Blog",
      domain: "certik.com/blog",
      elements: ".blog-post, .article-content, .security-alert",
      frequency: "daily",
    },
    {
      id: "2",
      name: "SlowMist Security",
      domain: "slowmist.com/security",
      elements: ".vulnerability-report, .security-update",
      frequency: "weekly",
    },
  ])

  const [newSource, setNewSource] = useState<Partial<DataSource>>({
    name: "",
    domain: "",
    elements: "",
    frequency: "daily",
  })

  const addDataSource = () => {
    if (dataSources.length >= 10) {
      return
    }

    if (!newSource.name || !newSource.domain || !newSource.elements) {
      return
    }

    setDataSources([
      ...dataSources,
      {
        id: Date.now().toString(),
        name: newSource.name,
        domain: newSource.domain,
        elements: newSource.elements,
        frequency: newSource.frequency || "daily",
      },
    ])

    setNewSource({
      name: "",
      domain: "",
      elements: "",
      frequency: "daily",
    })
  }

  const removeDataSource = (id: string) => {
    setDataSources(dataSources.filter((source) => source.id !== id))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewSource({
      ...newSource,
      [name]: value,
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <>
      <ScraperNav />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Data Sources Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">
                Configure the websites and data sources for the scraper agent to monitor. You can add up to 10 data
                sources.
              </p>

              <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                {dataSources.map((source) => (
                  <motion.div
                    key={source.id}
                    variants={item}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{source.name}</h3>
                      <p className="text-sm text-gray-400">{source.domain}</p>
                      <p className="text-xs text-gray-500 mt-1">Elements: {source.elements}</p>
                      <p className="text-xs text-emerald-400 mt-1">Frequency: {source.frequency}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDataSource(source.id)}
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {dataSources.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No data sources configured. Add your first source below.
                </div>
              )}

              {dataSources.length >= 10 && (
                <Alert className="mt-4 bg-amber-900/20 border-amber-800 text-amber-400">
                  <AlertDescription>
                    Maximum number of data sources (10) reached. Remove existing sources to add new ones.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-xl text-emerald-400 flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  addDataSource()
                }}
              >
                <div>
                  <Label htmlFor="name">Source Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., CertiK Blog"
                    value={newSource.name}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div>
                  <Label htmlFor="domain">Domain/URL</Label>
                  <Input
                    id="domain"
                    name="domain"
                    placeholder="e.g., certik.com/blog"
                    value={newSource.domain}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div>
                  <Label htmlFor="elements" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>CSS Selectors for Elements to Scrape</span>
                  </Label>
                  <Textarea
                    id="elements"
                    name="elements"
                    placeholder=".blog-post, .article-content, .security-alert"
                    value={newSource.elements}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 min-h-[100px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Specify CSS selectors for the elements you want to scrape, separated by commas.
                  </p>
                </div>

                <div>
                  <Label htmlFor="frequency">Scraping Frequency</Label>
                  <select
                    id="frequency"
                    name="frequency"
                    value={newSource.frequency}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={dataSources.length >= 10 || !newSource.name || !newSource.domain || !newSource.elements}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Data Source
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
