"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Code,
  Database,
  Github,
  Search,
  FileSearch,
  PenToolIcon as Tool,
  Brain,
  Zap,
  Menu,
  X,
  MessageSquare,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { Footer } from "@/components/footer"

export function LandingPage() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const router = useRouter()
  const isMobile = useMobile()
  const controls = useAnimation()
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const moveX = clientX / innerWidth - 0.5
      const moveY = clientY / innerHeight - 0.5

      backgroundRef.current.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, transition: { duration: 0.5 } })
      setLoaded(true)
    }

    sequence()
  }, [controls])

  const navigateTo = (path: string) => {
    setMenuOpen(false)
    router.push(path)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradient */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-emerald-950 opacity-50 transition-transform duration-200 ease-out"
      />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-500 opacity-10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div initial={{ opacity: 0 }} animate={controls} className="relative z-10">
        {/* Header/Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold">Web3 Security</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm text-gray-300 hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Dashboard
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-0 right-0 z-40 bg-gray-900 backdrop-blur-lg bg-opacity-95 border-b border-gray-800"
            >
              <nav className="flex flex-col py-4">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigateTo(item.path)}
                    className="px-6 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => navigateTo("/dashboard")}
                  className="mx-6 mt-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                >
                  Dashboard
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Animated logo entrance */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={loaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="mb-8"
            >
              <Shield className="h-24 w-24 md:h-32 md:w-32 text-emerald-500" />
            </motion.div>

            {/* Animated text entrance */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 100 }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="text-5xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500"
              >
                Web3 Security
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: 100 }}
                animate={loaded ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="text-xl md:text-2xl text-center text-gray-400"
              >
                Multi-Agent System
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={loaded ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 1 }}
              className="text-lg md:text-xl text-center text-gray-300 max-w-2xl mb-12"
            >
              A comprehensive platform for blockchain and DeFi security analysis, threat detection, and mitigation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/dashboard">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Launch Dashboard
                </Button>
              </Link>
              <Link href="https://github.com/your-username/web3-security-agents" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-500 text-emerald-500 hover:bg-emerald-950"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Repository
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Agents section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mt-20 md:mt-32"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400">Our Multi-Agent System</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 + index * 0.1 }}
                  className="group relative bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-emerald-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-900 text-emerald-400 mb-4">
                      {agent.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-emerald-300">{agent.name}</h3>
                    <p className="text-gray-400">{agent.description}</p>
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <Link
                        href={agent.path}
                        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-20 md:mt-32"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-400">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={loaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                  className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-900/50 text-emerald-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!chatOpen ? (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setChatOpen(true)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
            >
              <MessageSquare className="h-6 w-6" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-80 h-96 md:w-96 md:h-[32rem] bg-gray-900 rounded-lg shadow-xl border border-gray-800 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-emerald-500 mr-2" />
                  <span className="font-medium">AI Assistant</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto bg-gray-950">
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center mr-2 flex-shrink-0">
                    <Brain className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello! I'm your Web3 Security Assistant. How can I help you today?</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-800 bg-gray-950">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-r-md px-4 py-2 text-sm transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const navItems = [
  { label: "Home", path: "/" },
  { label: "Agents", path: "/agents" },
  { label: "Threats", path: "/dashboard?tab=threats" },
  { label: "Reports", path: "/dashboard?tab=reports" },
  { label: "Tools", path: "/dashboard?tab=tools" },
]

const agents = [
  {
    name: "LLM Assistant",
    description: "Provides security consultation and manages other agents",
    icon: <Brain className="h-6 w-6" />,
    path: "/agents/llm",
  },
  {
    name: "Scraper Agent",
    description: "Extracts security threats from blogs, forums, and social media",
    icon: <Search className="h-6 w-6" />,
    path: "/agents/scraper",
  },
  {
    name: "Analyzer Agent",
    description: "Performs in-depth analysis of exploits and vulnerabilities",
    icon: <FileSearch className="h-6 w-6" />,
    path: "/agents/analyzer",
  },
  {
    name: "Researcher Agent",
    description: "Organizes blockchain security knowledge and research",
    icon: <Database className="h-6 w-6" />,
    path: "/agents/researcher",
  },
  {
    name: "Solution Architect",
    description: "Suggests mitigation strategies for security issues",
    icon: <Zap className="h-6 w-6" />,
    path: "/agents/architect",
  },
  {
    name: "Toolsmith Agent",
    description: "Identifies and evaluates open-source security tools",
    icon: <Tool className="h-6 w-6" />,
    path: "/agents/toolsmith",
  },
  {
    name: "Coder Agent",
    description: "Develops and implements security tools and fixes",
    icon: <Code className="h-6 w-6" />,
    path: "/agents/coder",
  },
  {
    name: "GitHub Manager",
    description: "Manages repository and publishes findings online",
    icon: <Github className="h-6 w-6" />,
    path: "/agents/github",
  },
]

const features = [
  {
    title: "Real-time Threat Detection",
    description: "Continuously monitor the blockchain ecosystem for emerging security threats and vulnerabilities.",
    icon: <AlertTriangle className="h-6 w-6" />,
  },
  {
    title: "Comprehensive Analysis",
    description: "Perform in-depth technical analysis of exploits, vulnerabilities, and attack vectors.",
    icon: <FileSearch className="h-6 w-6" />,
  },
  {
    title: "Automated Reporting",
    description: "Generate detailed security reports and publish findings to GitHub Pages automatically.",
    icon: <FileText className="h-6 w-6" />,
  },
]
