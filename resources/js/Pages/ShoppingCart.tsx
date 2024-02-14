import { Layout } from "@/layouts"

import { H1, Section } from "@/components/common"
import { CartTable, Checkout } from "@/components/shopping-cart/"

export default function ShoppingCart() {
  return (
    <Layout title="Acme | Cart">
      <Section aria-labelledby="cart">
        <H1 className="pb-8">Cart</H1>
        <div className="relative flex flex-col gap-5 md:flex-row">
          <CartTable />
          <Checkout />
        </div>
      </Section>
    </Layout>
  )
}
