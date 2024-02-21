import { useMemo, useState } from "react"
import { useShopPageProps } from "@/hooks"
import { Link, router, usePage } from "@inertiajs/react"
import { useMediaQuery } from "usehooks-ts"

import { getHighestPricedProduct } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { MainProductsFilter } from "./main-products-filter"

//? we keep state outside of the main filter, so when the component is destroyed and remounted
//?it doesn't lose its state

export function ProductsFilter() {
  const { highestPrice } = useShopPageProps()

  const [priceRange, setPriceRange] = useState([0, highestPrice])
  const searchParams = new URLSearchParams(window.location.search)
  const selectedCollections = searchParams.getAll("collections[]")
  const sortBy = searchParams.get("sortBy")
  const order = searchParams.get("order")
  const md2 = useMediaQuery("(max-width: 968px)")

  const isFiltered =
    sortBy ||
    order ||
    selectedCollections.length !== 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== highestPrice

  const FilterWrapper = md2 ? MobileWrapper : DefaultWrapper

  function getFilteredProducts(opts?: any) {
    const filters = {
      collections: selectedCollections,
      prices: priceRange,
      sortBy,
      order,
      ...opts,
    }
    router.get("/shop", filters, {
      preserveState: true,
      only: ["products"],
    })
  }

  return (
    <>
      <div className="col-start-2 row-start-1 flex justify-end">
        <Select
          onValueChange={(value) => {
            const [sortBy, order] = value.split("-")
            getFilteredProducts({ sortBy, order })
          }}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <FilterWrapper>
        <MainProductsFilter
          selectedCollections={selectedCollections}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          getFilteredProducts={getFilteredProducts}
        />
        <div className="hidden justify-end 2md:flex">
          {isFiltered && (
            <Button variant="link" asChild>
              <Link href="/shop">reset</Link>
            </Button>
          )}
        </div>
      </FilterWrapper>
    </>
  )
}

export type ProductsFilterWrapperProps = React.PropsWithChildren

function DefaultWrapper({ children }: ProductsFilterWrapperProps) {
  return (
    <div className="col-start-1 row-start-2 mr-4 hidden w-[260px] border-r pr-4 2md:block">
      {children}
    </div>
  )
}

function MobileWrapper({ children }: ProductsFilterWrapperProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="col-span-1 row-start-1 h-10 w-fit gap-1 px-5 text-base"
          size="lg"
        >
          <Icons.filter size={18} /> Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom">{children}</SheetContent>
    </Sheet>
  )
}
