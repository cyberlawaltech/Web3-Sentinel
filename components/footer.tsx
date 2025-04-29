import Link from "next/link"
import { Shield, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-emerald-500 mr-2" />
              <span className="text-lg font-bold text-white">Web3 Security</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A comprehensive multi-agent system for blockchain and DeFi security analysis, threat detection, and
              mitigation.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/web3security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com/your-username/web3-security-agents"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/company/web3security"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:contact@web3security.io"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* About Web3 Sentinel */}
          <div>
            <h3 className="text-white font-semibold mb-4">About Web3 Sentinel</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about/mission" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Mission Statement
                </Link>
              </li>
              <li>
                <Link href="/about/team" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Team/Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/about/technology"
                  className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                >
                  Technology Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/terms" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/disclaimer"
                  className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Contact Form
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@web3security.io"
                  className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                >
                  Support Email
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contribute" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/user-manual"
                  className="text-gray-400 hover:text-emerald-500 transition-colors text-sm"
                >
                  User Manual
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-white font-semibold mb-4">More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-gray-400 hover:text-emerald-500 transition-colors text-sm">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Web3 Security Multi-Agent System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
