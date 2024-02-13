import { Link } from "@inertiajs/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

const links = [
    {
        title: "Profile",
        icon: Icons.user,
        href: "/profile",
    },
    {
        title: "Shopping Cart",
        icon: Icons.cart,
        href: "/shopping-cart",
    },
];

export function NavActions() {
    const iconSize = 20;

    return (
        <nav>
            <ul className="flex items-center">
                {links.map((link, idx) => (
                    <li key={link.href + idx}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-[2.25rem]"
                        >
                            <Link href={link.href}>
                                <link.icon size={iconSize} />
                            </Link>
                        </Button>
                    </li>
                ))}
                <li>
                    <Button variant="ghost" size="icon">
                        <Icons.moon size={iconSize} />
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
