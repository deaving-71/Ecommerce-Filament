import { Layout } from "@/layout/";
import { Hero, Incentives } from "@/components/home";
import { ProductGrid } from "@/components/common";
import { Product } from "@/types";
import { FeaturedProducts } from "@/components/home/featured-products";

export type HomeProps = {
    products: Product[]
}

export default function Home({products}: HomeProps) {
    console.log(products);
    return (
        <Layout title="Ecom">
            <main>
                <Hero />
                <Incentives />
                <FeaturedProducts products={products}/>
            </main>
        </Layout>
    );
}
