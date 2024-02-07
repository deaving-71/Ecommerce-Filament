import { Product } from "@/types";
import { ProductGrid, type ProductGridProps } from "../common";

export type ProductsProps = Pick<ProductGridProps, "products">;

export function Products({ products }: ProductsProps) {
    return (
        <>
            <ProductGrid className="flex-1" products={products} />
        </>
    );
}
