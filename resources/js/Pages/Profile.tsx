import { Layout } from "@/layouts"

import { H1, Section } from "@/components/common"

export default function Profile() {
  return (
    <Layout title="Acme | Profile">
      <Section aria-labelledby="Profile">
        <H1 className="pb-8">Profile</H1>
      </Section>
    </Layout>
  )
}
