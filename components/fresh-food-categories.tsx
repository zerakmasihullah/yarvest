"use client"

import Link from "next/link"

const categories = [
  {
    name: "Fresh Fruits",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/fruits",
    color: "from-orange-400 to-red-400",
  },
  {
    name: "Vegetables",
    image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/vegetables",
    color: "from-green-400 to-emerald-500",
  },
  {
    name: "Organic Produce",
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/organic",
    color: "from-lime-400 to-green-500",
  },
  {
    name: "Leafy Greens",
    image: "https://images.pexels.com/photos/1272557/pexels-photo-1272557.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/greens",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Local Dairy",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/dairy",
    color: "from-blue-300 to-cyan-400",
  },
  {
    name: "Grains & Seeds",
    image: "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/grains",
    color: "from-amber-400 to-orange-400",
  },
  {
    name: "Farm Eggs",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/eggs",
    color: "from-yellow-300 to-amber-400",
  },
  {
    name: "Herbs & Spices",
    image: "https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/herbs",
    color: "from-purple-400 to-pink-400",
  },
  {
    name: "Meat & Poultry",
    image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/meat",
    color: "from-red-500 to-rose-600",
  },
  {
    name: "Bakery",
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/bakery",
    color: "from-amber-300 to-yellow-400",
  },
  {
    name: "Beverages",
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/beverages",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Honey & Jams",
    image: "https://images.pexels.com/photos/3323680/pexels-photo-3323680.jpeg?auto=compress&cs=tinysrgb&w=400",
    href: "/category/honey",
    color: "from-yellow-400 to-orange-400",
  },
]

export function FreshFoodCategories() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground text-base mt-2">Explore fresh, local, and organic produce</p>
        </div>
        <Link href="/categories" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <div className="group cursor-pointer text-center">
              <div className="relative overflow-hidden rounded-xl h-20 w-20 mx-auto mb-2 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-[#0A5D31] hover:scale-105">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-foreground text-xs group-hover:text-[#0A5D31] transition-colors line-clamp-2">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
