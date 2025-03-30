import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    highlight?: boolean;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm" className="w-full text-left">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                  {item.highlight && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
