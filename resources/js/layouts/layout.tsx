import { Head } from "@inertiajs/react"

import { Header } from "@/components/common"

export type RootLayoutProps = React.PropsWithChildren & {
  title: string
}

export function Layout({ children, title }: RootLayoutProps) {
  return (
    <>
      <Head title={`Acme | ${title}`} />
      <div className="grid min-h-screen grid-rows-[auto,1fr,auto] bg-background text-foreground">
        <div className="container">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
