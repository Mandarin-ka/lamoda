import * as React from "react"

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, icon, type, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2 px-3 border border-input rounded-md ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {icon && <SearchIcon className="h-6 w-6" />}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full  bg-background py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium outline-none file:text-foreground placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  )
})
Input.displayName = "Input"

export { Input }
