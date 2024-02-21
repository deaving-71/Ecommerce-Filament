import { Layout } from "@/layouts"
import { Profile, SharedProps } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "@inertiajs/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { formatPrice } from "@/lib/format"
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
import { Textarea } from "@/components/ui/textarea"
import { H1, Section } from "@/components/common"

const formSchema = z.object({
  name: z.string().min(1, "Please enter a name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
  zip_code: z.string().min(1, "Please enter your zip code"),
  notes: z.string().optional(),
})

export default function Checkout({
  auth,
  profile,
  cart,
}: SharedProps & { profile?: Profile }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile?.name ?? "",
      email: auth.user?.email ?? "",
      phone: profile?.phone ?? "",
      state: profile?.state ?? "",
      city: profile?.city ?? "",
      zip_code: profile?.zip_code ?? "",
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post("/checkout", values, {
      onError: (err) => {
        const errors = Object.keys(err) as (keyof z.infer<typeof formSchema>)[]
        errors.forEach((error) => form.setError(error, { message: err[error] }))
      },
      preserveScroll: true,
      preserveState: true,
    })
  }

  return (
    <Layout title="Checkout">
      <Section className="mx-auto max-w-[1000px] gap-8">
        <Form {...form}>
          <div className="space-y-2 rounded-md border p-5">
            <H1 className="p-0 text-center font-medium">Checkout</H1>
            <div className="flex flex-col gap-8 md:flex-row">
              <form
                className="basis-3/4 space-y-5 [&_label]:after:text-destructive"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} required type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input required {...field} />
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
                          <Input required {...field} />
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
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="text-base"
                  disabled={!form.formState.isValid}
                >
                  Proceed
                </Button>
              </form>

              <div className="h-fit basis-1/4 space-y-6 md:basis-[450px] md:p-6 [&_span]:text-sm md:[&_span]:text-base">
                <div className="border-b *:mb-6 [&_div]:flex [&_div]:items-center [&_div]:justify-between">
                  <div>
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>

                  <div>
                    <span>Shipping</span>
                    <span>{formatPrice(cart.shipping_price)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>{formatPrice(cart.total_price)}</span>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Section>
    </Layout>
  )
}
