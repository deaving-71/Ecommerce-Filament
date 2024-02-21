import { Layout } from "@/layouts"
import { CartItem, Order, SharedProps } from "@/types"

import { H1, P, Section } from "@/components/common"
import { Icons } from "@/components/icons"
import { InvoiceTable } from "@/components/Invoice/"

export type InvoiceProps = {
  order: Order & { items: CartItem[] }
}
export default function Invoice({ order }: InvoiceProps) {
  return (
    <Layout title={"Thank you for your order!"}>
      <Section aria-labelledby="Invoice">
        <div className="mb-8 flex flex-col items-center justify-center gap-2 md:gap-4">
          <Icons.package size={56} />
          <H1 className="text-center">Order Confirmation</H1>
          <P className="text-center text-muted-foreground">
            Thank you for your order! Your order has been confirmed and will be
            processed soon.
          </P>
        </div>
        <InvoiceTable order={order} />
      </Section>
    </Layout>
  )
}
