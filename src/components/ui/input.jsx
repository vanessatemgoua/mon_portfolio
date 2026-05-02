import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn("outline-none", className)}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
