import { profileLinks } from "@/layouts"
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
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-[2.25rem]">
          <Icons.user size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {profileLinks.map((link) => (
          <DropdownMenuItem key={link.url}>
            <Link href={link.url}>{link.name}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <Link href="/logout" method="delete" as="button">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="ghost" size="icon" className="size-[2.25rem]" asChild>
      <Link href="/profile">
        <Icons.user size={iconSize} />
      </Link>
    </Button>
  )
}
