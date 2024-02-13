import { Header } from "@/components/common";
import { Head } from "@inertiajs/react";

type RootLayoutProps = React.PropsWithChildren & {
    title: string;
};

export function AuthLayout({ children, title }: RootLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="grid h-full  min-h-screen place-content-center">
                <main>{children}</main>
            </div>
        </>
    );
}
