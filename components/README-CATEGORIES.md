# Category Components Documentation

This document describes the reusable category components and their usage.

## Components Overview

### 1. ApiCategoryCard
A flexible, reusable card component for displaying categories with three variants.

**File:** `components/api-category-card.tsx`

#### Props
```typescript
interface ApiCategoryCardProps {
  category: ApiCategory
  onClick?: (category: ApiCategory) => void
  className?: string
  variant?: "default" | "compact" | "featured"
}
```

#### Variants

**Compact** - For homepage/grid displays
- Small 80x80px image
- Minimal text
- Hover effects
- Perfect for 12-column grids

**Default** - For category listing pages
- Larger card with image and details
- Badges (Fresh, Local, Product Count)
- Description text
- Arrow indicator

**Featured** - For hero sections
- Large image with gradient overlay
- Product count display
- Prominent badges
- Enhanced hover effects

#### Usage Examples

```tsx
// Compact variant (homepage)
<ApiCategoryCard 
  category={category} 
  variant="compact"
/>

// Default variant (category page)
<ApiCategoryCard 
  category={category} 
  variant="default"
  onClick={handleCategoryClick}
/>

// Featured variant (hero section)
<ApiCategoryCard 
  category={category} 
  variant="featured"
  className="col-span-2"
/>
```

### 2. CategoryModal
A detailed modal for displaying category information.

**File:** `components/category-modal.tsx`

#### Props
```typescript
interface CategoryModalProps {
  category: ApiCategory | null
  isOpen: boolean
  onClose: () => void
}
```

#### Features
- Large category image with gradient overlay
- Product count display
- Category badges (Fresh, Local, Organic)
- Detailed description
- Feature highlights
- Category stats
- "Browse Products" CTA button

#### Usage Example

```tsx
const [selectedCategory, setSelectedCategory] = useState<ApiCategory | null>(null)
const [isModalOpen, setIsModalOpen] = useState(false)

<CategoryModal
  category={selectedCategory}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

### 3. CategoryCardSkeleton
Loading skeleton for category cards.

**File:** `components/category-card-skeleton.tsx`

#### Props
```typescript
interface CategoryCardSkeletonProps {
  count?: number
  variant?: "default" | "compact" | "featured"
}
```

#### Usage Example

```tsx
// Loading state
<CategoryCardSkeleton count={12} variant="compact" />
<CategoryCardSkeleton count={6} variant="default" />
<CategoryCardSkeleton count={3} variant="featured" />
```

## Data Structure

### ApiCategory Interface
```typescript
interface ApiCategory {
  id: number
  unique_id: string
  name: string
  image?: string
  slug?: string
  created_at?: string
  updated_at?: string
  products_count?: number
  description?: string
}
```

## Grid Layouts

### Homepage (Compact)
```tsx
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
  {categories.map(category => (
    <ApiCategoryCard key={category.id} category={category} variant="compact" />
  ))}
</div>
```

### Category Page (Default)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {categories.map(category => (
    <ApiCategoryCard key={category.id} category={category} variant="default" />
  ))}
</div>
```

### Featured Section
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {categories.map(category => (
    <ApiCategoryCard key={category.id} category={category} variant="featured" />
  ))}
</div>
```

## Integration with ApiDataFetcher

```tsx
<ApiDataFetcher<ApiCategory>
  url="/categories"
  gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  renderItem={(category) => (
    <ApiCategoryCard
      key={category.id}
      category={category}
      variant="default"
      onClick={handleCategoryClick}
    />
  )}
  renderLoading={() => <CategoryCardSkeleton count={6} variant="default" />}
  renderEmpty={() => <EmptyState />}
  renderError={(error, retry) => <ErrorState error={error} retry={retry} />}
/>
```

## Best Practices

1. **Always provide unique_id** - Required for routing
2. **Use appropriate variant** - Match the context (homepage, listing, featured)
3. **Handle loading states** - Use CategoryCardSkeleton
4. **Optimize images** - Use getImageUrl utility
5. **Error handling** - Provide fallback images
6. **Accessibility** - Cards are keyboard navigable via Link components

## Styling

All components use:
- Tailwind CSS for styling
- Consistent color scheme (#0A5D31 for primary green)
- Smooth transitions and hover effects
- Responsive design
- Dark mode ready (via Tailwind classes)

## Performance

- Images lazy load by default
- Skeleton loading prevents layout shift
- Optimized re-renders with React.memo potential
- Efficient grid layouts

## Future Enhancements

- [ ] Add category filtering
- [ ] Add sorting options
- [ ] Add favorite categories
- [ ] Add category analytics
- [ ] Add category search within modal
- [ ] Add related categories

