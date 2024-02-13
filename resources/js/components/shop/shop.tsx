import { Section } from "../common"
import { Products, ProductsFilter } from "./"

export function Shop() {
  return (
    <Section className="grid grid-cols-2 grid-rows-[auto,auto] gap-4 2md:grid-cols-[260px,1fr]">
      <ProductsFilter />
      <Products />
    </Section>
  )
}
