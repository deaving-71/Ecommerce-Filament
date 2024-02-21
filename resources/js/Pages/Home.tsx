import { Layout } from "@/layouts"

import {
  Collections,
  FeaturedProducts,
  Hero,
  Incentives,
} from "@/components/home"
import CallToAction from "@/components/home/call-to-action"

export default function Home() {
  return (
    <Layout title="Home">
      <Hero />
      <Incentives />
      <FeaturedProducts />
      <Collections />
      <CallToAction />
    </Layout>
  )
}
