import { SharedProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { ProfileLink } from "./profile-link"

export function NavActions() {
  const iconSize = 20

  return (
    <nav>
      <ul className="flex items-center">
        <li>
          <ProfileLink />
        </li>
        <li>
          <Button
            variant="ghost"
            size="icon"
            className="relative size-[2.25rem]"
          >
            <Link href="/shopping-cart">
              <Icons.cart size={iconSize} />
              <CartItemsCount />
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon">
            <Icons.moon size={iconSize} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

function CartItemsCount() {
  const { cart } = usePage<SharedProps>().props

  if (cart.items.length === 0) return null

  return (
    <span className="absolute -bottom-0.5 -right-0.5 inline-flex size-[14px] items-center justify-center rounded-full bg-primary text-[0.75rem] font-bold text-primary-foreground">
      {cart.items.length}
    </span>
  )
}
