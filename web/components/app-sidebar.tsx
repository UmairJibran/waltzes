'use client';

import * as React from 'react';
import {
  Bot,
  GalleryVerticalEnd,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
  PuzzleIcon,
  Globe,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavCTA } from '@/components/nav-cta';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Umair Jibran',
    email: 'me@umairjibran.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Applications',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Applied',
          url: '#',
          enabled: true,
        },
        {
          title: 'Interviewing',
          url: '#',
          enabled: true,
        },
        {
          title: 'Accepted',
          url: '#',
          enabled: true,
        },
        {
          title: 'Rejected',
          url: '#',
          enabled: true,
        },
      ],
    },
    {
      title: 'Scrapped',
      url: '#',
      icon: Bot,
      isActive: true,
      items: [
        {
          title: 'LinkedIn Profile',
          url: '#',
          enabled: true,
        },
        {
          title: 'GitHub Profile',
          url: '#',
          enabled: false,
        },
        {
          title: 'Others',
          url: '#',
          enabled: false,
        },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
          enabled: true,
        },
        {
          title: 'Resume',
          url: '/settings/resume',
          enabled: true,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  cta: [
    {
      name: 'Get Browser Plugin',
      url: '#',
      icon: PuzzleIcon,
    },
    {
      name: 'Try Web Version',
      url: '#',
      icon: Globe,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Waltzes</span>
                  <span className="truncate text-xs">Free Tier</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCTA ctaItems={data.cta} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
