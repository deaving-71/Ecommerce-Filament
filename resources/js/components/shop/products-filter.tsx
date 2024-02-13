import { useMemo, useState } from "react"
import { useShopPageProps } from "@/hooks"
import { usePage } from "@inertiajs/react"
import { useMediaQuery } from "usehooks-ts"

import { getHighestPricedProduct } from "@/lib/utils"

import { CollectionsProps } from "../home"
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
  const { products } = useShopPageProps()

  const highestPriceProducts = useMemo(() => {
    return getHighestPricedProduct(products)
  }, [])

  const [priceRange, setPriceRange] = useState([0, highestPriceProducts])
  const searchParams = new URLSearchParams(window.location.search)
  const selectedCollections = searchParams.getAll("collections[]")
  const md2 = useMediaQuery("(max-width: 968px)")

  const FilterWrapper = md2 ? MobileWrapper : DefaultWrapper

  return (
    <>
      <div className="col-start-2 row-start-1 flex justify-end">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="best-selling">Best Selling</SelectItem>
              <SelectItem value="price-asc">Price: Ascending</SelectItem>
              <SelectItem value="price-desc">Price: Descending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <FilterWrapper>
        <MainProductsFilter
          highestPriceProducts={highestPriceProducts}
          selectedCollections={selectedCollections}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
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
