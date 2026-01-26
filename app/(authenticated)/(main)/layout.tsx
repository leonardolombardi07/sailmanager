import {
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import ModeToggle from "./_layout/ModeToggle";
import { Home, Trophy, Sailboat, TentTree } from "lucide-react";
import { APP_NAME } from "../../constants";
import SidebarItem from "./_layout/SidebarItem";
import { cookies } from "next/headers"; // 1. Import cookies

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider
      defaultOpen={defaultOpen || true}
      style={
        {
          "--sidebar-width": "180px",
        } as React.CSSProperties
      }
    >
      <AppBar />
      <AppSidebar />

      <main className="w-full pt-14">{children}</main>
    </SidebarProvider>
  );
}

function AppBar() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger />

        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">{APP_NAME}</h1>
        </div>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarItem title="Início" href="/" icon={<Home />} />

              <SidebarItem
                title="Campeonatos"
                href="/campeonatos"
                icon={<Trophy />}
              />

              <SidebarItem
                title="Clínicas"
                href="/clinicas"
                icon={<TentTree />}
              />

              <SidebarItem
                title="Treinamentos"
                href="/treinamentos"
                icon={<Sailboat />}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
