import { AuthLayout } from "@/layouts"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, router } from "@inertiajs/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { H1 } from "@/components/common"

const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(1, "Please enter a valid username"),
    password: z.string().min(8, "Password minimum length is 8 characters"),
    password_confirmation: z.string(),
    terms: z
      .boolean({
        required_error: "Please read and accept the terms and conditions",
      })
      .refine((val) => val === true, {
        message: "Please read and accept the terms and conditions",
      }),
  })
  .refine((data) => data.password_confirmation === data.password, {
    path: ["password_confirmation "],
    message: "Passwords do not match.",
  })

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post("/register", values, {
      onError: (err) => {
        const errors = Object.keys(err) as (keyof z.infer<typeof formSchema>)[]
        errors.forEach((error) => form.setError(error, { message: err[error] }))
      },
      preserveScroll: true,
      preserveState: true,
    })
  }

  return (
    <AuthLayout title="Create an account">
      <div className="w-[500px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 rounded-lg border p-5"
          >
            <div className="space-y-2 text-center">
              <H1 className="!text-2xl  font-medium">Create an account</H1>
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-2 flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="remember-me">
                        Accept terms and conditions.
                      </Label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-base"
              disabled={!form.formState.isValid}
            >
              Sign up
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className=" text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
