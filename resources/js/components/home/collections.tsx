import { useHomePageProps } from "@/hooks"
import { Link } from "@inertiajs/react"

import { H2, H3, Section } from "../common"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

export function Collections() {
  const { collections } = useHomePageProps()

  return (
    <Section>
      <H2 className="pb-8">Our Collections</H2>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {collections.map((collection, idx) => (
            <CarouselItem
              key={collection.name + idx}
              className="lg:basis- basis-1/3 pl-2 text-center md:pl-4 lg:basis-1/5"
            >
              <Link href={`/shop?collections[]=${collection.slug}`}>
                <img
                  src={"https://placekitten.com/g/250/250"}
                  alt={collection.name}
                  className="rounded-md object-contain object-center"
                  loading="lazy"
                  width={250}
                  height={250}
                />
                <H3 className="pt-3 text-lg lg:text-xl">{collection.name}</H3>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Section>
  )
}
