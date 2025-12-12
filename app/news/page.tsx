"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ComingSoon } from "@/components/coming-soon"
import { Newspaper } from "lucide-react"
import { useState } from "react"

export default function NewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <ComingSoon
          title="News & Stories"
          icon={Newspaper}
          description="Stay tuned for the latest updates, stories, and news from the farming community. We're working on bringing you inspiring content about sustainable agriculture, local farmers, and community initiatives."
        />
        <Footer />
      </main>
    </div>
  )
}
