import { Head, Link, usePage } from "@inertiajs/react"

import { H1, Header } from "@/components/common"

import { RootLayoutProps } from "./layout"

export const profileLinks = [
  {
    name: "Profile",
    url: "/profile",
  },
  {
    name: "My Orders",
    url: "/profile/my-orders",
  },
]

export function ProfileLayout({ children, title }: RootLayoutProps) {
  const currentUrl = usePage().url
  return (
    <>
      <Head title={`Acme | ${title}`} />
      <div className="grid min-h-screen grid-rows-[auto,1fr,auto] bg-background text-foreground">
        <div className="container">
          <Header />
          <main className="pt-8">
            <nav className="grid place-content-center">
              <ul className="inline-flex rounded-md bg-secondary p-1">
                {profileLinks.map((link, idx) => (
                  <li>
                    <Link
                      key={link.name + idx}
                      href={link.url}
                      className="block rounded-md px-4 py-1 text-[0.9375rem] font-medium text-muted-foreground aria-[current=true]:bg-background aria-[current=true]:text-secondary-foreground"
                      aria-current={link.url === currentUrl}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
