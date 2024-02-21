import { Layout } from "@/layouts"
import { Collection } from "@/types"
import { Link, usePage } from "@inertiajs/react"

import { CollectionCard } from "@/components/collections/"
import { H1, H2, Section } from "@/components/common"

export default function Collections() {
  const { collections } = usePage<{ collections: Collection[] }>().props

  return (
    <Layout title="Collections">
      <Section aria-labelledby="Collections">
        <H1 className="pb-8 font-bold">Collections</H1>
        <div className="grid  grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 2md:grid-cols-4">
          <Link
            href={`shop?collection[]=all`}
            className="relative overflow-hidden rounded-md bg-primary transition-all"
          >
            <H2 className="xs:p-3 xs:text-lg absolute inset-0 flex items-center justify-center text-pretty p-1 text-center text-sm text-primary-foreground md:text-2xl">
              All Collections
            </H2>
          </Link>
          {collections.map((collection) => (
            <CollectionCard key={collection.slug} collection={collection} />
          ))}
        </div>
      </Section>
    </Layout>
  )
}
