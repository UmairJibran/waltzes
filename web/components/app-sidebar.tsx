"use client";

import * as React from "react";
import {
  Bot,
  GalleryVerticalEnd,
  LifeBuoy,
  Send,
  SquareTerminal,
  PuzzleIcon,
  Globe,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavCTA } from "@/components/nav-cta";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

const data = {
  navMain: [
    {
      title: "Applications",
      url: "/applications",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Applied",
          url: "/applications/applied",
          enabled: true,
        },
        {
          title: "Interviewing",
          url: "/applications/interviewing",
          enabled: true,
        },
        {
          title: "Accepted",
          url: "/applications/accepted",
          enabled: true,
        },
        {
          title: "Rejected",
          url: "/applications/rejected",
          enabled: true,
        },
      ],
    },
    {
      title: "Scraped",
      url: "/scraped",
      icon: Bot,
      isActive: true,
      items: [
        {
          title: "LinkedIn Profile",
          url: "/scraped/linkedin",
          enabled: true,
        },
        {
          title: "GitHub Profile",
          url: "#",
          enabled: false,
        },
        {
          title: "Others",
          url: "#",
          enabled: false,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  cta: [
    {
      name: "Get Browser Plugin",
      url: "#",
      icon: PuzzleIcon,
    },
    {
      name: "Try Web Version",
      url: "#",
      icon: Globe,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

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
                  <span className="truncate text-xs">
                    {user?.isPro ? "Pro Tier" : "Free Tier"}
                  </span>
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
        {user && (
          <NavUser
            user={{
              lastName: user.lastName,
              firstName: user.firstName,
              email: user.email,
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
