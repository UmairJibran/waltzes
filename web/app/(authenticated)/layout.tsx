"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { LoadingScreen } from "@/components/loading-screen";
import { Button } from "@/components/ui/button";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const pages = pathname.split("/").filter(Boolean);
  const currentPage = pages.pop();
  const { isAuthenticated } = useAuth();
  const { isLoading, user } = useUser();

  const navigateToAccount = () => {
    router.push("/account");
  };

  const navigateToLinkedin = () => {
    router.push("/scraped/linkedin");
  };

  // Only show loading screen if we're authenticated but still loading user data
  if (isAuthenticated && (isLoading || !user)) {
    return <LoadingScreen />;
  }

  // If not authenticated, let the auth protection handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {pages.length > 0 && (
                  <BreadcrumbItem className="hidden md:flex md:flex-row">
                    {pages.map((page) => {
                      const pageUrl = `/${pages
                        .slice(0, pages.indexOf(page) + 1)
                        .join("/")}`;
                      return (
                        <div
                          key={page}
                          className="flex flex-row items-center gap-2"
                        >
                          <BreadcrumbLink href={pageUrl}>{page}</BreadcrumbLink>
                          <BreadcrumbSeparator className="hidden md:block" />
                        </div>
                      );
                    })}
                  </BreadcrumbItem>
                )}
                {currentPage && (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="mx-4">
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm text-gray-500">Welcome back</span>
              <span>
                Hey {user?.firstName}, complete your account and your linkedin
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="prominent"
                  onClick={navigateToAccount}
                >
                  Account
                </Button>
                <Button
                  size="sm"
                  variant="prominent"
                  onClick={navigateToLinkedin}
                >
                  Linkedin
                </Button>
              </div>
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
