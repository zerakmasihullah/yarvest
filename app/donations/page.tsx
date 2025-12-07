"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, DollarSign, Users, TrendingUp, CheckCircle, Clock, Award, Target } from "lucide-react"
import { useState } from "react"

const donationCampaigns = [
  {
    id: 1,
    title: "Feed Families in Need",
    description: "Help provide fresh, nutritious food to families facing food insecurity in our community.",
    goal: 10000,
    raised: 6750,
    donors: 234,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=400&fit=crop",
    verified: true,
    impact: "500+ families fed",
    daysLeft: 15,
  },
  {
    id: 2,
    title: "Support Local Farmers",
    description: "Assist small-scale farmers with equipment and resources to grow their operations.",
    goal: 15000,
    raised: 8900,
    donors: 189,
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfefc4db?w=500&h=400&fit=crop",
    verified: true,
    impact: "25 farms supported",
    daysLeft: 30,
  },
  {
    id: 3,
    title: "School Garden Program",
    description: "Fund educational gardens in local schools to teach children about sustainable agriculture.",
    goal: 8000,
    raised: 4200,
    donors: 156,
    image: "https://images.unsplash.com/photo-1503676260721-1d00da88a02e?w=500&h=400&fit=crop",
    verified: true,
    impact: "12 schools reached",
    daysLeft: 22,
  },
  {
    id: 4,
    title: "Emergency Food Relief",
    description: "Provide immediate food assistance to communities affected by natural disasters.",
    goal: 20000,
    raised: 12450,
    donors: 312,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=400&fit=crop",
    verified: true,
    impact: "1000+ meals delivered",
    daysLeft: 8,
  },
  {
    id: 5,
    title: "Senior Nutrition Program",
    description: "Deliver fresh produce boxes to elderly community members who cannot access markets.",
    goal: 12000,
    raised: 7800,
    donors: 201,
    image: "https://images.unsplash.com/photo-1503676260721-1d00da88a02e?w=500&h=400&fit=crop",
    verified: true,
    impact: "300+ seniors served",
    daysLeft: 18,
  },
  {
    id: 6,
    title: "Community Food Bank",
    description: "Stock local food banks with fresh, healthy produce for year-round access.",
    goal: 25000,
    raised: 18900,
    donors: 445,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=400&fit=crop",
    verified: true,
    impact: "2000+ families",
    daysLeft: 45,
  },
]

export default function DonationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState(25)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A5D31]/10 rounded-full mb-6">
                <Heart className="w-10 h-10 text-[#0A5D31]" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Donations & Giving</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Support your community by donating to help feed families in need and support local agriculture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {donationCampaigns.map((campaign) => {
                const progress = (campaign.raised / campaign.goal) * 100
                return (
                  <Card key={campaign.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 rounded-2xl border-2 border-gray-200">
                    <div className="relative h-48 bg-gray-100">
                      <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                      {campaign.verified && (
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{campaign.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Raised</span>
                          <span className="font-semibold">${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0A5D31] h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{campaign.donors} donors</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{Math.round(progress)}% funded</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>{campaign.impact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>

                      <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white">
                        Donate Now
                      </Button>
                    </div>
                  </Card>
                )
              })}
            </div>

            <Card className="p-8 rounded-2xl border-2 border-[#0A5D31] bg-gradient-to-br from-[#0A5D31]/5 to-white">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Buy Food for Needy</h2>
                <p className="text-gray-600 mb-6">
                  Purchase food items that will be directly delivered to families in need in your community
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {[25, 50, 100, 250].map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount ? "default" : "outline"}
                      onClick={() => setDonationAmount(amount)}
                      className={`${donationAmount === amount ? "bg-[#0A5D31] text-white" : ""}`}
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button size="lg" className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white px-8">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Donate ${donationAmount}
                </Button>
              </div>
            </Card>

            {/* Impact Stats */}
            <div className="mt-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { icon: Users, value: "5,000+", label: "Families Helped" },
                  { icon: DollarSign, value: "$150K+", label: "Raised This Year" },
                  { icon: Heart, value: "2,500+", label: "Donors" },
                  { icon: Award, value: "50+", label: "Campaigns Completed" },
                ].map((stat, idx) => (
                  <Card key={idx} className="p-6 rounded-2xl border-2 border-gray-200 text-center">
                    <div className="w-14 h-14 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-7 h-7 text-[#0A5D31]" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <Card className="p-8 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-[#0A5D31]/5 to-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Community Garden Success",
                    text: "Thanks to donations, we've established 15 community gardens serving over 500 families.",
                    impact: "500+ families",
                  },
                  {
                    title: "Farmer Support Program",
                    text: "Our farmer support initiative has helped 30 small farms expand their operations.",
                    impact: "30 farms",
                  },
                  {
                    title: "School Nutrition",
                    text: "Fresh produce programs in schools have improved nutrition for 1,200+ students.",
                    impact: "1,200+ students",
                  },
                ].map((story, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">{story.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{story.text}</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#0A5D31]">
                      <Target className="w-4 h-4" />
                      {story.impact}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

