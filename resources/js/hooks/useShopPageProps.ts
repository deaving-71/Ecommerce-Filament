import { AuthUser, Collection, Product } from "@/types"
import { usePage } from "@inertiajs/react"

export type ShopPageProps = {
  products: Product[]
  collections: Collection[]
  auth: AuthUser
}

export function useShopPageProps() {
  return usePage<ShopPageProps>().props
}
