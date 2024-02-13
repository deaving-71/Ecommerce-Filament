import { Layout } from "@/layouts"

import {
  Collections,
  FeaturedProducts,
  Hero,
  Incentives,
} from "@/components/home"

export default function Home() {
  return (
    <Layout title="Ecom">
      <Hero />
      <Incentives />
      <FeaturedProducts />
      <Collections />
    </Layout>
  )
}
