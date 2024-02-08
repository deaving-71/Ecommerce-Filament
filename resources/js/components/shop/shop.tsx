import { getHighestPricedProduct } from "@/lib/utils";
import { Products, ProductsFilter } from ".";
import { ProductGridProps, Section } from "../common";
import { CollectionsProps } from "../home";
import { Separator } from "../ui/separator";
import { useMemo } from "react";

export type ShopProps = Pick<ProductGridProps, "products"> & CollectionsProps;
export function Shop({ products, collections }: ShopProps) {
    const highestPriceProducts = useMemo(
        () => getHighestPricedProduct(products),
        [],
    );

    return (
        <Section className="flex">
            <ProductsFilter
                collections={collections}
                highestPriceProducts={highestPriceProducts}
            />
            <Products products={products} />
        </Section>
    );
}
