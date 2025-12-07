"use client"

import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Chef",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "The quality of produce from Yarvest is incredible! Everything is so fresh and I love supporting local farmers. My family can taste the difference.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Restaurant Owner",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "As a restaurant owner, Yarvest has been a game-changer. The direct connection with producers means better quality and fair prices. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Health Enthusiast",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "I've been using Yarvest for 6 months now and I'm never going back. The organic selection is amazing and delivery is always on time. Love it!",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Farmer",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 5,
    text: "Yarvest has helped me reach customers I never could before. The platform is easy to use and I get fair prices for my produce. It's been wonderful!",
  },
]

export function TestimonialsSection() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-3">What Our Customers Say</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Real stories from people who love fresh, local produce
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="p-6 bg-card border border-border rounded-2xl hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <Quote className="w-8 h-8 text-[#0A5D31] mb-4 opacity-50" />
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-foreground mb-6 flex-1 leading-relaxed text-sm">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                <p className="text-muted-foreground text-xs">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

