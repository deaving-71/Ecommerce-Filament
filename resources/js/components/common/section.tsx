import { cn } from "@/lib/utils"

type SectionsProps = React.ComponentPropsWithoutRef<"section"> & {
  className?: string
}

export function Section({ children, className, ...props }: SectionsProps) {
  return (
    <section {...props} className={cn("py-8", className)}>
      {children}
    </section>
  )
}
