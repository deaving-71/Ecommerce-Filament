import { Layout } from "@/layouts"
import { CartItem, Order, SharedProps } from "@/types"

import { Section } from "@/components/common"
import { InvoiceTable } from "@/components/Invoice/"

export type InvoiceProps = {
  order: Order & { items: CartItem[] }
}
export default function Invoice({ order }: InvoiceProps) {
  return (
    <Layout title={"Invoice " + order.number}>
      <Section aria-labelledby="Invoice">
        <InvoiceTable order={order} />
      </Section>
    </Layout>
  )
}
