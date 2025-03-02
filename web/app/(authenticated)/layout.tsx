'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pages = pathname.split('/').filter(Boolean);
  const currentPage = pages.pop();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
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
                    {pages.map(page => (
                      <div
                        key={page}
                        className="flex flex-row items-center gap-2"
                      >
                        <BreadcrumbLink
                          href={`/${pages
                            .slice(0, pages.indexOf(page) + 1)
                            .join('/')}`}
                        >
                          {page}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </div>
                    ))}
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
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
