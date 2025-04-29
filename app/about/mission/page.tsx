import { PageLayout } from "@/components/page-layout"

export default function MissionPage() {
  return (
    <PageLayout
      title="Our Mission"
      description="Securing the future of blockchain technology through advanced multi-agent security systems"
    >
      <div className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 p-8 rounded-lg border border-emerald-800/50 mb-8">
        <h2 className="text-2xl font-bold text-emerald-400 mb-4">Mission Statement</h2>
        <p className="text-xl italic text-gray-300">
          "To create a more secure blockchain ecosystem by developing innovative, AI-powered security solutions that
          protect Web3 projects and their users from emerging threats, while advancing the state of the art in
          blockchain security research."
        </p>
      </div>

      <h3 className="text-2xl font-bold mb-4">Core Values</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-xl font-semibold mb-2 text-emerald-400">Innovation</h4>
          <p>
            We are committed to pushing the boundaries of what's possible in blockchain security, leveraging
            cutting-edge AI and multi-agent systems to stay ahead of evolving threats.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-xl font-semibold mb-2 text-emerald-400">Transparency</h4>
          <p>
            We believe in open communication and sharing knowledge with the community. Our research, methodologies, and
            findings are made available to help advance the collective security of the ecosystem.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-xl font-semibold mb-2 text-emerald-400">Collaboration</h4>
          <p>
            Security is a collaborative effort. We work closely with developers, researchers, and projects to create a
            more secure Web3 environment for everyone.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h4 className="text-xl font-semibold mb-2 text-emerald-400">Integrity</h4>
          <p>
            We maintain the highest ethical standards in our work, prioritizing responsible disclosure and respecting
            the privacy and security of all stakeholders.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Strategic Objectives</h3>

      <ul className="space-y-4 mb-8">
        <li className="flex">
          <span className="text-emerald-500 mr-2">1.</span>
          <span>
            <strong>Develop Advanced Security Tools:</strong> Create and refine AI-powered tools that can identify,
            analyze, and mitigate security threats in the blockchain ecosystem.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">2.</span>
          <span>
            <strong>Advance Security Research:</strong> Conduct and publish cutting-edge research on blockchain security
            vulnerabilities, attack vectors, and defense mechanisms.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">3.</span>
          <span>
            <strong>Foster Community Education:</strong> Provide resources, training, and guidance to help developers
            build more secure blockchain applications.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">4.</span>
          <span>
            <strong>Build Security Partnerships:</strong> Collaborate with projects, protocols, and security firms to
            create a more robust security ecosystem.
          </span>
        </li>
        <li className="flex">
          <span className="text-emerald-500 mr-2">5.</span>
          <span>
            <strong>Respond to Emerging Threats:</strong> Maintain a rapid response capability to address new
            vulnerabilities and attack vectors as they emerge.
          </span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>

      <p className="mb-6">
        We are committed to the long-term security and sustainability of the blockchain ecosystem. Our work is guided by
        a vision of a future where Web3 technologies can reach their full potential, built on a foundation of robust
        security and trust.
      </p>

      <p>
        By combining advanced technology with human expertise, we aim to create security solutions that are both
        powerful and accessible, enabling projects of all sizes to benefit from state-of-the-art protection against
        evolving threats.
      </p>
    </PageLayout>
  )
}
