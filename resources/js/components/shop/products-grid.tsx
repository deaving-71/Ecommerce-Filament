import { useShopPageProps } from "@/hooks"

import { cn } from "@/lib/utils"

import { ProductCard } from "./product-card"

export type ProductGridProps = React.ComponentPropsWithoutRef<"ul"> & {
  limit?: number
}

export function ProductGrid({ limit, className, ...props }: ProductGridProps) {
  const { products } = useShopPageProps()
  const productsCollection = limit ? products.slice(0, limit) : products

  return (
    <ul
      {...props}
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {productsCollection.map((product, idx) => (
        <ProductCard key={product.slug + idx} {...product} />
      ))}
    </ul>
  )
}
