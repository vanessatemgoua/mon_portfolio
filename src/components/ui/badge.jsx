import * as React from "react";
import { cn } from "../../lib/utils";

function Badge({ className, ...props }) {
  return (
    <span className={cn("text-muted text-[0.75rem] font-normal", className)} {...props} />
  );
}

function Tag({ className, ...props }) {
  return (
    <span className={cn("text-muted text-[0.75rem] font-normal", className)} {...props} />
  );
}

function SectionLabel({ className, ...props }) {
  return (
    <p className={cn("text-[0.72rem] text-brand uppercase tracking-[0.12em] mb-2 font-semibold", className)} {...props} />
  );
}

export { Badge, Tag, SectionLabel };
