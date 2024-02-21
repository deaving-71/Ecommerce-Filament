import { H2, Section } from "../common"
import { ProductGrid } from "../shop"

export function FeaturedProducts() {
  return (
    <Section aria-labelledby="Featured Products">
      <H2 className="pb-8">Featured Products</H2>
      <ProductGrid limit={8} />
    </Section>
  )
}
