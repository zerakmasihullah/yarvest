"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { useState } from "react"

export default function CookiePolicyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-sm max-w-none space-y-8 text-gray-700">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies</h2>
                <p className="leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely 
                  used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="leading-relaxed mb-3">Yarvest uses cookies for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
                  <li><strong>Authentication:</strong> To keep you logged in and maintain your session</li>
                  <li><strong>Preferences:</strong> To remember your settings and preferences</li>
                  <li><strong>Analytics:</strong> To understand how users interact with our platform</li>
                  <li><strong>Marketing:</strong> To deliver relevant advertisements (with your consent)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Strictly Necessary Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies are essential for the platform to function. They enable core functionality such as 
                      security, network management, and accessibility. You cannot opt-out of these cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies help us understand how visitors interact with our platform by collecting and reporting 
                      information anonymously. This helps us improve the way our platform works.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Functionality Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies allow the platform to remember choices you make and provide enhanced, personalized features. 
                      They may also be used to provide services you have requested.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeting Cookies</h3>
                    <p className="leading-relaxed">
                      These cookies may be set through our site by advertising partners. They may be used to build a profile 
                      of your interests and show you relevant content on other sites.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Cookies</h2>
                <p className="leading-relaxed">
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
                  and deliver advertisements. These third parties may use cookies to collect information about your online 
                  activities across different websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Managing Cookies</h2>
                <p className="leading-relaxed mb-3">
                  You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you 
                  can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you 
                  from taking full advantage of the platform.
                </p>
                <p className="leading-relaxed">
                  You can manage cookie preferences through your browser settings. Instructions for popular browsers:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#5a9c3a] hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-[#5a9c3a] hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#5a9c3a] hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#5a9c3a] hover:underline">Microsoft Edge</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
                <p className="leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                  operational, legal, or regulatory reasons. Please review this page periodically for updates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                <p className="leading-relaxed">
                  If you have questions about our use of cookies, please contact us at:
                </p>
                <p className="mt-2">
                  Email: <a href="mailto:privacy@yarvest.health" className="text-[#5a9c3a] hover:underline">privacy@yarvest.health</a>
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
