import { ProfileLayout } from "@/layouts/"
import { Order, SharedProps } from "@/types"
import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Section } from "@/components/common"

import { OrderStatus } from "./OrderStatus"

type MyOrdersProps = SharedProps & {
  orders?: Order[]
}

export default function MyOrders({ orders, auth }: MyOrdersProps) {
  console.log("auth: ", auth)

  console.log("orders: ", orders)

  return (
    <ProfileLayout title="My Orders">
      <Section aria-labelledby="My Orders">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sub Total</TableHead>
              <TableHead>Shipping Price</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders ? (
              orders?.map((order) => (
                <TableRow
                  key={order.number}
                  className="[&_a]:block [&_a]:w-full [&_a]:p-4 [&_td]:p-0"
                >
                  <TableCell>
                    <Link href={`/profile/my-orders/${order.number}`}>
                      {order.number}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/my-orders/${order.number}`}>
                      <OrderStatus status={order.status} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/my-orders/${order.number}`}>
                      {order.subtotal}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/my-orders/${order.number}`}>
                      {order.shipping_price}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/profile/my-orders/${order.number}`}>
                      {order.total}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="inline-flex h-[inherit] w-fit items-center p-1 text-foreground/70"
                        >
                          &#x2022;&#x2022;&#x2022;
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link href={`/profile/my-orders/${order.number}`}>
                            View
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell className="text-center" colSpan={5}>
                You have no orders yet.
              </TableCell>
            )}
          </TableBody>
        </Table>
      </Section>
    </ProfileLayout>
  )
}
