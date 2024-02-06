import { Product } from "@/types"
import { ProductCard } from ".";

export type ProductGridProps = {
products: Product[],
limit?: number;
}

export function ProductGrid({products, limit}: ProductGridProps) {
  return (
      <ul  className="grid grid-cols-4 gap-4">
        {products.slice(0, limit).map((product, idx) => <ProductCard key={product.slug + idx} {...product} />)}
      </ul>
  )
}
