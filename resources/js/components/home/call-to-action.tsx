import React from "react"
import { Link } from "@inertiajs/react"

import { H2, Section } from "../common"
import { Button } from "../ui/button"

export default function CallToAction() {
  return (
    <Section
      aria-labelledby="Call to Action"
      className="relative my-8  h-[300px] p-0 md:h-[450px]"
    >
      <img
        className="h-[300px] w-full rounded-md object-cover object-left-top md:h-[450px]"
        src="/storage/assets/call-to-action-bg.jpg"
        alt="Young man choosing clothes in a shop"
        width={1920}
        height={450}
        loading="lazy"
      />
      <div className="absolute top-1/2 z-10 w-full -translate-y-1/2 text-center">
        <H2 className="text-3xl sm:text-4xl md:text-5xl">
          Shop The Latest Trends
        </H2>
        <Button size="lg" className="uppercase sm:text-lg" asChild>
          <Link href="/shop">Start Shopping Now</Link>
        </Button>
      </div>
    </Section>
  )
}
