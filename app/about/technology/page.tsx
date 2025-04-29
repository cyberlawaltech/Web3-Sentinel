import { PageLayout } from "@/components/page-layout"
import { Code, Database, Github, Search, FileSearch, PenToolIcon as Tool, Brain, Zap } from "lucide-react"

export default function TechnologyPage() {
  return (
    <PageLayout title="Our Technology Stack" description="The technologies powering Web3 Sentinel's security platform">
      <p className="mb-8">
        Web3 Sentinel leverages a cutting-edge technology stack to deliver powerful, scalable security solutions for the
        blockchain ecosystem. Our platform combines advanced AI capabilities with specialized security tools and robust
        infrastructure to provide comprehensive protection against emerging threats.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <Brain className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-xl font-bold">AI & Machine Learning</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Google AI Studio API:</strong> Powers our natural language processing capabilities
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Groq:</strong> Provides high-performance inference for our security models
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Hugging Face:</strong> Hosts specialized security-focused models
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Mistral:</strong> Powers our advanced reasoning capabilities
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>OpenRouter:</strong> Provides flexible model routing and fallback options
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <Code className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-xl font-bold">Frontend Technologies</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>React:</strong> Powers our user interfaces
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Next.js:</strong> Provides server-side rendering and API routes
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Tailwind CSS:</strong> Enables rapid UI development with consistent styling
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Framer Motion:</strong> Powers our smooth animations and transitions
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>TypeScript:</strong> Ensures type safety and code quality
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-xl font-bold">Backend & Infrastructure</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Supabase:</strong> Provides database and authentication services
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>PostgreSQL:</strong> Powers our relational database needs
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Vercel:</strong> Hosts our frontend and serverless functions
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>GitHub Actions:</strong> Manages our CI/CD pipelines
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Docker:</strong> Containerizes our services for consistent deployment
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex items-center mb-4">
            <Search className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-xl font-bold">Web Scraping & Analysis</h3>
          </div>
          <ul className="space-y-2">
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Crawl4AI:</strong> Powers our LLM-friendly web crawler and scraper
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>CrewAI:</strong> Orchestrates our multi-agent system
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>LangChain:</strong> Connects our AI models to external data sources
              </span>
            </li>
            <li className="flex">
              <span className="text-emerald-500 mr-2">•</span>
              <span>
                <strong>Vector Databases:</strong> Stores and retrieves security knowledge
              </span>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Multi-Agent Architecture</h2>

      <p className="mb-6">
        At the core of Web3 Sentinel is our multi-agent system, which combines specialized AI agents to provide
        comprehensive security analysis and protection. Each agent is designed to excel at specific tasks, and they work
        together to create a powerful, integrated security solution.
      </p>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400">Agent System Architecture</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {agents.map((agent) => (
            <div key={agent.name} className="flex">
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-gray-800 flex items-center justify-center mr-3">
                {agent.icon}
              </div>
              <div>
                <h4 className="font-semibold text-white">{agent.name}</h4>
                <p className="text-sm text-gray-400">{agent.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400">
          Our agents communicate through a central orchestration layer, sharing information and insights to create a
          comprehensive understanding of the security landscape. This architecture allows us to rapidly adapt to new
          threats and continuously improve our security capabilities.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Security & Compliance</h2>

      <p className="mb-6">
        Security is at the core of everything we do. Our platform is built with security best practices in mind, and we
        maintain strict data protection and privacy standards.
      </p>

      <ul className="space-y-4 mb-8">
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>API Key Management:</strong> Secure handling of API keys for Groq, Supabase, and other services
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>OAuth Authentication:</strong> Secure user access through Auth0
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Data Encryption:</strong> All sensitive data is encrypted at rest and in transit
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Regular Security Audits:</strong> Our own platform undergoes regular security assessments
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Responsible Disclosure:</strong> We follow industry best practices for vulnerability disclosure
          </span>
        </li>
      </ul>

      <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 p-6 rounded-lg border border-emerald-800/50">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400">Open Source Commitment</h3>
        <p className="mb-4">
          We believe in the power of open source to advance security. Many components of our platform are open source,
          allowing the community to review, contribute to, and build upon our work.
        </p>
        <a
          href="https://github.com/your-username/web3-security-agents"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Explore our GitHub repository →
        </a>
      </div>
    </PageLayout>
  )
}

const agents = [
  {
    name: "LLM Assistant",
    description: "Provides security consultation and manages other agents",
    icon: <Brain className="h-5 w-5 text-purple-400" />,
  },
  {
    name: "Scraper Agent",
    description: "Extracts security threats from various online sources",
    icon: <Search className="h-5 w-5 text-blue-400" />,
  },
  {
    name: "Analyzer Agent",
    description: "Performs in-depth analysis of exploits and vulnerabilities",
    icon: <FileSearch className="h-5 w-5 text-yellow-400" />,
  },
  {
    name: "Researcher Agent",
    description: "Organizes blockchain security knowledge and research",
    icon: <Database className="h-5 w-5 text-green-400" />,
  },
  {
    name: "Solution Architect",
    description: "Suggests mitigation strategies for security issues",
    icon: <Zap className="h-5 w-5 text-orange-400" />,
  },
  {
    name: "Toolsmith Agent",
    description: "Identifies and evaluates open-source security tools",
    icon: <Tool className="h-5 w-5 text-red-400" />,
  },
  {
    name: "Coder Agent",
    description: "Develops and implements security tools and fixes",
    icon: <Code className="h-5 w-5 text-indigo-400" />,
  },
  {
    name: "GitHub Manager",
    description: "Manages repository and publishes findings online",
    icon: <Github className="h-5 w-5 text-gray-400" />,
  },
]
