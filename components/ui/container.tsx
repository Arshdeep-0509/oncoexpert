import * as React from "react";
import { cn } from "@/lib/utils";

/** 1240px content width; 20px side padding on mobile, 32px on desktop. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[calc(1240px+2*20px)] px-5 lg:max-w-[calc(1240px+2*32px)] lg:px-8", className)}
      {...props}
    />
  );
}
