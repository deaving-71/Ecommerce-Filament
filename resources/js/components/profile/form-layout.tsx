import { H2 } from "../common"

export type FormLayoutProps = React.PropsWithChildren & {
  title?: string
}

export function FormLayout({ children, title }: FormLayoutProps) {
  return (
    <div className="rounded-md bg-secondary/20 p-4 md:p-8">
      {title && <H2 className="!text-2xl  font-medium">{title}</H2>}
      <div className="md:w-[650px]">{children}</div>
    </div>
  )
}
