import { Products, ProductsFilter } from ".";
import { ProductGridProps, Section } from "../common";
import { CollectionsProps } from "../home";
import { Separator } from "../ui/separator";

export type ShopProps = Pick<ProductGridProps, "products"> & CollectionsProps;
export function Shop({ products, collections }: ShopProps) {
    return (
        <Section className="flex">
            <ProductsFilter collections={collections} />
            <Products products={products} />
        </Section>
    );
}
