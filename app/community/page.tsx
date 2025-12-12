"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"
import { Users2 } from "lucide-react"
import { useState } from "react"

export default function CommunityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <ComingSoon
          title="Community"
          icon={Users2}
          description="We're building an amazing community platform where you can connect with local farmers, share experiences, and support sustainable agriculture together. Stay tuned!"
        />
        <Footer />
      </main>
    </div>
  )
}
