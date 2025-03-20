'use client';

import { ChevronDown, type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

export function NavCTA({
  ctaItems,
}: {
  ctaItems: {
    name: string;
    icon: LucideIcon;
    url?: string;
    subItems?: {
      name: string;
      url?: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {ctaItems.map(item => (
          <SidebarMenuItem key={item.name}>
            {item.url ? (
              <Link href={item.url} target="_blank">
                <SidebarMenuButton className="w-full">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="w-full">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="start"
                  sideOffset={8}
                >
                  <DropdownMenuGroup>
                    {item.subItems?.map(subItem => (
                      <DropdownMenuItem
                        key={subItem.name}
                        className="flex items-center gap-2 p-2"
                      >
                        {subItem.url ? (
                          <Link
                            href={subItem.url}
                            target="_blank"
                            className="flex-1"
                          >
                            {subItem.name}
                          </Link>
                        ) : (
                          <span className="flex-1">{subItem.name}</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
