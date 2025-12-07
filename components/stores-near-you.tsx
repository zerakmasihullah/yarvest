"use client"

import { Zap, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const stores = [
  {
    id: 1,
    name: "Local Farm Collective",
    icon: "🌾",
    deliveryTime: "12:45pm",
    deliveryDistance: "0.7 mi",
    deliveryPrice: "$$",
    pickupTime: "0.7 mi",
    categories: "Fresh Produce · Organic · Local",
    badges: ["EBT", "Lots of deals"],
    deal: "$15 off on $100+",
    dealHighlight: true,
  },
  {
    id: 2,
    name: "Sprouts Farmers Market",
    icon: "🥗",
    deliveryTime: "12:45pm",
    deliveryDistance: "1.9 mi",
    deliveryPrice: "$$",
    pickupTime: "1:30pm",
    pickupDistance: "1.9 mi",
    categories: "Organic · Groceries · Butcher Shop",
    badges: ["EBT", "No markups"],
    deal: "$20 off on $85+",
    dealHighlight: true,
  },
  {
    id: 3,
    name: "Farmer's Market Direct",
    icon: "🛒",
    deliveryTime: "12:45pm",
    deliveryDistance: "0.5 mi",
    deliveryPrice: "$",
    pickupTime: "1:30pm",
    pickupDistance: "28.3 mi",
    categories: "Groceries · Produce",
    badges: ["EBT", "No markups", "Low prices", "Lots of deals"],
    deal: "$15 off on $100+",
    dealHighlight: true,
  },
  {
    id: 4,
    name: "Market Square",
    icon: "🏪",
    deliveryTime: "1:00pm",
    deliveryDistance: "0.9 mi",
    deliveryPrice: "$",
    categories: "Pantry · Frozen Food · Dairy",
    badges: ["EBT", "Loyalty savings", "Bulk pricing"],
    deal: "$15 off on $75+",
    dealHighlight: false,
  },
  {
    id: 5,
    name: "Community Market",
    icon: "🥬",
    deliveryTime: "1:15pm",
    deliveryDistance: "15.4 mi",
    deliveryPrice: "$",
    categories: "Groceries · Home · Electronics",
    badges: ["No markups", "Low prices"],
    deal: null,
    dealHighlight: false,
  },
  {
    id: 6,
    name: "Local Produce Store",
    icon: "🌽",
    deliveryTime: "12:55pm",
    deliveryDistance: "1.7 mi",
    deliveryPrice: "$$",
    categories: "Pantry · Fresh Produce · Meat",
    badges: ["Bulk pricing"],
    deal: "$20 off on $100+",
    dealHighlight: true,
  },
]

export function StoresNearYou() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Stores near you</h2>
        <Button variant="ghost" className="text-foreground hover:bg-muted">
          Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Store Header */}
            <div className="flex items-start gap-4 p-4 border-b border-border">
              <span className="text-4xl">{store.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-lg">{store.name}</h3>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-green-600" />
                <span className="text-foreground">
                  Delivery by {store.deliveryTime} · {store.deliveryDistance} · {store.deliveryPrice}
                </span>
              </div>

              {store.pickupTime && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    Pickup {store.pickupTime ? "ready by" : "available"} {store.pickupTime} · {store.pickupDistance}
                  </span>
                </div>
              )}

              {/* Categories */}
              <p className="text-xs text-muted-foreground mt-3">{store.categories}</p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1 mt-2">
                {store.badges.map((badge) => (
                  <span key={badge} className="text-xs bg-muted text-foreground px-2 py-1 rounded">
                    {badge}
                  </span>
                ))}
              </div>

              {/* Deal */}
              {store.deal && (
                <div
                  className={`mt-3 p-2 rounded text-xs font-semibold ${
                    store.dealHighlight ? "bg-yellow-100 text-yellow-900" : "bg-muted text-foreground"
                  }`}
                >
                  {store.deal}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
