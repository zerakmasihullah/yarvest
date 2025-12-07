"use client"

import Link from "next/link"

const sponsors = [
  {
    name: "Fresh Valley Co-op",
    logo: "https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Supporting local farmers",
    href: "/sponsors/fresh-valley",
  },
  {
    name: "Organic Certified Network",
    logo: "https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "100% Certified Organic",
    href: "/sponsors/organic-certified",
  },
  {
    name: "Local Harvest Alliance",
    logo: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Farm to table excellence",
    href: "/sponsors/local-harvest",
  },
  {
    name: "Sustainable Growth Initiative",
    logo: "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Eco-friendly practices",
    href: "/sponsors/sustainable",
  },
]

export function SponsorsSection() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Trusted Partners</h2>
          <p className="text-muted-foreground text-base mt-2">Supporting sustainable local agriculture</p>
        </div>
        <Link href="/sponsors" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <Link key={sponsor.name} href={sponsor.href}>
            <div className="group cursor-pointer h-full">
              <div className="relative overflow-hidden rounded-2xl h-48 shadow-md hover:shadow-xl transition-all duration-300 bg-secondary border-2 border-transparent hover:border-[#0A5D31]">
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-bold text-white text-base">{sponsor.name}</h3>
                  <p className="text-white/80 text-xs mt-1">{sponsor.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
