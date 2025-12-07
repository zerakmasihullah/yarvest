"use client"

import { Search, ShoppingCart, Truck, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Explore fresh produce from local farmers in your area. Filter by category, price, or producer.",
    step: "01",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Select your favorite items and add them to your cart. Review your order before checkout.",
    step: "02",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your fresh produce delivered to your door. Same-day delivery available in select areas.",
    step: "03",
  },
  {
    icon: Heart,
    title: "Enjoy & Support",
    description: "Enjoy fresh, locally-grown food while supporting your community farmers and sustainable agriculture.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-3">How It Works</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Getting fresh produce delivered to your door is simple and easy
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Card
              key={index}
              className="p-6 bg-card border border-border rounded-2xl hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 text-6xl font-bold text-[#0A5D31]/10 group-hover:text-[#0A5D31]/20 transition-colors">
                {step.step}
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A5D31]/10 rounded-2xl mb-4 group-hover:bg-[#0A5D31] transition-colors">
                  <Icon className="w-8 h-8 text-[#0A5D31] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

