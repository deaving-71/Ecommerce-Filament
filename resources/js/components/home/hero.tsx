import { Link } from "@inertiajs/react"

import { Section } from "../common"
import { Button } from "../ui/button"

export function Hero() {
  return (
    <Section aria-labelledby="hero" className="relative pt-0">
      <div className="relative left-1/2 right-1/2 -ml-[50dvw] -mr-[50dvw] w-dvw max-w-[100dvw]">
        <img
          src="/storage/assets/clothing-row-hangar.jpg"
          className="h-[450px] w-full object-cover object-center md:h-[600px]"
          width={1920}
          height={600}
          loading="eager"
        />
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-1/2 text-center">
        <Button size="lg" className="text-lg uppercase" asChild>
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
    </Section>
  )
}
