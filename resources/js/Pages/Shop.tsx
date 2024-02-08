import { H1, Section } from "@/components/common";
import { Shop } from "@/components/shop";
import { Layout } from "@/layouts";
import { Collection, Product } from "@/types";

export type ShopProps = {
    products: Product[];
    collections: Collection[];
};

export default function ShopPage({ products, collections }: ShopProps) {
    return (
        <Layout title="Ecom | Shop">
            <div className="rounded-lg bg-primary py-20 text-center text-primary-foreground md:py-28">
                <H1 className="text-5xl font-bold md:text-7xl lg:text-7xl">
                    Shop
                </H1>
            </div>

            <Shop products={products} collections={collections} />
        </Layout>
    );
}
