import { useShopPageProps } from "@/hooks"
import { router } from "@inertiajs/react"

import { formatPrice } from "@/lib/format"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

import { H2, H3 } from "../common"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import * as Preffix from "../ui/preffix-input"

export type ProductsFilterProps = {
  selectedCollections: string[]
  priceRange: number[]
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>
  getFilteredProducts: (opts?: any) => void
}

export function MainProductsFilter({
  priceRange,
  setPriceRange,
  selectedCollections,
  getFilteredProducts,
}: ProductsFilterProps) {
  const { collections, highestPrice } = useShopPageProps()

  return (
    <>
      <H2 className="pb-6">Filter</H2>

      <div className="space-y-6">
        {/*//* COLLECTIONS */}
        <div>
          <H3 className=" pb-2 text-base font-normal text-foreground">
            Collections
          </H3>
          <ul>
            {collections.map((collection, idx) => (
              <li
                key={collection.name + idx}
                className="flex items-center gap-2"
              >
                <Checkbox
                  id={collection.name}
                  checked={selectedCollections.includes(collection.slug)}
                  onCheckedChange={(checked) => {
                    const newSelectedCollections = checked
                      ? [...selectedCollections, collection.slug]
                      : selectedCollections.filter(
                          (slug) => slug !== collection.slug
                        )

                    getFilteredProducts({
                      collections: newSelectedCollections,
                    })
                  }}
                />
                <Label htmlFor={collection.name} className="text-foreground/80">
                  {collection.name}
                </Label>
              </li>
            ))}
          </ul>
        </div>

        {/*//* PRICE RANGE */}
        <div>
          <H3 className="pb-5 text-base font-normal text-foreground">Range</H3>
          <Slider
            className="pb-5"
            defaultValue={priceRange}
            max={highestPrice}
            step={1}
            minStepsBetweenThumbs={100}
            onValueCommit={(values: number[]) => {
              setPriceRange(values)
              getFilteredProducts({ prices: values })
            }}
          />
          <div className="flex items-center gap-4">
            <Preffix.Root>
              <Preffix.Label htmlFor="min-price">$</Preffix.Label>
              <Preffix.Input
                id="min-price"
                min={0}
                max={highestPrice}
                value={priceRange[0]}
                onInput={(e) => {
                  if (priceRange[1] - e.target.value < 100) return
                  setPriceRange([e.target.value, priceRange[1]])
                  getFilteredProducts({
                    prices: [e.target.value, priceRange[1]],
                  })
                }}
              />
            </Preffix.Root>
            <Preffix.Root>
              <Preffix.Label htmlFor="max-price">$</Preffix.Label>
              <Preffix.Input
                id="max-price"
                min={0}
                max={highestPrice}
                value={priceRange[1]}
                onInput={(e) => {
                  if (e.target.value - priceRange[0] < 100) return

                  setPriceRange([priceRange[0], e.target.value])
                  getFilteredProducts({
                    prices: [priceRange[0], e.target.value],
                  })
                }}
              />
            </Preffix.Root>
          </div>
        </div>
      </div>
    </>
  )
}
