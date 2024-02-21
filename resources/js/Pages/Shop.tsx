import { Layout } from "@/layouts"

import { H1, Section } from "@/components/common"
import { Products, ProductsFilter } from "@/components/shop"

export default function ShopPage() {
  return (
    <Layout title="Shop">
      <div className="rounded-lg bg-primary py-20 text-center text-primary-foreground md:py-28">
        <H1 className="text-5xl font-bold md:text-7xl lg:text-7xl">Shop</H1>
      </div>

      <Section className="grid grid-cols-2 grid-rows-[auto,auto] gap-4 2md:grid-cols-[260px,1fr]">
        <ProductsFilter />
        <Products />
      </Section>
    </Layout>
  )
}
