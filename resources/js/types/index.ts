import { IconKeys } from "@/components/icons"

export type IconsType = {
  [key in IconKeys]: React.ElementType
}

export type ProductType = "deliverable" | "downloadable"

export type Collection = {
  id: number
  name: string
  thumbnail: string
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
  user?: User
}

export type ShoppingCart = {
  id?: string
  items: CartItem[]
  subtotal: number
  shipping_price: number
  total_price: number
}

export type CartItem = {
  id?: number
  product: Product
  product_id: number
  qty: number
}

export type SharedProps = {
  auth: AuthUser
  cart: ShoppingCart
}

export type Profile = {
  id: number
  name: string
  email: string
  phone?: string
  state?: string
  city?: string
  street_address?: string
  zip_code?: string
  email_verified_at?: boolean
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled"
  | "declined"

export type Order = {
  id: number
  number: string
  user_id?: number
  status: OrderStatus
  shipping_price?: number
  name: string
  email: string
  phone?: string
  state: string
  city: string
  zip_code: string
  street_address?: string
  notes?: string
  subtotal: number
  total: number
  deleted_at?: string
  created_at: string
  updated_at: string
}
