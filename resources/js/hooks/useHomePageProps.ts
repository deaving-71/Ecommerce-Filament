import { AuthUser, Collection, Product } from "@/types"
import { usePage } from "@inertiajs/react"

export type HomePageProps = {
  products: Product[]
  collections: Collection[]
  auth: AuthUser
}

export function useHomePageProps() {
  return usePage<HomePageProps>().props
}
