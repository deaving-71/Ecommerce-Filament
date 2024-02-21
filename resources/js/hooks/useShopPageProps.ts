import { AuthUser, Collection, Product, SharedProps } from "@/types"
import { usePage } from "@inertiajs/react"

export type ShopPageProps = SharedProps & {
  products: Product[]
  collections: Collection[]
  highestPrice: number
}

export function useShopPageProps() {
  return usePage<ShopPageProps>().props
}
