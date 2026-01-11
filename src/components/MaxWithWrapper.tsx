import { cn } from "@/lib/utils"
import { ReactNode } from "react"
/*
  We import ReactNode so we can type `children`.
  ReactNode means: anything React can render
  (text, JSX, components, fragments, etc.)
*/

const MaxWithWrapper = ({className, children}: {className?: string, children: ReactNode}) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
      {children}
    </div>
  )
}

export default MaxWithWrapper