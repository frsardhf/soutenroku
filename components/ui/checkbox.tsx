"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {Check} from "lucide-react";
import {cn} from "@/lib/utils";

export function Checkbox({className,...props}:React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>){
  return <CheckboxPrimitive.Root className={cn("ui-checkbox",className)} {...props}>
    <CheckboxPrimitive.Indicator className="ui-checkbox-indicator"><Check aria-hidden="true"/></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>;
}
