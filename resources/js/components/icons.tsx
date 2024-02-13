import {
  BadgePercent,
  Command,
  Filter,
  Headset,
  Moon,
  RefreshCcw,
  ShoppingBag,
  SunMedium,
  Trash,
  Truck,
  User,
} from "lucide-react"

import { IconsType } from "@/types/"

export type IconKeys = keyof typeof icons

const icons = {
  logo: Command,
  sun: SunMedium,
  moon: Moon,
  truck: Truck,
  headset: Headset,
  badgePercent: BadgePercent,
  refresh: RefreshCcw,
  cart: ShoppingBag,
  user: User,
  filter: Filter,
  trash: Trash,
}

export const Icons: IconsType = icons
