import React from "react"

import { cn } from "@/lib/utils"

import { Input as DefaultInput, InputProps } from "./input"
import { Label as DefaultLabel } from "./label"

export type PreffixInputProps = React.ComponentPropsWithoutRef<"div">
const Root = ({ className, ...props }: PreffixInputProps) => (
  <div {...props} className={cn("inline-flex items-center", className)}></div>
)

const Input: typeof DefaultInput = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return (
      <DefaultInput
        {...props}
        type="number"
        className={cn("rounded-l-none", className)}
        ref={ref}
      />
    )
  }
)

const Label: typeof DefaultLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DefaultLabel
      ref={ref}
      {...props}
      className={cn(
        "rounded-y-md inline-flex size-10 basis-[2.5rem] items-center justify-center rounded-l-md border-y border-l bg-secondary/50 text-secondary-foreground",
        className
      )}
    />
  )
)

export { Root, Label, Input }
