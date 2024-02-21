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
  name: z.string().min(1, "Please enter a valid email address."),
})

export function ProfileForm() {
  const { profile } = usePage<{ profile: Profile }>().props
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
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
    <FormLayout title="Profile Information">
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Email</FormLabel>
            <Input disabled defaultValue={profile.email} />
          </div>

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
