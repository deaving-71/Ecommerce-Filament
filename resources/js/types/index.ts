import { IconKeys } from "@/components/icons"

export type IconsType = {
  [key in IconKeys]: React.ElementType
}

export type ProductType = "deliverable" | "downloadable"

export type Collection = {
  id: number
  name: string
  slug: string
  description: string | null
  parent_id: number | null
  is_visible: number
  created_at: string
  updated_at: string
}

export type Product = {
  id: number
  categories: Collection[]
  brand_id: number | null
  name: string
  slug: string
  sku: string | null
  description: string | null
  thumbnail: string
  price: string
  qty: number
  is_visible: number
  is_featured: number
  type: ProductType
  published_at: string
  created_at: string
  updated_at: string
}

export type User = {
  id: number
  name: string
  email: string
}

export type AuthUser = {
  user: User
}

export type ShoppingCart = {
  id: string
  items: CartItem[]
}

export type CartItem = {
  id?: number
  product: Product
  product_id: number
  qty: number
}
