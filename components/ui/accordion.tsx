"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

export const Accordion=AccordionPrimitive.Root;

export function AccordionItem({className,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>){
  return <AccordionPrimitive.Item className={cn("ui-accordion-item",className)} {...props}/>;
}

export function AccordionTrigger({className,children,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>){
  return <AccordionPrimitive.Header className="ui-accordion-header"><AccordionPrimitive.Trigger className={cn("ui-accordion-trigger",className)} {...props}>{children}<ChevronDown aria-hidden="true"/></AccordionPrimitive.Trigger></AccordionPrimitive.Header>;
}

export function AccordionContent({className,children,...props}:React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>){
  return <AccordionPrimitive.Content className="ui-accordion-content" {...props}><div className={cn("ui-accordion-body",className)}>{children}</div></AccordionPrimitive.Content>;
}
