import { SharedProps } from "@/types"
import { Link, usePage } from "@inertiajs/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Icons } from "../icons"
import { Button } from "../ui/button"

export type ProfileLinkProps = {
  iconSize?: number
}

export function ProfileLink({ iconSize = 20 }: ProfileLinkProps) {
  const {
    auth: { user },
  } = usePage<SharedProps>().props

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="size-[2.25rem]">
          <Icons.user size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost" size="icon" className="size-[2.25rem]">
      <Link href="/profile">
        <Icons.user size={iconSize} />
      </Link>
    </Button>
  )
}
