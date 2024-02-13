import { Layout } from "@/layouts"
import { usePage } from "@inertiajs/react"

import { H1, Section } from "@/components/common"
import { CartTable } from "@/components/shopping-cart/"

export default function ShoppingCart() {
  console.log(usePage().props)
  return (
    <Layout title="Cart">
      <Section aria-labelledby="cart">
        <H1>Cart</H1>
        <CartTable />
      </Section>
    </Layout>
  )
}
