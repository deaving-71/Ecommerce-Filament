import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { NavigationMenu } from "./navigation-menu";

export function Header() {
    return (
        <header>
            <nav className="flex items-center justify-between py-2">
                <NavigationMenu />
                <Button className="text-base" size="sm" asChild>
                    <Link href="/contact">Contact</Link>
                </Button>
            </nav>
        </header>
    );
}
