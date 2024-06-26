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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { H1 } from "@/components/common"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter a valid password."),
  remember: z.boolean().default(false),
})

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post("/login", values, {
      onError: (err) => {
        if ("email" in err && typeof err.email === "string") {
          form.setError("root", { message: err.email })
        }
      },
    })
  }

  return (
    <AuthLayout title="Sign in to your account">
      <div className="w-[450px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg border p-5"
          >
            <div className="space-y-2 text-center">
              <H1 className="!text-2xl  font-medium">
                Sign in to your account
              </H1>
              <p className="text-sm text-muted-foreground">
                Please enter your email and password to login
              </p>
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="remember"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-2 flex items-center space-x-2">
                      <Checkbox
                        id="remember-me"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="remember-me">Remember me</Label>
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
              Sign in
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              <span className="">Don't have an account? </span>
              <Link
                href="/auth/sign-up"
                className=" text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </AuthLayout>
  )
}
