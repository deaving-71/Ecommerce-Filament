import { Head } from "@inertiajs/react"

import { RootLayoutProps } from "./layout"

export function AuthLayout({ children, title }: RootLayoutProps) {
  return (
    <>
      <Head title={`Acme | ${title}`} />
      <div className="grid h-full  min-h-screen place-content-center">
        <main>{children}</main>
      </div>
    </>
  )
}
