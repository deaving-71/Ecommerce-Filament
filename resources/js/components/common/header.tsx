import { NavigationMenu } from "./navigation-menu";
import { NavActions } from "./nav-actions";

export function Header() {
    return (
        <header>
            <nav className="flex items-center justify-between py-2">
                <NavigationMenu />
                <NavActions />
            </nav>
        </header>
    );
}
