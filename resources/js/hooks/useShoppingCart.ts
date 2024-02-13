import { CartItem } from "@/types"
import { router, usePage } from "@inertiajs/react"
import axios from "axios"

export type UseShoppingCart = {
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
}

export function useShoppingCart() {
  const { url } = usePage()

  function refetchCart() {
    router.visit(url, {
      only: ["cart"],
      preserveState: true,
      preserveScroll: true,
    })
  }

  async function addToCart(item: CartItem) {
    try {
      const response = await axios.post<{ message: string; cart: CartItem[] }>(
        "/shopping-cart",
        item
      )
      refetchCart()
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeFromCart(id: number) {
    try {
      const response = await axios.delete<{ message: string }>(
        `/shopping-cart/${id}`
      )
      refetchCart()
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateQuantity(id: number, qty: number) {
    try {
      const response = await axios.patch<{ message: string; cart: CartItem[] }>(
        `/shopping-cart/${id}`,
        { qty }
      )
      refetchCart()
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return { addToCart, updateQuantity, removeFromCart }
}
