import { useShoppingCart } from "@/hooks"
import { SharedProps } from "@/types"
import { usePage } from "@inertiajs/react"

import { formatPrice } from "@/lib/format"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export function CartTable() {
  const { cart } = usePage<SharedProps>().props
  const { updateQuantity, removeFromCart } = useShoppingCart()

  return (
    <Table className="flex-1">
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.items.map((item, idx) => (
          <TableRow key={item.product.slug + idx}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <img
                  src={"/storage/" + item.product.thumbnail}
                  alt={item.product.name}
                  className="h-[80px] min-w-[80px] object-contain object-center"
                  loading="lazy"
                />
                {item.product.name}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6"
                  disabled={item.qty === 1}
                  onClick={() => updateQuantity(item.id ?? item.product_id, -1)}
                >
                  -
                </Button>
                <span className="w-[2ch]"> {item.qty}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-6"
                  onClick={() => updateQuantity(item.id ?? item.product_id, 1)}
                >
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell>{formatPrice(item.product.price)}</TableCell>
            <TableCell className="text-right">
              {formatPrice(Number(item.product.price) * item.qty)}
            </TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="icon"
                className="size-7"
                onClick={() => removeFromCart(item.id ?? item.product_id)}
              >
                <Icons.trash size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
