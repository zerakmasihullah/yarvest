"use client"

const categories = [
  { icon: "🥚", label: "Eggs" },
  { icon: "🥛", label: "Dairy" },
  { icon: "🍰", label: "Bakery" },
  { icon: "🌻", label: "Flowers" },
  { icon: "🍷", label: "Wine" },
  { icon: "🍺", label: "Beer" },
  { icon: "🍗", label: "Chicken" },
  { icon: "🥩", label: "Beef" },
  { icon: "🧺", label: "Laundry" },
  { icon: "🧻", label: "Tissue" },
  { icon: "🐾", label: "Pet Food" },
  { icon: "🥕", label: "Produce" },
]

export function GroceryCategories() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-4">Grocery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.label}
            className="flex flex-col items-center gap-3 p-4 bg-muted hover:bg-muted rounded-2xl transition-colors"
          >
            <span className="text-3xl">{category.icon}</span>
            <span className="text-sm font-medium text-foreground text-center">{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
