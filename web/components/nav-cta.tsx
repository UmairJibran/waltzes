'use client';

import { type LucideIcon } from 'lucide-react';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

export function NavCTA({
  ctaItems,
}: {
  ctaItems: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {ctaItems.map(item => (
          <SidebarMenuItem key={item.name}>
            <Link
              href={item.url}
              target="_blank"
              className="flex gap-2 items-center"
            >
              <item.icon height={18} />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
