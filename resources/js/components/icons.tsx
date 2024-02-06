import {
    Command,
    Headset,
    Moon,
    SunMedium,
    Truck,
    BadgePercent,
    RefreshCcw
} from "lucide-react";

import { IconsType } from "@/types/";

export type IconKeys = keyof typeof icons;

const icons = {
    logo: Command,
    sun: SunMedium,
    moon: Moon,
    truck: Truck,
    headset: Headset,
    badgePercent: BadgePercent,
    refresh: RefreshCcw,
};

export const Icons: IconsType = icons;
