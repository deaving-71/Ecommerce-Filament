import { Profile } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { router, usePage } from "@inertiajs/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FormLayout } from "./form-layout"

const formSchema = z.object({
  state: z.string().min(1, "Please enter a valid email address."),
  city: z.string().min(1, "Please enter a valid email address."),
  zip_code: z.string().min(1, "Please enter a valid email address."),
  street_address: z.string().optional(),
})

export function AddressForm() {
  const { profile } = usePage<{ profile: Profile }>().props

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: profile.state ?? "",
      city: profile.city ?? "",
      zip_code: profile.zip_code ?? "",
      street_address: profile.street_address ?? "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.put("/profile", values, {
      onError: (err) => {
        const errors = Object.keys(err) as (keyof z.infer<typeof formSchema>)[]
        errors.forEach((error) => form.setError(error, { message: err[error] }))
      },
    })
  }

  return (
    <FormLayout title="Address">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <FormField
            control={form.control}
            name="street_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="text-base"
            disabled={!form.formState.isDirty && !form.formState.isValid}
          >
            Save
          </Button>
        </form>
      </Form>
    </FormLayout>
  )
}
