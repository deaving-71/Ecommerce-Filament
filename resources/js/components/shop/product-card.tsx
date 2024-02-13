import { Product } from "@/types"
import { router } from "@inertiajs/react"

import { formatPrice } from "@/lib/format"
import { useShoppingCart } from "@/hooks/useShoppingCart"

import { H3, P } from "../common"
import { Button } from "../ui/button"

export function ProductCard({ ...product }: Product) {
  const { addToCart } = useShoppingCart()

  return (
    <article className="flex flex-col rounded-md border p-3">
      <img
        src={"./storage/" + product.thumbnail}
        alt={product.name}
        loading="lazy"
        className="h-48 object-contain object-center"
      />
      <H3 className="pt-3 text-lg">{product.name}</H3>
      <P className="text-[12px] uppercase text-muted-foreground">
        {product.categories[0]!.name}
      </P>
      <P className="text-primary">{formatPrice(product.price)}</P>
      <Button
        type="button"
        className="mt-2 w-full font-semibold uppercase"
        onClick={() => addToCart({ product_id: product.id, qty: 1 })}
      >
        Add To Cart
      </Button>
    </article>
  )
}
