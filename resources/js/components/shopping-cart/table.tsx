import { formatPrice } from "@/lib/format"
import { useShoppingCart } from "@/hooks/useShoppingCart"
import { useShoppingCartPageProps } from "@/hooks/useShoppingCartPageProps"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export function CartTable() {
  const { cart } = useShoppingCartPageProps()
  const { updateQuantity, removeFromCart } = useShoppingCart()

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
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
        {cart.map((item, idx) => (
          <TableRow key={item.product_id + idx}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <img
                  src={"/storage/" + item.product.thumbnail}
                  alt={item.product.name}
                  className="h-[80px] w-[80px] object-contain object-center"
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
