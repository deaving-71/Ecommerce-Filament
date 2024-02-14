import { SharedProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"

import { formatPrice } from "@/lib/format"

import { Button } from "../ui/button"

export function Checkout() {
  const { cart } = usePage<SharedProps>().props

  return (
    <div className="bg top-5 h-fit space-y-6 rounded-md border p-6 md:sticky md:basis-[450px] [&_span]:text-sm md:[&_span]:text-base">
      <div className="border-b *:mb-6 [&_div]:flex [&_div]:items-center [&_div]:justify-between">
        <div>
          <span>Subtotal</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>

        <div>
          <span>Shipping</span>
          <span>{formatPrice(cart.shipping_price)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>Total</span>
        <span>{formatPrice(cart.total_price)}</span>
      </div>

      <Button className="w-full font-bold" size="lg" asChild>
        <Link href="#">CHECKOUT</Link>
      </Button>
    </div>
  )
}
