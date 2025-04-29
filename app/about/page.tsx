import { PageLayout } from "@/components/page-layout"
import { Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <PageLayout title="About Web3 Sentinel" description="Learn about our mission to secure the blockchain ecosystem">
      <div className="flex items-center mb-8">
        <Shield className="h-12 w-12 text-emerald-500 mr-4" />
        <h2 className="text-2xl font-bold">Web3 Sentinel</h2>
      </div>

      <p className="mb-6">
        Web3 Sentinel is a cutting-edge multi-agent system designed to protect the blockchain ecosystem from security
        threats. Our platform combines advanced AI technology with specialized security expertise to provide
        comprehensive protection for blockchain projects, DeFi protocols, and Web3 applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Our Vision</h3>
          <p>
            We envision a blockchain ecosystem where security is not an afterthought but a fundamental component of
            every project. Our goal is to create a safer Web3 environment by providing accessible, powerful security
            tools and insights.
          </p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-emerald-400">Our Approach</h3>
          <p>
            We leverage a multi-agent system powered by advanced AI to continuously monitor, analyze, and mitigate
            security threats. Our agents work together to provide real-time protection and actionable insights for
            blockchain projects.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Why Web3 Sentinel?</h3>
      <ul className="space-y-4 mb-8">
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Comprehensive Protection:</strong> Our multi-agent system covers all aspects of blockchain security,
            from smart contract auditing to real-time threat monitoring and incident response.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>AI-Powered Analysis:</strong> Our advanced AI models can detect patterns and vulnerabilities that
            traditional security tools might miss.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Continuous Monitoring:</strong> We provide 24/7 monitoring of the blockchain ecosystem to identify
            emerging threats before they can be exploited.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">•</span>
          <span>
            <strong>Actionable Insights:</strong> We don't just identify problems—we provide clear, actionable
            recommendations for addressing vulnerabilities.
          </span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold mb-4">Our History</h3>
      <p className="mb-6">
        Founded in 2023, Web3 Sentinel emerged from a recognition of the growing security challenges in the rapidly
        evolving blockchain space. Our team of security researchers, blockchain developers, and AI specialists came
        together with a shared mission: to create a more secure foundation for the future of Web3.
      </p>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400">Join Us in Securing Web3</h3>
        <p>
          Whether you're a developer, security researcher, or blockchain enthusiast, we invite you to join us in our
          mission to create a more secure Web3 ecosystem. Together, we can build a foundation of trust that will enable
          the next generation of blockchain innovation.
        </p>
      </div>
    </PageLayout>
  )
}
