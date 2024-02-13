import { AuthUser, CartItem, Collection, Product } from "@/types"
import { usePage } from "@inertiajs/react"

export type ShopPageProps = {
  cart: CartItem[]
  auth: AuthUser
}

export function useShoppingCartPageProps() {
  return usePage<ShopPageProps>().props
}
