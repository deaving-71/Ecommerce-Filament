import { HomeProps } from "@/Pages/Home";
import { H2, ProductGrid, Section } from "../common";
import { Product } from "@/types";

export type FeaturedProductsProps = {
    products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
    return (
        <Section>
            <H2 className="pb-8">Featured Products</H2>
            <ProductGrid products={products} limit={8} />
        </Section>
    );
}
