"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Gift, Copy, CheckCircle, Mail, Share2, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function InvitePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [friendEmail, setFriendEmail] = useState("")
  const referralCode = "YARVEST2024"
  const referralLink = `https://yarvest.com/invite/${referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInvite = () => {
    if (friendEmail) {
      alert(`Invite sent to ${friendEmail}!`)
      setFriendEmail("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Invite Friends</h1>
            <p className="text-lg text-gray-600">Share your referral code and earn $10 when they make their first purchase</p>
          </div>

          {/* Rewards - Simple Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">You Get</p>
                  <p className="text-3xl font-bold text-gray-900">$10</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Credit when they make first purchase</p>
            </Card>
            <Card className="p-8 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Friend Gets</p>
                  <p className="text-3xl font-bold text-gray-900">$10</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Off their first order</p>
            </Card>
          </div>

          {/* Referral Code - Clean Section */}
          <Card className="p-8 mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Referral Code</h2>
            
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={referralCode}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-2xl font-bold text-[#0A5D31] font-mono"
                />
                <Button
                  onClick={handleCopy}
                  className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white px-6"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono"
                />
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="border-gray-300"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-gray-300"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Join Yarvest',
                    text: `Use my referral code ${referralCode} to get $10 off your first order!`,
                    url: referralLink,
                  })
                } else {
                  handleCopy()
                }
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </Card>

          {/* Email Invite - Simple Form */}
          <Card className="p-8 mb-12 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Invite by Email</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="friend@example.com"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                />
              </div>
              <Button
                onClick={handleInvite}
                className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </Card>

          {/* Stats - Simple Grid */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
              <div className="text-sm text-gray-600">Friends Invited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
              <div className="text-sm text-gray-600">Active Referrals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0A5D31] mb-1">$80</div>
              <div className="text-sm text-gray-600">Total Rewards</div>
            </div>
          </div>

          {/* How It Works - Simple Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Share Code", desc: "Send your referral code to friends" },
                { step: "2", title: "They Sign Up", desc: "Friends create account using your code" },
                { step: "3", title: "They Shop", desc: "Friends make their first purchase" },
                { step: "4", title: "You Both Win", desc: "You both get $10 credit" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-[#0A5D31] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Terms - Simple Text */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Referral credits applied after friend's first purchase</li>
              <li>• Credits expire 90 days after issuance</li>
              <li>• Maximum 50 referrals per account</li>
              <li>• Credits cannot be combined with other promotions</li>
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
