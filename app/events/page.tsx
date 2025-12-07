"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock } from "lucide-react"
import { useState } from "react"

const allEvents = [
  {
    id: 1,
    title: "Farmers Market - Weekend",
    date: "Saturday, Dec 14",
    time: "8:00 AM - 2:00 PM",
    location: "Ferry Building, San Francisco",
    description: "Weekly farmers market featuring fresh local produce and artisan goods from over 50 vendors.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&h=400&fit=crop",
    attendees: 245,
    category: "Market",
  },
  {
    id: 2,
    title: "Harvest Celebration Festival",
    date: "Sunday, Dec 15",
    time: "10:00 AM - 5:00 PM",
    location: "Ferry Building, San Francisco",
    description: "Annual harvest celebration with live music, cooking demonstrations, and local food tastings.",
    image: "https://images.unsplash.com/photo-1533322088b9-8808f011e87b?w=500&h=400&fit=crop",
    attendees: 389,
    category: "Festival",
  },
  {
    id: 3,
    title: "Local Producers Meetup",
    date: "Wednesday, Dec 18",
    time: "6:00 PM - 8:00 PM",
    location: "Community Center, Oakland",
    description: "Networking event for local farmers, producers, and food enthusiasts to connect and collaborate.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop",
    attendees: 87,
    category: "Workshop",
  },
  {
    id: 4,
    title: "Organic Farming Workshop",
    date: "Saturday, Dec 21",
    time: "9:00 AM - 12:00 PM",
    location: "Green Valley Farm, Marin County",
    description: "Learn sustainable farming practices and organic certification from experienced local farmers.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=400&fit=crop",
    attendees: 52,
    category: "Workshop",
  },
  {
    id: 5,
    title: "Farm to Table Dinner",
    date: "Friday, Dec 20",
    time: "6:00 PM - 9:00 PM",
    location: "Local Restaurant, San Francisco",
    description: "Exclusive farm-to-table dining experience featuring menu items exclusively from local producers.",
    image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=400&fit=crop",
    attendees: 156,
    category: "Dinner",
  },
  {
    id: 6,
    title: "Cooking Demo: Seasonal Vegetables",
    date: "Thursday, Dec 19",
    time: "5:00 PM - 6:30 PM",
    location: "Community Center, San Francisco",
    description: "Professional chef demonstrates creative ways to prepare seasonal produce for maximum flavor.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop",
    attendees: 98,
    category: "Workshop",
  },
]

export default function EventsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["Market", "Festival", "Workshop", "Dinner"]
  const filteredEvents = selectedCategory ? allEvents.filter((event) => event.category === selectedCategory) : allEvents

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-12 bg-gradient-to-b from-white to-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-foreground mb-3">Upcoming Events</h1>
              <p className="text-lg text-muted-foreground">
                Join the Yarvest community at farmers markets, festivals, and workshops
              </p>
            </div>

            {/* Category Filter - Modern Style */}
            <div className="mb-10 flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="rounded-full font-semibold px-6 h-11"
              >
                All Events
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full font-semibold px-6 h-11"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl border border-border bg-white flex flex-col h-full"
                >
                  <div className="relative group overflow-hidden bg-secondary h-56">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-lg">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-3 leading-snug">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{event.description}</p>

                    <div className="space-y-3 mb-6 pb-6 border-b border-border flex-1 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.attendees} attending</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-accent text-white font-semibold rounded-lg mt-auto h-11 transition-all">
                      Learn More
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
