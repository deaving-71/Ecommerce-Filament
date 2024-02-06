import { Header } from "@/components/common";
import { Head } from "@inertiajs/react";

type RootLayoutProps = React.PropsWithChildren & {
    title: string;
};

export function Layout({ children, title }: RootLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="dark grid min-h-screen grid-rows-[auto,1fr,auto] bg-background text-foreground">
                <div className="container">
                    <Header />
                    {children}
                </div>
            </div>
        </>
    );
}
