import { InvoiceProps } from "@/Pages/profile/Invoice"
import { OrderStatus } from "@/Pages/profile/OrderStatus"

import { formatDate, formatPrice } from "@/lib/format"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"

export function InvoiceTable({ order }: InvoiceProps) {
  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader className="grid gap-1.5">
        <CardTitle>Invoice</CardTitle>
        <CardDescription>
          Order #{order.number} - {formatDate(order.created_at)} -{" "}
          <OrderStatus status={order.status} />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto">
          <Table className="min-w-[600px]">
            <TableBody>
              <TableRow>
                <TableCell className="border-0" colSpan={2}>
                  <div className="font-semibold">Acme Inc</div>
                  <div className="text-sm">
                    {order.state}
                    <br />
                    {order.city} {order.zip_code}
                    <br />
                    {order.street_address}
                  </div>
                </TableCell>
                <TableCell className="border-0" colSpan={2}>
                  <div className="font-semibold">Invoice to</div>
                  <div className="text-sm">
                    {order.name}
                    <br />
                    {order.email}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
              {order?.items?.map((item) => (
                <TableRow key={item.product.slug}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <img
                        src={"/storage/" + item.product.thumbnail}
                        alt={item.product.name}
                        className="max-h-[80px] max-w-[80px] object-contain object-center"
                        loading="lazy"
                      />
                      {item.product.name}
                    </div>
                  </TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{formatPrice(item.product.price)}</TableCell>
                  <TableCell>
                    {formatPrice(Number(item.product.price) * item.qty)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="hover:bg-transparent">
                <TableCell className="border-0" colSpan={4}>
                  <div className="mb-2 h-[12px] w-full border-b text-center ">
                    <span className="bg-background px-4 py-2 font-bold">
                      Summary
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-0" colSpan={2}>
                  <div className="font-semibold">Subtotal</div>
                </TableCell>
                <TableCell className="border-0" colSpan={2}>
                  {formatPrice(order.subtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-0" colSpan={2}>
                  <div className="font-semibold">Shipping</div>
                  <div className="text-sm">Standard shipping</div>
                </TableCell>
                <TableCell className="border-0" colSpan={2}>
                  {formatPrice(order.shipping_price ?? 0)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-0" colSpan={2}>
                  <div className="font-semibold">Total</div>
                </TableCell>
                <TableCell className="border-0" colSpan={2}>
                  {formatPrice(order.total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
