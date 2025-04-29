import { PageLayout } from "@/components/page-layout"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function TeamPage() {
  return (
    <PageLayout title="Our Team" description="Meet the experts behind Web3 Sentinel's security platform">
      <p className="mb-8">
        Our team brings together expertise in blockchain security, artificial intelligence, and software development.
        We're united by a shared passion for creating a more secure Web3 ecosystem and advancing the state of the art in
        blockchain security.
      </p>

      <h2 className="text-2xl font-bold mb-6">Leadership Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {leadershipTeam.map((member) => (
          <div key={member.name} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="aspect-square relative bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center bg-emerald-900/20">
                <span className="text-6xl font-bold text-emerald-500/30">{member.name.charAt(0)}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Development Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {developmentTeam.map((member) => (
          <div key={member.name} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Security Research Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {researchTeam.map((member) => (
          <div key={member.name} className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>
              <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
              <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-emerald-400">Join Our Team</h3>
        <p className="mb-4">
          We're always looking for talented individuals who are passionate about blockchain security and AI. If you're
          interested in joining our team, check out our current openings or send us your resume.
        </p>
        <a href="/careers" className="text-emerald-400 hover:text-emerald-300 transition-colors">
          View open positions →
        </a>
      </div>
    </PageLayout>
  )
}

const leadershipTeam = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former security researcher at a major blockchain security firm with 10+ years of experience in cybersecurity.",
    twitter: "https://twitter.com/alexchen",
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    bio: "AI specialist with a background in machine learning and blockchain technology. Previously led security at a major DeFi protocol.",
    twitter: "https://twitter.com/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Research",
    bio: "Blockchain security researcher with multiple CVEs and published papers on smart contract vulnerabilities.",
    twitter: "https://twitter.com/mrodriguez",
    github: "https://github.com/mrodriguez",
    linkedin: "https://linkedin.com/in/mrodriguez",
  },
]

const developmentTeam = [
  {
    name: "David Kim",
    role: "Lead Developer",
    bio: "Full-stack developer specializing in blockchain and AI integration.",
    github: "https://github.com/davidkim",
  },
  {
    name: "Emily Zhang",
    role: "AI Engineer",
    bio: "Develops and trains the AI models that power our security agents.",
    github: "https://github.com/emilyzhang",
  },
  {
    name: "James Wilson",
    role: "Frontend Developer",
    bio: "Creates intuitive interfaces for complex security data.",
    github: "https://github.com/jameswilson",
  },
  {
    name: "Priya Patel",
    role: "Backend Developer",
    bio: "Builds the infrastructure that powers our multi-agent system.",
    github: "https://github.com/priyapatel",
  },
]

const researchTeam = [
  {
    name: "Thomas Lee",
    role: "Security Researcher",
    bio: "Specializes in DeFi vulnerabilities and attack vectors.",
    twitter: "https://twitter.com/thomaslee",
  },
  {
    name: "Sophia Garcia",
    role: "Smart Contract Auditor",
    bio: "Expert in Solidity and EVM security patterns.",
    twitter: "https://twitter.com/sophiagarcia",
  },
  {
    name: "Ryan Taylor",
    role: "Threat Intelligence",
    bio: "Monitors the blockchain ecosystem for emerging threats.",
    twitter: "https://twitter.com/ryantaylor",
  },
  {
    name: "Aisha Khan",
    role: "Security Analyst",
    bio: "Analyzes and documents new attack techniques.",
    twitter: "https://twitter.com/aishakhan",
  },
]
