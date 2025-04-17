"use client";

import * as React from "react";
import {
  Bot,
  GalleryVerticalEnd,
  LifeBuoy,
  Boxes,
  SquareTerminal,
  PuzzleIcon,
  Globe,
  FileVideo2,
  CreditCard,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

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
        title: "Profiles",
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
      {
        title: "Usage & Billing",
        url: "/billing",
        icon: CreditCard,
        isActive: true,
        highlight: !user?.isPro,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "mailto:waltzes@umairjibran.com",
        icon: LifeBuoy,
      },
      {
        title: "Community",
        url: "https://discord.gg/thXRRXSD4b",
        icon: Boxes,
      },
      {
        title: "Watch Demo",
        url: "https://www.loom.com/share/247a6971737f456f8acb0f83a37ad821?sid=c5040200-f509-4cf1-b73a-940a05dbd0c9",
        icon: FileVideo2,
        highlight: true,
      },
    ],
    cta: [
      {
        name: "Get Browser Plugin",
        icon: PuzzleIcon,
        subItems: [
          {
            name: "Chrome",
            url: "https://chromewebstore.google.com/detail/waltzes/imimjfooeejcdfblehajmoiapdilnieb",
          },
          {
            name: "Edge",
            url: "https://microsoftedge.microsoft.com/addons/detail/waltzes/jfgaangnolmmecbgjbldpakihjdipakn",
          },
          {
            name: "Firefox (Coming Soon)",
          },
        ],
      },
      {
        name: "Try Web Version",
        url: "/applications/new",
        icon: Globe,
      },
    ],
  };

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
                    <a href="/billing">
                      {user?.isPro ? "Pro Tier" : "Needs subscription"}
                    </a>
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
              isPro: user.isPro,
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
