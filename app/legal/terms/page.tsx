import { PageLayout } from "@/components/page-layout"

export default function TermsPage() {
  return (
    <PageLayout
      title="Terms & Conditions"
      description="Please read these terms and conditions carefully before using our service"
    >
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 mb-8">
        <p className="text-sm text-gray-400">Last updated: April 5, 2023</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
      <p className="mb-6">
        Welcome to Web3 Sentinel ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service")
        govern your use of our website and services (collectively, the "Service") operated by Web3 Sentinel.
      </p>
      <p className="mb-6">
        By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the
        terms, then you may not access the Service.
      </p>

      <h2 className="text-2xl font-bold mb-4">2. Use of the Service</h2>
      <p className="mb-4">
        Our Service provides blockchain security analysis, threat detection, and mitigation through a multi-agent
        system. You may use our Service only as permitted by law and according to these Terms.
      </p>
      <p className="mb-6">
        To use certain features of the Service, you may be required to create an account. You are responsible for
        maintaining the confidentiality of your account information and for all activities that occur under your
        account.
      </p>

      <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
      <p className="mb-6">
        The Service and its original content, features, and functionality are and will remain the exclusive property of
        Web3 Sentinel and its licensors. The Service is protected by copyright, trademark, and other laws of both the
        United States and foreign countries.
      </p>

      <h2 className="text-2xl font-bold mb-4">4. User Content</h2>
      <p className="mb-6">
        Our Service may allow you to post, link, store, share and otherwise make available certain information, text,
        graphics, videos, or other material. You retain any rights that you may have in such content, but you grant us a
        worldwide, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and
        distribute such content.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Security Analysis and Reports</h2>
      <p className="mb-6">
        Our Service provides security analysis and reports for blockchain projects and smart contracts. While we strive
        for accuracy and thoroughness, we cannot guarantee that our analysis will identify all security vulnerabilities
        or issues. You acknowledge that security analysis is inherently limited and that new vulnerabilities may be
        discovered after our analysis is complete.
      </p>

      <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
      <p className="mb-6">
        In no event shall Web3 Sentinel, nor its directors, employees, partners, agents, suppliers, or affiliates, be
        liable for any indirect, incidental, special, consequential or punitive damages, including without limitation,
        loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or
        inability to access or use the Service.
      </p>

      <h2 className="text-2xl font-bold mb-4">6. Disclaimer</h2>
      <p className="mb-6">
        Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
        The Service is provided without warranties of any kind, whether express or implied, including, but not limited
        to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of
        performance.
      </p>

      <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
      <p className="mb-6">
        These Terms shall be governed and construed in accordance with the laws of the United States, without regard to
        its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be
        considered a waiver of those rights.
      </p>

      <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
      <p className="mb-6">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
        material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes
        a material change will be determined at our sole discretion.
      </p>

      <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
      <p className="mb-6">
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:legal@web3security.io" className="text-emerald-400 hover:text-emerald-300 transition-colors">
          legal@web3security.io
        </a>
        .
      </p>
    </PageLayout>
  )
}
