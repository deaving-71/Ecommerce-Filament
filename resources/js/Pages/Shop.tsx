import { Layout } from "@/layouts"
import { usePage } from "@inertiajs/react"

import { H1 } from "@/components/common"
import { Shop } from "@/components/shop"

export default function ShopPage() {
  console.log(usePage().props)
  return (
    <Layout title="Ecom | Shop">
      <div className="rounded-lg bg-primary py-20 text-center text-primary-foreground md:py-28">
        <H1 className="text-5xl font-bold md:text-7xl lg:text-7xl">Shop</H1>
      </div>

      <Shop />
    </Layout>
  )
}
