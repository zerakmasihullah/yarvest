"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function TermsOfServicePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using Yarvest, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to these Terms of Service, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of the Platform</h2>
                <p className="leading-relaxed mb-3">You agree to use Yarvest only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Interfere with the operation of the platform</li>
                  <li>Impersonate any person or entity</li>
                  <li>Collect user information without authorization</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
                <p className="leading-relaxed">
                  To access certain features, you must register for an account. You are responsible for maintaining the 
                  confidentiality of your account credentials and for all activities that occur under your account. 
                  You agree to provide accurate and complete information and to update it as necessary.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Products and Services</h2>
                <p className="leading-relaxed mb-3">
                  Yarvest connects buyers with local farmers and producers. We do not directly sell products but facilitate 
                  transactions between users. We are not responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The quality, safety, or legality of products listed</li>
                  <li>The accuracy of product descriptions</li>
                  <li>The ability of sellers to complete transactions</li>
                  <li>Delivery times or product availability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payments</h2>
                <p className="leading-relaxed">
                  All payments are processed through secure third-party payment processors. You agree to provide valid 
                  payment information and authorize us to charge your payment method for purchases. Prices are subject to 
                  change without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Refunds</h2>
                <p className="leading-relaxed">
                  Return and refund policies vary by seller. Please review individual seller policies before making a purchase. 
                  Yarvest facilitates communication between buyers and sellers regarding returns and refunds but is not responsible 
                  for resolving disputes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content on Yarvest, including text, graphics, logos, and software, is the property of Yarvest or its 
                  content suppliers and is protected by copyright and other intellectual property laws. You may not reproduce, 
                  distribute, or create derivative works without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  Yarvest is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, 
                  special, or consequential damages arising from your use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
                <p className="leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. 
                  Your continued use of the platform constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-2">
                  Email: <a href="mailto:legal@yarvest.health" className="text-[#5a9c3a] hover:underline">legal@yarvest.health</a>
                </p>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
