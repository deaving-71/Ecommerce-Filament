import { Collection } from "@/types"
import { Link } from "@inertiajs/react"

import { H2 } from "../common"

export type CollectionCartProps = {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCartProps) {
  return (
    <Link
      href={`shop?collections[]=${collection.slug}`}
      className="group relative overflow-hidden rounded-md *:transition-all"
    >
      <img
        src={`/storage/${collection.thumbnail}`}
        alt={collection.name}
        className="object-cover object-center transition-all group-hover:scale-105"
        loading="lazy"
        width={500}
        height={500}
      />
      <div className="absolute inset-0 grid place-content-center p-4 sm:p-3 2md:p-2">
        <div className="backdrop-blur-lg">
          <H2 className="xs:text-lg flex items-center justify-center text-pretty p-1 text-center text-sm sm:p-3 md:text-2xl">
            {collection.name}
          </H2>
        </div>
      </div>
    </Link>
  )
}
