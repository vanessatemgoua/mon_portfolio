import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn("outline-none resize-vertical", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
