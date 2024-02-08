import { Layout } from "@/layouts";
import {
    Collections,
    FeaturedProducts,
    Hero,
    Incentives,
} from "@/components/home";
import { Collection, Product } from "@/types";

export type HomeProps = {
    products: Product[];
    collections: Collection[];
};

export default function Home({ products, collections }: HomeProps) {
    return (
        <Layout title="Ecom">
            <Hero />
            <Incentives />
            <FeaturedProducts products={products} />
            <Collections collections={collections} />
        </Layout>
    );
}
