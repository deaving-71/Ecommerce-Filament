import { ProfileLayout } from "@/layouts/"
import { usePage } from "@inertiajs/react"

import { Section } from "@/components/common"
import { AddressForm, PasswordForm, ProfileForm } from "@/components/profile"

export default function Profile() {
  return (
    <ProfileLayout title="Profile">
      <Section aria-labelledby="Account Information" className="space-y-8">
        <ProfileForm />
        <AddressForm />
        <PasswordForm />
      </Section>
    </ProfileLayout>
  )
}
