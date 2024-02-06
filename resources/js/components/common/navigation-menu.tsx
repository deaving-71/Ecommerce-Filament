import {
    NavigationMenu as NavigationMenuRoot,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Link, usePage } from "@inertiajs/react";

const links: { title: string; href: string }[] = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Shop",
        href: "/shop",
    },
    {
        title: "Collections",
        href: "/collections",
    },
];

export function NavigationMenu() {
    const { url } = usePage();
    return (
        <nav>
            <ul className="flex items-center gap-6">
                {links.map((link, idx) => (
                    <li key={link.title + idx}>
                        <Link
                            href={link.href}
                            className="after:contents-[' '] relative cursor-pointer text-muted-foreground transition-all after:h-[1px] after:w-full after:bg-secondary-foreground hover:text-foreground  hover:after:bg-muted-foreground aria-[current=true]:text-foreground aria-[current=true]:after:block aria-[current=true]:after:bg-foreground"
                            aria-current={link.href === url}
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
